// services/notification-service/src/routes/health.routes.ts

import type { FastifyInstance } from "fastify"
import {
  ServiceHealthChecker,
  createLogger,
} from "@cleannation/shared-utils"
import { prisma } from "../db/prisma"
import { verifySmtpConnection } from "../email/sender"

const logger = createLogger("notification-service")
const healthChecker = new ServiceHealthChecker(
  "notification-service",
  logger
)

healthChecker.register("postgres", async () => {
  await prisma.$queryRaw`SELECT 1`
})

// SMTP check is non-critical — email failure should not make
// the service unready (other channels might still work)
// So we log but do not fail the readiness probe for SMTP issues
healthChecker.register("smtp", async () => {
  const ok = await verifySmtpConnection()
  if (!ok) {
    logger.warn("SMTP connection failed — email delivery unavailable")
    // Do not throw — service is still partially functional
  }
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
}