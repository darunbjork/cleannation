// services/media-service/src/index.ts

import Fastify from "fastify"
import helmet from "@fastify/helmet"
import cors from "@fastify/cors"
import rateLimit from "@fastify/rate-limit"
import {
  createLogger,
  resolveCorrelationId,
  isAppError,
  logServiceError,
} from "@cleannation/shared-utils"
import { ErrorCode, fail } from "@cleannation/shared-types"
import { config } from "./config/index"
import { prisma } from "./db/prisma"
import { startGrpcServer } from "./grpc/server"
import { connectProducer, disconnectProducer } from "./kafka/producer"
import { processPendingMedia } from "./pipeline/processor"
import mediaRoutes from "./routes/media.routes"
import healthRoutes from "./routes/health.routes"

const logger = createLogger("media-service")

declare module "fastify" {
  interface FastifyRequest {
    correlationId: string
  }
}

async function buildHttpServer() {
  const fastify = Fastify({ logger: false })

  // Type assertions to bypass Fastify v4/v5 plugin type mismatch
  await fastify.register(helmet as any)
  await fastify.register(cors as any, {
    origin: (process.env["CORS_ORIGIN"] ?? "http://localhost:5173")
      .split(","),
    credentials: true,
  })
  await fastify.register(rateLimit as any, {
    max: 100,
    timeWindow: "1 minute",
  })

  fastify.addHook("onRequest", async (request, reply) => {
    request.correlationId = resolveCorrelationId(
      request.headers as Record<string, string | undefined>
    )
    void reply.header("X-Correlation-Id", request.correlationId)
  })

  fastify.addHook("onRequest", async (request) => {
    ;(request as unknown as { startTime: number }).startTime = Date.now()
  })

  fastify.addHook("onResponse", async (request, reply) => {
    const startTime = (request as unknown as { startTime?: number }).startTime
    logger.info({
      correlationId: request.correlationId,
      method: request.method,
      path: request.url,
      statusCode: reply.statusCode,
      durationMs: startTime !== undefined ? Date.now() - startTime : -1,
    }, "HTTP request")
  })

  fastify.setErrorHandler((error, request, reply) => {
    const meta = {
      requestId: request.correlationId,
      service: "media-service",
    }
    if (isAppError(error)) {
      return reply.status(error.statusCode).send(
        fail(error.code, error.message, meta, error.details)
      )
    }
    logServiceError(logger, error, { correlationId: request.correlationId })
    return reply.status(500).send(
      fail(ErrorCode.INTERNAL, "An unexpected error occurred", meta)
    )
  })

  await fastify.register(healthRoutes)
  await fastify.register(mediaRoutes)

  return fastify
}

async function start(): Promise<void> {
  // Start gRPC server first — internal services may call it immediately
  const grpcServer = await startGrpcServer()

  // Connect Kafka producer
  await connectProducer()

  // Start HTTP server
  const fastify = await buildHttpServer()
  await fastify.listen({ port: config.port, host: config.host })

  logger.info(
    { httpPort: config.port, grpcPort: config.grpcPort },
    "media-service started"
  )

  // Verification pipeline — polls for pending media every 30 seconds
  // In production: replace with a proper job queue (Bull, BullMQ)
  // Polling is simple and correct for low-volume verification
  const pipelineInterval = setInterval(() => {
    processPendingMedia().catch((error: unknown) => {
      logger.error(
        { error: error instanceof Error ? error.message : "unknown" },
        "Verification pipeline error"
      )
    })
  }, 30_000)

  // Run pipeline immediately on startup
  processPendingMedia().catch(() => undefined)

  const shutdown = async (signal: string): Promise<void> => {
    logger.info({ signal }, "Shutdown signal received")
    clearInterval(pipelineInterval)
    grpcServer.forceShutdown()
    await fastify.close()
    await prisma.$disconnect()
    await disconnectProducer()
    logger.info("media-service shutdown complete")
    process.exit(0)
  }

  process.on("SIGTERM", () => void shutdown("SIGTERM"))
  process.on("SIGINT", () => void shutdown("SIGINT"))
}

start().catch((error: unknown) => {
  logger.error({ error }, "Failed to start media-service")
  process.exit(1)
})