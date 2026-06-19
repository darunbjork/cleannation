// services/event-service/src/index.ts

import Fastify, { type FastifyInstance, type FastifyPluginCallback } from "fastify"
import helmet, { type FastifyHelmetOptions } from "@fastify/helmet"
import cors, { type FastifyCorsOptions } from "@fastify/cors"
import rateLimit, { type RateLimitPluginOptions } from "@fastify/rate-limit"
import { ApolloServer } from "@apollo/server"
import { fastifyApolloDrainPlugin, fastifyApolloHandler } from "@as-integrations/fastify"
import {
  createLogger,
  resolveCorrelationId,
  isAppError,
  logServiceError,
} from "@cleannation/shared-utils"
import { ErrorCode, fail } from "@cleannation/shared-types"
import { config } from "./config/index"
import { prisma } from "./db/prisma"
import { connectProducer, disconnectProducer } from "./kafka/producer"
import eventRoutes from "./routes/event.routes"
import healthRoutes from "./routes/health.routes"
import { typeDefs } from "./graphql/schema/event.graphql"
import { resolvers } from "./graphql/resolvers/index"
import { buildContext } from "./graphql/context"

const logger = createLogger("event-service")

declare module "fastify" {
  interface FastifyRequest {
    correlationId: string
  }
}

async function buildServer() {
  const fastify: FastifyInstance = Fastify({ logger: false })

  await fastify.register(helmet as unknown as FastifyPluginCallback<FastifyHelmetOptions>, {})
  await fastify.register(cors as unknown as FastifyPluginCallback<FastifyCorsOptions>, {
    origin: config.cors.origin.split(","),
    credentials: true,
  })
  await fastify.register(rateLimit as unknown as FastifyPluginCallback<RateLimitPluginOptions>, {
    max: 300,
    timeWindow: "1 minute",
  })

  // Correlation ID on every request
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
      service: "event-service",
    }

    if (isAppError(error)) {
      if (error.statusCode < 500) {
        logger.warn({ code: error.code }, error.message)
      } else {
        logServiceError(logger, error, { correlationId: request.correlationId })
      }
      return reply.status(error.statusCode).send(
        fail(error.code, error.message, meta, error.details)
      )
    }

    logServiceError(logger, error, { correlationId: request.correlationId })
    return reply.status(500).send(
      fail(ErrorCode.INTERNAL, "An unexpected error occurred", meta)
    )
  })

  // ── APOLLO SERVER (GraphQL) ─────────────────────────────────────────────
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    // Apollo drain plugin — ensures in-flight GraphQL requests complete
    // before server shuts down (same graceful shutdown guarantee as REST)
    plugins: [fastifyApolloDrainPlugin(fastify)],
  })

  await apollo.start()

  // Register GraphQL endpoint under /graphql
  // Gateway routes /api/v1/graphql → /graphql on this service
  await fastify.register(async (app) => {
    app.route({
      url: "/graphql",
      method: ["GET", "POST", "OPTIONS"],
      handler: fastifyApolloHandler(apollo, {
        context: async (request) =>
          buildContext(request.headers as Record<string, string | string[] | undefined>),
      }),
    })
  })

  // REST routes
  await fastify.register(healthRoutes)
  await fastify.register(eventRoutes)

  return { fastify, apollo }
}

async function start(): Promise<void> {
  // Connect Kafka producer before accepting requests
  await connectProducer()

  const { fastify, apollo } = await buildServer()

  await fastify.listen({ port: config.port, host: config.host })
  logger.info({ port: config.port }, "event-service started")

  const shutdown = async (signal: string): Promise<void> => {
    logger.info({ signal }, "Shutdown signal received")
    await fastify.close()
    await apollo.stop()
    await prisma.$disconnect()
    await disconnectProducer()
    logger.info("event-service shutdown complete")
    process.exit(0)
  }

  process.on("SIGTERM", () => void shutdown("SIGTERM"))
  process.on("SIGINT", () => void shutdown("SIGINT"))
}

start().catch((error: unknown) => {
  logger.error({ error }, "Failed to start event-service")
  process.exit(1)
})
