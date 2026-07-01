import type { FastifyRequest } from "fastify"
import { UnauthorizedError } from "@cleannation/shared-utils"

export interface ExtractedUser {
  userId: string
  role: string
  orgId: string | null
}

export function extractUser(request: FastifyRequest): ExtractedUser {
  const userId = request.headers["x-user-id"]
  const role = request.headers["x-user-role"]
  const orgId = request.headers["x-org-id"]

  if (typeof userId !== "string" || userId === "") {
    throw new UnauthorizedError("Missing user context")
  }

  return {
    userId,
    role: typeof role === "string" ? role : "volunteer",
    orgId: typeof orgId === "string" && orgId !== "" ? orgId : null,
  }
}