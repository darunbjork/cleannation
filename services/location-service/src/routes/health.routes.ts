// services/location-service/src/routes/health.routes.ts

import type { FastifyInstance } from "fastify"
import { ServiceHealthChecker, createLogger } from "@cleannation/shared-utils"
import { prisma } from "../db/prisma"

const logger = createLogger("location-service")
const healthChecker = new ServiceHealthChecker("location-service", logger)

healthChecker.register("postgres-postgis", async () => {
  // Verify PostGIS extension is available — not just Postgres
  await prisma.$queryRaw`SELECT PostGIS_Version()`
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