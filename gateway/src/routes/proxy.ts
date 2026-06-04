import type { FastifyInstance, FastifyRequest } from "fastify"
import httpProxy from "@fastify/http-proxy"
import {
  buildPropagationHeaders,
} from "@cleannation/shared-utils"
import { config } from "../config/index"
import type { JwtPayload } from "@cleannation/shared-types"

interface FastifyRequestWithUser extends FastifyRequest {
  user: JwtPayload
}

export default async function proxyRoutes(
  fastify: FastifyInstance
): Promise<void> {
  await fastify.register(httpProxy, {
    upstream: config.services.auth,
    prefix: "/api/v1/auth",
    rewritePrefix: "/auth",
    config: {
      rateLimit: config.rateLimits.auth,
    },
    beforeHandler: async (request) => {
      const headers = buildPropagationHeaders(request.correlationId)
      Object.assign(request.headers, headers)
    },
  })

  await fastify.register(httpProxy, {
    upstream: config.services.event,
    prefix: "/api/v1/events",
    rewritePrefix: "/events",
    preHandler: async (request, reply) => {
      await fastify.authenticate(request, reply)
    },
    beforeHandler: async (request) => {
      const user = (request as FastifyRequestWithUser).user
      const headers = {
        ...buildPropagationHeaders(request.correlationId),
        "x-user-id": user.sub,
        "x-user-role": user.role,
        "x-org-id": user.orgId ?? "",
      }
      Object.assign(request.headers, headers)
    },
  })

  await fastify.register(httpProxy, {
    upstream: config.services.location,
    prefix: "/api/v1/locations",
    rewritePrefix: "/locations",
    preHandler: async (request, reply) => {
      await fastify.authenticate(request, reply)
    },
    beforeHandler: async (request) => {
      const user = (request as FastifyRequestWithUser).user
      const headers = {
        ...buildPropagationHeaders(request.correlationId),
        "x-user-id": user.sub,
        "x-user-role": user.role,
      }
      Object.assign(request.headers, headers)
    },
  })

  await fastify.register(httpProxy, {
    upstream: config.services.media,
    prefix: "/api/v1/media",
    rewritePrefix: "/media",
    config: {
      rateLimit: config.rateLimits.mediaUpload,
    },
    preHandler: async (request, reply) => {
      await fastify.authenticate(request, reply)
    },
    beforeHandler: async (request) => {
      const user = (request as FastifyRequestWithUser).user
      const headers = {
        ...buildPropagationHeaders(request.correlationId),
        "x-user-id": user.sub,
        "x-user-role": user.role,
        "x-org-id": user.orgId ?? "",
      }
      Object.assign(request.headers, headers)
    },
  })

  await fastify.register(httpProxy, {
    upstream: config.services.gamification,
    prefix: "/api/v1/gamification",
    rewritePrefix: "/gamification",
    config: {
      rateLimit: config.rateLimits.read,
    },
    preHandler: async (request, reply) => {
      await fastify.authenticate(request, reply)
    },
    beforeHandler: async (request) => {
      const user = (request as FastifyRequestWithUser).user
      const headers = {
        ...buildPropagationHeaders(request.correlationId),
        "x-user-id": user.sub,
        "x-user-role": user.role,
      }
      Object.assign(request.headers, headers)
    },
  })

  await fastify.register(httpProxy, {
    upstream: config.services.payment,
    prefix: "/api/v1/payments",
    rewritePrefix: "/payments",
    config: {
      rateLimit: config.rateLimits.payment,
    },
    preHandler: async (request, reply) => {
      await fastify.authenticate(request, reply)
      await fastify.authorize(["org_admin", "platform_admin"])(request, reply)
    },
    beforeHandler: async (request) => {
      const user = (request as FastifyRequestWithUser).user
      const headers = {
        ...buildPropagationHeaders(request.correlationId),
        "x-user-id": user.sub,
        "x-user-role": user.role,
        "x-org-id": user.orgId ?? "",
      }
      Object.assign(request.headers, headers)
    },
  })

  await fastify.register(httpProxy, {
    upstream: config.services.event,
    prefix: "/api/v1/graphql",
    rewritePrefix: "/graphql",
    preHandler: async (request, reply) => {
      await fastify.authenticate(request, reply)
    },
    beforeHandler: async (request) => {
      const user = (request as FastifyRequestWithUser).user
      const headers = {
        ...buildPropagationHeaders(request.correlationId),
        "x-user-id": user.sub,
        "x-user-role": user.role,
      }
      Object.assign(request.headers, headers)
    },
  })

  await fastify.register(httpProxy, {
    upstream: config.services.payment,
    prefix: "/api/v1/webhooks",
    rewritePrefix: "/webhooks",
    beforeHandler: async (request) => {
      const headers = buildPropagationHeaders(request.correlationId)
      Object.assign(request.headers, headers)
    },
  })
}
