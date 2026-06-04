import fp from "fastify-plugin"
import type { FastifyInstance } from "fastify"
import { createLogger, logRequest } from "@cleannation/shared-utils"

const logger = createLogger("gateway")

export default fp(async function requestLoggerMiddleware(
  fastify: FastifyInstance
) {
  fastify.addHook("onRequest", async (request) => {
    ;(request as unknown as { startTime: number }).startTime = Date.now()
  })

  fastify.addHook("onResponse", async (request, reply) => {
    const startTime = (request as unknown as { startTime?: number })
      .startTime

    const durationMs =
      startTime !== undefined ? Date.now() - startTime : -1

    const userId =
      "user" in request &&
      request.user !== null &&
      typeof (request.user as { sub?: string }).sub === "string"
        ? (request.user as { sub: string }).sub
        : undefined

    logRequest(logger, {
      correlationId: request.correlationId,
      method: request.method,
      path: request.url,
      statusCode: reply.statusCode,
      durationMs,
      ...(userId !== undefined ? { userId } : {}),
    })
  })
})
