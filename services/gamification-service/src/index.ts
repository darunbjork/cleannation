// services/gamification-service/src/index.ts

import Fastify from "fastify"
import helmet from "@fastify/helmet"
import cors from "@fastify/cors"
import rateLimit from "@fastify/rate-limit"
import websocketPlugin from "@fastify/websocket"
import { ApolloServer } from "@apollo/server"
import {
  fastifyApolloDrainPlugin,
  fastifyApolloHandler,
} from "@as-integrations/fastify"
import {
  createLogger,
  resolveCorrelationId,
  isAppError,
  logServiceError,
} from "@cleannation/shared-utils"
import { ErrorCode, fail } from "@cleannation/shared-types"
import { config } from "./config/index"
import { prisma } from "./db/prisma"
import { redis } from "./db/redis"
import { startConsumer, stopConsumer } from "./kafka/consumer"
import { LeaderboardService } from "./services/leaderboard.service"
import { BadgeRepository } from "./repositories/badge.repository"
import { typeDefs } from "./graphql/schema/index"
import { resolvers } from "./graphql/resolvers/index"
import { buildContext } from "./graphql/context"
import { handleGamificationWebSocket } from "./websocket/handler"
import healthRoutes from "./routes/health.routes"
import type { WebSocket } from "ws"
import type { FastifyRequest } from "fastify"

const logger = createLogger("gamification-service")

declare module "fastify" {
  interface FastifyRequest {
    correlationId: string
  }
}

async function buildServer() {
  const fastify = Fastify({ logger: false })

  // Register plugins with type assertion to bypass v4/v5 mismatches
  await fastify.register(helmet as any)
  await fastify.register(cors as any, {
    origin: (process.env["CORS_ORIGIN"] ?? "http://localhost:5173")
      .split(","),
    credentials: true,
  })
  await fastify.register(rateLimit as any, {
    max: 300,
    timeWindow: "1 minute",
  })
  await fastify.register(websocketPlugin as any, {
    options: { maxPayload: 4096 },
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
      durationMs:
        startTime !== undefined ? Date.now() - startTime : -1,
    }, "HTTP request")
  })

  // Error handler
  fastify.setErrorHandler((error, request, reply) => {
    const meta = {
      requestId: request.correlationId,
      service: "gamification-service",
    }
    if (isAppError(error)) {
      return reply
        .status(error.statusCode)
        .send(fail(error.code, error.message, meta, error.details))
    }
    logServiceError(logger, error, {
      correlationId: request.correlationId,
    })
    return reply
      .status(500)
      .send(fail(ErrorCode.INTERNAL, "An unexpected error occurred", meta))
  })

  // ── APOLLO GRAPHQL ─────────────────────────────────────────────────
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [fastifyApolloDrainPlugin(fastify)],
  })

  await apollo.start()

  await fastify.register(async (app) => {
    app.route({
      url: "/graphql",
      method: ["GET", "POST", "OPTIONS"],
      handler: fastifyApolloHandler(apollo, {
        context: async (request) =>
          buildContext(
            request.headers as Record<string, string | undefined>
          ),
      }),
    })
  })

  // ── WEBSOCKET — live point/badge notifications ─────────────────────
  // TypeScript doesn't recognise the websocket overload properly,
  // so we cast to any to bypass the type check.
  ;(fastify.get as any)(
    "/ws/gamification",
    { websocket: true },
    (socket: WebSocket, req: FastifyRequest) => {
      handleGamificationWebSocket(socket, req)
    }
  )

  // Health routes
  await fastify.register(healthRoutes)

  return { fastify, apollo }
}

async function start(): Promise<void> {
  // Connect Redis
  await redis.connect()

  // Connect Kafka consumer
  await startConsumer()

  // Seed badge catalog
  const badgeRepo = new BadgeRepository()
  await badgeRepo.seedBadges()
  logger.info("Badge catalog seeded")

  // Rebuild leaderboards from PostgreSQL on startup
  // Ensures Redis is consistent after restarts
  const leaderboardService = new LeaderboardService()
  await leaderboardService.rebuildLeaderboards()

  // Hourly leaderboard rebuild — corrects any Redis drift
  const rebuildInterval = setInterval(
    () => {
      leaderboardService.rebuildLeaderboards().catch((err: unknown) => {
        logger.error(
          { error: err instanceof Error ? err.message : "unknown" },
          "Leaderboard rebuild failed"
        )
      })
    },
    60 * 60 * 1000  // 1 hour
  )

  const { fastify, apollo } = await buildServer()
  await fastify.listen({ port: config.port, host: config.host })

  logger.info({ port: config.port }, "gamification-service started")

  const shutdown = async (signal: string): Promise<void> => {
    logger.info({ signal }, "Shutdown signal received")
    clearInterval(rebuildInterval)
    await stopConsumer()
    await fastify.close()
    await apollo.stop()
    await prisma.$disconnect()
    await redis.quit()
    logger.info("gamification-service shutdown complete")
    process.exit(0)
  }

  process.on("SIGTERM", () => void shutdown("SIGTERM"))
  process.on("SIGINT", () => void shutdown("SIGINT"))
}

start().catch((error: unknown) => {
  logger.error({ error }, "Failed to start gamification-service")
  process.exit(1)
})