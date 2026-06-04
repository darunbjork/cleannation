import fp from "fastify-plugin"
import jwt from "@fastify/jwt"
import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import {
  UnauthorizedError,
  ForbiddenError,
  TokenExpiredError,
  TokenInvalidError,
} from "@cleannation/shared-utils"
import type { JwtPayload, UserRole } from "@cleannation/shared-types"
import { config } from "../config/index"

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>
    authorize: (
      roles: UserRole[]
    ) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  }
}

// Extend FastifyRequest specifically for this plugin to avoid type collision
// We need to use FastifyRequestWithUser in handlers
interface FastifyRequestWithUser extends FastifyRequest {
  user: JwtPayload
}

export default fp(async function jwtPlugin(fastify: FastifyInstance) {
  await fastify.register(jwt, {
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
      const cookieToken = request.cookies?.["access_token"]

      const token = authHeader?.startsWith("Bearer ")
        ? authHeader.slice(7)
        : (cookieToken ?? null)

      if (token === null) {
        throw new UnauthorizedError("No authentication token provided")
      }

      try {
        const payload = fastify.jwt.verify<JwtPayload>(token)
        // Cast to our interface
        ;(request as FastifyRequestWithUser).user = payload
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
        const user = (request as FastifyRequestWithUser).user
        if (!roles.includes(user.role)) {
          throw new ForbiddenError(
            `This action requires one of: ${roles.join(", ")}`
          )
        }
      }
    }
  )
})
