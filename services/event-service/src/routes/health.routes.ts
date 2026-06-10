// services/event-service/src/routes/health.routes.ts

import type { FastifyInstance } from "fastify"
import { ServiceHealthChecker, createLogger } from "@cleannation/shared-utils"
import { prisma } from "../db/prisma"

const logger = createLogger("event-service")
const healthChecker = new ServiceHealthChecker("event-service", logger)

healthChecker.register("postgres", async () => {
  await prisma.$queryRaw`SELECT 1`
})

export default async function healthRoutes(
  fastify: FastifyInstance
): Promise<void> {
  fastify.get("/health/live", async (_req, reply) =>
    reply.status(200).send(healthChecker.liveness())
  )

  fastify.get("/health/ready", async (_req, reply) => {
    const result = await healthChecker.readiness()
    return reply.status(result.status === "ok" ? 200 : 503).send(result)
  })
}
