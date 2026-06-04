import type { FastifyInstance } from "fastify"
import {
  ServiceHealthChecker,
  createLogger,
} from "@cleannation/shared-utils"

const logger = createLogger("gateway")
const healthChecker = new ServiceHealthChecker("gateway", logger)

healthChecker.register("auth-service", async () => {
  const url = `${process.env["AUTH_SERVICE_URL"]}/health/live`
  const res = await fetch(url, { signal: AbortSignal.timeout(2000) })
  if (!res.ok) throw new Error(`auth-service returned ${res.status}`)
})

healthChecker.register("event-service", async () => {
  const url = `${process.env["EVENT_SERVICE_URL"]}/health/live`
  const res = await fetch(url, { signal: AbortSignal.timeout(2000) })
  if (!res.ok) throw new Error(`event-service returned ${res.status}`)
})

export default async function healthRoutes(
  fastify: FastifyInstance
): Promise<void> {
  fastify.get("/health/live", async (_request, reply) => {
    return reply.status(200).send(healthChecker.liveness())
  })

  fastify.get("/health/ready", async (_request, reply) => {
    const result = await healthChecker.readiness()
    const statusCode = result.status === "ok" ? 200 : 503
    return reply.status(statusCode).send(result)
  })
}
