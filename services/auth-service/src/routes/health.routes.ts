// services/auth-service/src/routes/health.routes.ts

import type { FastifyInstance } from "fastify"
import {
  ServiceHealthChecker,
  createLogger,
} from "@cleannation/shared-utils"
import { prisma } from "../db/prisma"
import { redis } from "../db/redis"

const logger = createLogger("auth-service")
const healthChecker = new ServiceHealthChecker("auth-service", logger)

// Register dependency probes
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
  fastify.get("/health/live", async (_req, reply) => {
    return reply.status(200).send(healthChecker.liveness())
  })

  fastify.get("/health/ready", async (_req, reply) => {
    const result = await healthChecker.readiness()
    const statusCode = result.status === "ok" ? 200 : 503
    return reply.status(statusCode).send(result)
  })
}
