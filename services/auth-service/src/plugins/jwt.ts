import fp from "fastify-plugin"
import fjwt, { type FastifyJWTOptions } from "@fastify/jwt"
import type {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify"
import {
  UnauthorizedError,
  TokenExpiredError,
  TokenInvalidError,
} from "@cleannation/shared-utils"
import type { JwtPayload } from "@cleannation/shared-types"
import { config } from "../config/index"

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
    jwt: {
      verify: <T = JwtPayload>(token: string) => T
    }
  }

  interface FastifyRequest {
    user: JwtPayload
  }
}

export default fp(
  (async function jwtPlugin(fastify: FastifyInstance) {
    await fastify.register(
      fjwt as unknown as FastifyPluginAsync<FastifyJWTOptions>,
      {
        secret: {
          private: config.jwt.privateKey,
          public: config.jwt.publicKey,
        },
        verify: {
          algorithms: [config.jwt.algorithm],
        },
      }
    )

    fastify.decorate(
      "authenticate",
      async function authenticate(
        request: FastifyRequest,
        _reply: FastifyReply
      ): Promise<void> {
        const authHeader = request.headers.authorization
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
          if (error instanceof Error &&
            error.message.toLowerCase().includes("expired")) {
            throw new TokenExpiredError()
          }
          throw new TokenInvalidError()
        }
      }
    )
  }) as unknown as Parameters<typeof fp>[0]
)