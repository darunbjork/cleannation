// services/auth-service/src/index.ts

import Fastify from "fastify"
import cookie from "@fastify/cookie"
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
import { config } from "./config/index.js"
import { prisma } from "./db/prisma.js"
import { redis } from "./db/redis.js"
import authRoutes from "./routes/auth.routes.js"
import healthRoutes from "./routes/health.routes.js"

const logger = createLogger("auth-service")

// Extend FastifyRequest for correlationId
declare module "fastify" {
  interface FastifyRequest {
    correlationId: string
  }
}

async function buildServer() {
  const fastify = Fastify({
    logger: false, // Using our own Pino logger
  })

  // Security headers
  await fastify.register(helmet)

  // CORS
  await fastify.register(cors, {
    origin: config.cors.origin.split(","),
    credentials: true,
  })

  // Cookies (for refresh token HttpOnly strategy)
  await fastify.register(cookie)

  // Rate limiting
  await fastify.register(rateLimit, {
    max: 300,
    timeWindow: "1 minute",
    errorResponseBuilder: (_req, context) => ({
      success: false,
      data: null,
      error: {
        code: ErrorCode.RATE_LIMITED,
        message: `Rate limit exceeded. Retry after ${Math.round(context.ttl / 1000)}s`,
        details: null,
      },
      meta: {
        requestId: "unknown",
        service: "auth-service",
        timestamp: new Date().toISOString(),
      },
    }),
  })

  // Correlation ID on every request
  fastify.addHook("onRequest", async (request, reply) => {
    request.correlationId = resolveCorrelationId(
      request.headers as Record<string, string | undefined>
    )
    void reply.header("X-Correlation-Id", request.correlationId)
  })

  // Request timing log
  fastify.addHook("onRequest", async (request) => {
    ;(request as unknown as { startTime: number }).startTime = Date.now()
  })

  fastify.addHook("onResponse", async (request, reply) => {
    const startTime = (request as unknown as { startTime?: number }).startTime
    const durationMs = startTime !== undefined ? Date.now() - startTime : -1
    logger.info(
      {
        correlationId: request.correlationId,
        method: request.method,
        path: request.url,
        statusCode: reply.statusCode,
        durationMs,
      },
      "HTTP request"
    )
  })

  // Global error handler
  fastify.setErrorHandler((error, request, reply) => {
    const meta = {
      requestId: request.correlationId,
      service: "auth-service",
    }

    // Narrowing error type
    const err = error instanceof Error ? error : new Error(String(error))

    if (isAppError(err)) {
      if (err.statusCode < 500) {
        logger.warn({ correlationId: request.correlationId, code: err.code }, err.message)
      } else {
        logServiceError(logger, err, { correlationId: request.correlationId })
      }
      return reply.status(err.statusCode).send(
        fail(err.code, err.message, meta, err.details)
      )
    }

    logServiceError(logger, err, { correlationId: request.correlationId })
    return reply.status(500).send(
      fail(ErrorCode.INTERNAL, "An unexpected error occurred", meta)
    )
  })

  // Routes
  await fastify.register(healthRoutes)
  await fastify.register(authRoutes)

  return fastify
}

async function start(): Promise<void> {
  // Connect to Redis before starting
  await redis.connect()

  const fastify = await buildServer()

  await fastify.listen({ port: config.port, host: config.host })
  logger.info({ port: config.port }, "auth-service started")

  // Graceful shutdown
  const shutdown = async (signal: string): Promise<void> => {
    logger.info({ signal }, "Shutdown signal received")
    await fastify.close()
    await prisma.$disconnect()
    await redis.quit()
    logger.info("auth-service shutdown complete")
    process.exit(0)
  }

  process.on("SIGTERM", () => void shutdown("SIGTERM"))
  process.on("SIGINT", () => void shutdown("SIGINT"))
}

start().catch((error: unknown) => {
  const err = error instanceof Error ? error : new Error(String(error))
  logger.error({ error: err }, "Failed to start auth-service")
  process.exit(1)
})
