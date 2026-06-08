import { FastifyRequest } from "fastify"
import { JwtPayload } from "@cleannation/shared-types"

// Extend FastifyRequest for authenticated requests
export interface AuthenticatedRequest extends FastifyRequest {
  user: JwtPayload
}
