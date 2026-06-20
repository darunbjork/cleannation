// services/gamification-service/src/routes/health.routes.ts

import type { FastifyInstance } from "fastify"
import { ServiceHealthChecker, createLogger } from "@cleannation/shared-utils"
import { prisma } from "../db/prisma"
import { redis } from "../db/redis"
import { getConnectionCount } from "../websocket/notifier"

const logger = createLogger("gamification-service")
const healthChecker = new ServiceHealthChecker(
  "gamification-service",
  logger
)

healthChecker.register("postgres", async () => {
  await prisma.$queryRaw`SELECT 1`
})

healthChecker.register("redis", async () => {
  const pong = await redis.ping()
  if (pong !== "PONG") throw new Error("Redis ping failed")
})

export default async function healthRoutes(
  fastify: FastifyInstance
): Promise<void> {
  fastify.get("/health/live", async (_req, reply) =>
    reply.status(200).send(healthChecker.liveness())
  )

  fastify.get("/health/ready", async (_req, reply) => {
    const result = await healthChecker.readiness()
    return reply
      .status(result.status === "ok" ? 200 : 503)
      .send(result)
  })

  // Diagnostics — WebSocket connection count for monitoring
  fastify.get("/health/connections", async (_req, reply) =>
    reply.status(200).send({
      websocketConnections: getConnectionCount(),
    })
  )
}