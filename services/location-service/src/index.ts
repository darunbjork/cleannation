// services/location-service/src/index.ts

import Fastify from "fastify"
import helmet from "@fastify/helmet"
import cors from "@fastify/cors"
import rateLimit from "@fastify/rate-limit"
import websocketPlugin from "@fastify/websocket"
import {
  createLogger,
  resolveCorrelationId,
  isAppError,
  logServiceError,
} from "@cleannation/shared-utils"
import { ErrorCode, fail } from "@cleannation/shared-types"
import { config } from "./config/index"
import { prisma } from "./db/prisma"
import { startConsumer, stopConsumer } from "./kafka/consumer"
import { handleWebSocketConnection } from "./websocket/handler"
import { roomManager } from "./websocket/room.manager"
import zoneRoutes from "./routes/zone.routes"
import healthRoutes from "./routes/health.routes"

const logger = createLogger("location-service")

declare module "fastify" {
  interface FastifyRequest {
    correlationId: string
  }
}

async function buildServer() {
  const fastify = Fastify({ logger: false })

  await fastify.register(helmet)
  await fastify.register(cors, {
    origin: config.cors.origin.split(","),
    credentials: true,
  })
  await fastify.register(rateLimit, {
    max: 300,
    timeWindow: "1 minute",
  })

  // WebSocket plugin — enables ws:// upgrade on specific routes
  await fastify.register(websocketPlugin, {
    options: {
      // Maximum message size: 10KB — position updates are tiny
      // Prevents memory exhaustion from malicious large messages
      maxPayload: 10_240,
    },
  })

  // Correlation ID
  fastify.addHook("onRequest", async (request, reply) => {
    request.correlationId = resolveCorrelationId(
      request.headers as Record<string, string | undefined>
    )
    void reply.header("X-Correlation-Id", request.correlationId)
  })

  // Request logging
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

  // Global error handler
  fastify.setErrorHandler((error, request, reply) => {
    const meta = {
      requestId: request.correlationId,
      service: "location-service",
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

  // ── WEBSOCKET ROUTE ────────────────────────────────────────────────────
  // GET /ws/tracking — upgrades to WebSocket connection
  // The gateway forwards this route to location-service
  // userId is injected by the gateway as a header
  fastify.get(
    "/ws/tracking",
    { websocket: true },
    (socket, request) => {
      handleWebSocketConnection(socket, request)
    }
  )

  // REST routes
  await fastify.register(healthRoutes)
  await fastify.register(zoneRoutes)

  // WebSocket stats endpoint — for monitoring
  fastify.get("/ws/stats", async (_req, reply) => {
    return reply.status(200).send(roomManager.getStats())
  })

  return fastify
}

async function start(): Promise<void> {
  // Start Kafka consumer before accepting requests
  await startConsumer()

  const fastify = await buildServer()

  await fastify.listen({ port: config.port, host: config.host })
  logger.info({ port: config.port }, "location-service started")

  const shutdown = async (signal: string): Promise<void> => {
    logger.info({ signal }, "Shutdown signal received")
    await fastify.close()
    await prisma.$disconnect()
    await stopConsumer()
    logger.info("location-service shutdown complete")
    process.exit(0)
  }

  process.on("SIGTERM", () => void shutdown("SIGTERM"))
  process.on("SIGINT", () => void shutdown("SIGINT"))
}

start().catch((error: unknown) => {
  logger.error({ error }, "Failed to start location-service")
  process.exit(1)
})