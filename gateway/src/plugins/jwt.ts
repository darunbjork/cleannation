import fp from "fastify-plugin"
import jwt, { type FastifyJWTOptions } from "@fastify/jwt"
import type { FastifyInstance, FastifyRequest, FastifyReply, FastifyPluginAsync } from "fastify"
import {
  UnauthorizedError,
  ForbiddenError,
  TokenExpiredError,
  TokenInvalidError,
} from "@cleannation/shared-utils"
import type { JwtPayload, UserRole } from "@cleannation/shared-types"
import { config } from "../config/index"

export default fp(async function jwtPlugin(fastify: FastifyInstance) {
  await fastify.register(jwt as unknown as FastifyPluginAsync<FastifyJWTOptions>, {
    secret: {
      public: config.jwt.publicKey,
    },
    verify: {
      algorithms: [config.jwt.algorithm],
    },
  })

  fastify.decorate(
    "authenticate",
    async function authenticate(
      request: FastifyRequest,
      _reply: FastifyReply
    ): Promise<void> {
      const authHeader = request.headers.authorization
      // Explicitly type the cookies to satisfy TS despite augmentation
      const cookies = request.cookies as Record<string, string>
      const cookieToken = cookies?.["access_token"]

      const token = authHeader?.startsWith("Bearer ")
        ? authHeader.slice(7)
        : (cookieToken ?? null)

      if (token === null) {
        throw new UnauthorizedError("No authentication token provided")
      }

      try {
        const payload = fastify.jwt.verify<JwtPayload>(token)
        request.user = payload
      } catch (error: unknown) {
        if (
          error instanceof Error &&
          error.message.includes("expired")
        ) {
          throw new TokenExpiredError()
        }
        throw new TokenInvalidError()
      }
    }
  )

  fastify.decorate(
    "authorize",
    function authorize(roles: UserRole[]) {
      return async function checkRole(
        request: FastifyRequest,
        _reply: FastifyReply
      ): Promise<void> {
        if (!roles.includes(request.user.role)) {
          throw new ForbiddenError(
            `This action requires one of: ${roles.join(", ")}`
          )
        }
      }
    }
  )
})
