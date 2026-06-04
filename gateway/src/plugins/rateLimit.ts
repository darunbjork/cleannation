import fp from "fastify-plugin"
import rateLimit from "@fastify/rate-limit"
import type { FastifyInstance } from "fastify"
import { config } from "../config/index"

export default fp(async function rateLimitPlugin(
  fastify: FastifyInstance
) {
  await fastify.register(rateLimit, {
    redis: process.env["REDIS_URL"]
      ? {
          host: new URL(process.env["REDIS_URL"]).hostname,
          port: parseInt(
            new URL(process.env["REDIS_URL"]).port ?? "6379"
          ),
        }
      : undefined,

    keyGenerator: (request) => {
      if ("user" in request && request.user !== null) {
        const user = request.user as { sub?: string }
        if (typeof user.sub === "string") {
          return `user:${user.sub}`
        }
      }
      return request.ip
    },

    max: config.rateLimits.read.max,
    timeWindow: config.rateLimits.read.timeWindow,

    errorResponseBuilder: (request, context) => ({
      success: false,
      data: null,
      error: {
        code: "RATE_LIMITED",
        message: `Too many requests. Retry after ${Math.round(context.ttl / 1000)} seconds`,
        details: { retryAfterMs: context.ttl },
      },
      meta: {
        requestId:
          (request.headers["x-correlation-id"] as string) ??
          "unknown",
        timestamp: new Date().toISOString(),
        service: "gateway",
      },
    }),
  })
})

export { config as rateLimitConfig }
