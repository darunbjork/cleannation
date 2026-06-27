import type { FastifyInstance, FastifyRequest, FastifyReply, FastifyPluginCallback } from "fastify"
import httpProxy, { type FastifyHttpProxyOptions } from "@fastify/http-proxy"
import { buildPropagationHeaders } from "@cleannation/shared-utils"
import { config } from "../config/index"
import { AuthenticatedRequest } from "../types/auth"

export default async function proxyRoutes(fastify: FastifyInstance): Promise<void> {

  const proxyPlugin = httpProxy as unknown as FastifyPluginCallback<FastifyHttpProxyOptions>

  const registerProxy = async (opts: any) => {
    await fastify.register(proxyPlugin, opts)
  }

  await registerProxy({
    upstream: config.services.auth,
    prefix: "/api/v1/auth",
    rewritePrefix: "/auth",
    config: { rateLimit: config.rateLimits.auth },
    preHandler: async (request: FastifyRequest) => {
      const headers = buildPropagationHeaders(request.correlationId)
      Object.assign(request.headers, headers)
    },
  })

  await registerProxy({
    upstream: config.services.event,
    prefix: "/api/v1/events",
    rewritePrefix: "/events",
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
      await fastify.authenticate(request, reply)
      const authReq = request as AuthenticatedRequest
      const headers = {
        ...buildPropagationHeaders(authReq.correlationId),
        "x-user-id": authReq.user.sub,
        "x-user-role": authReq.user.role,
        "x-org-id": authReq.user.orgId ?? "",
      }
      Object.assign(request.headers, headers)
    },
  })

  await registerProxy({
    upstream: config.services.location,
    prefix: "/api/v1/locations",
    rewritePrefix: "/locations",
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
      await fastify.authenticate(request, reply)
      const authReq = request as AuthenticatedRequest
      const headers = {
        ...buildPropagationHeaders(authReq.correlationId),
        "x-user-id": authReq.user.sub,
        "x-user-role": authReq.user.role,
      }
      Object.assign(request.headers, headers)
    },
  })

  await registerProxy({
    upstream: config.services.media,
    prefix: "/api/v1/media",
    rewritePrefix: "/media",
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
      await fastify.authenticate(request, reply)
      const authReq = request as AuthenticatedRequest
      const headers = {
        ...buildPropagationHeaders(authReq.correlationId),
        "x-user-id": authReq.user.sub,
        "x-user-role": authReq.user.role,
        "x-org-id": authReq.user.orgId ?? "",
      }
      Object.assign(request.headers, headers)
    },
    config: { rateLimit: config.rateLimits.mediaUpload },
  })

  await registerProxy({
    upstream: config.services.gamification,
    prefix: "/api/v1/gamification",
    rewritePrefix: "/gamification",
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
      await fastify.authenticate(request, reply)
      const authReq = request as AuthenticatedRequest
      const headers = {
        ...buildPropagationHeaders(authReq.correlationId),
        "x-user-id": authReq.user.sub,
        "x-user-role": authReq.user.role,
      }
      Object.assign(request.headers, headers)
    },
    config: { rateLimit: config.rateLimits.read },
  })

  await registerProxy({
    upstream: config.services.payment,
    prefix: "/api/v1/payments",
    rewritePrefix: "/payments",
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
      await fastify.authenticate(request, reply)
      await fastify.authorize(["org_admin", "platform_admin"])(request, reply)
      const authReq = request as AuthenticatedRequest
      const headers = {
        ...buildPropagationHeaders(authReq.correlationId),
        "x-user-id": authReq.user.sub,
        "x-user-role": authReq.user.role,
        "x-org-id": authReq.user.orgId ?? "",
      }
      Object.assign(request.headers, headers)
    },
    config: { rateLimit: config.rateLimits.payment },
  })

  await registerProxy({
    upstream: config.services.event,
    prefix: "/api/v1/graphql",
    rewritePrefix: "/graphql",
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
      await fastify.authenticate(request, reply)
      const authReq = request as AuthenticatedRequest
      const headers = {
        ...buildPropagationHeaders(authReq.correlationId),
        "x-user-id": authReq.user.sub,
        "x-user-role": authReq.user.role,
      }
      Object.assign(request.headers, headers)
    },
  })

  await registerProxy({
    upstream: config.services.payment,
    prefix: "/api/v1/webhooks",
    rewritePrefix: "/webhooks",
    preHandler: async (request: FastifyRequest) => {
      const headers = buildPropagationHeaders(request.correlationId)
      Object.assign(request.headers, headers)
    },
  })
}
