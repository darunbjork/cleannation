import fp from "fastify-plugin"
import type { FastifyInstance } from "fastify"
import {
  resolveCorrelationId,
} from "@cleannation/shared-utils"

declare module "fastify" {
  interface FastifyRequest {
    correlationId: string
  }
}

export default fp(async function correlationIdMiddleware(
  fastify: FastifyInstance
) {
  fastify.addHook("onRequest", async (request, reply) => {
    const correlationId = resolveCorrelationId(
      request.headers as Record<string, string | undefined>
    )

    request.correlationId = correlationId

    void reply.header("X-Correlation-Id", correlationId)
  })
})
