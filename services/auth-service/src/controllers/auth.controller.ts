// services/auth-service/src/controllers/auth.controller.ts
// HTTP layer only.
// Controllers have ONE job: extract input → call service → send response.
// Zero business logic. Zero try/catch. Zero direct DB calls.
// All errors thrown by services bubble to the global error handler.

import type { FastifyRequest, FastifyReply } from "fastify"
import { asyncHandler, createLogger } from "@cleannation/shared-utils"
import { ok } from "@cleannation/shared-types"
import { AuthService } from "../services/auth.service"
import { config } from "../config/index"

const authService = new AuthService()
const logger = createLogger("auth-service")

// Cookie configuration — HttpOnly prevents JS access (XSS protection)
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env["NODE_ENV"] === "production",
  sameSite: "strict" as const,
  path: "/auth/refresh",  // Cookie only sent to refresh endpoint
  maxAge: config.jwt.refreshTokenExpiryMs / 1000,  // seconds
}

// POST /auth/register
export const register = asyncHandler(async (
  request: FastifyRequest<{
    Body: {
      email: string
      username: string
      password: string
      displayName: string
    }
  }>,
  reply: FastifyReply
) => {
  const result = await authService.register({
    ...request.body,
    userAgent: request.headers["user-agent"],
    ipAddress: request.ip,
  })

  // Set refresh token as HttpOnly cookie — never in response body
  void reply.setCookie(
    "refresh_token",
    result.refreshToken,
    REFRESH_COOKIE_OPTIONS
  )

  return reply.status(201).send(
    ok(
      { accessToken: result.accessToken, user: result.user },
      {
        requestId: request.correlationId ?? "unknown",
        service: "auth-service",
      }
    )
  )
})

// POST /auth/login
export const login = asyncHandler(async (
  request: FastifyRequest<{
    Body: { email: string; password: string }
  }>,
  reply: FastifyReply
) => {
  const result = await authService.login({
    ...request.body,
    userAgent: request.headers["user-agent"],
    ipAddress: request.ip,
  })

  void reply.setCookie(
    "refresh_token",
    result.refreshToken,
    REFRESH_COOKIE_OPTIONS
  )

  return reply.status(200).send(
    ok(
      { accessToken: result.accessToken, user: result.user },
      {
        requestId: request.correlationId ?? "unknown",
        service: "auth-service",
      }
    )
  )
})

// POST /auth/refresh
export const refresh = asyncHandler(async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  // Read refresh token from HttpOnly cookie — never from body
  const refreshTokenPlaintext = request.cookies?.["refresh_token"]

  if (refreshTokenPlaintext === undefined) {
    return reply.status(401).send({
      success: false,
      data: null,
      error: { code: "UNAUTHORIZED", message: "No refresh token", details: null },
      meta: {
        requestId: request.correlationId ?? "unknown",
        service: "auth-service",
        timestamp: new Date().toISOString(),
      },
    })
  }

  const result = await authService.refresh({
    refreshTokenPlaintext,
    userAgent: request.headers["user-agent"],
    ipAddress: request.ip,
  })

  // Set new refresh token cookie — old one is now invalid
  void reply.setCookie(
    "refresh_token",
    result.refreshToken,
    REFRESH_COOKIE_OPTIONS
  )

  return reply.status(200).send(
    ok(
      { accessToken: result.accessToken, user: result.user },
      {
        requestId: request.correlationId ?? "unknown",
        service: "auth-service",
      }
    )
  )
})

// POST /auth/logout
export const logout = asyncHandler(async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const refreshTokenPlaintext = request.cookies?.["refresh_token"]

  if (refreshTokenPlaintext !== undefined) {
    await authService.logout({ refreshTokenPlaintext })
  }

  // Clear the cookie regardless — idempotent logout
  void reply.clearCookie("refresh_token", {
    path: "/auth/refresh",
  })

  return reply.status(200).send(
    ok(
      { message: "Logged out successfully" },
      {
        requestId: request.correlationId ?? "unknown",
        service: "auth-service",
      }
    )
  )
})

// GET /auth/me
export const getMe = asyncHandler(async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  // User ID comes from the gateway's x-user-id header
  // The gateway already validated the JWT — we trust it
  const userId = request.headers["x-user-id"]

  if (typeof userId !== "string") {
    return reply.status(401).send({
      success: false,
      data: null,
      error: {
        code: "UNAUTHORIZED",
        message: "Missing user context",
        details: null,
      },
      meta: {
        requestId: request.correlationId ?? "unknown",
        service: "auth-service",
        timestamp: new Date().toISOString(),
      },
    })
  }

  const { UserRepository } = await import("../repositories/user.repository")
  const userRepo = new UserRepository()
  const user = await userRepo.findById(userId)

  if (user === null) {
    const { NotFoundError } = await import("@cleannation/shared-utils")
    throw new NotFoundError("User")
  }

  return reply.status(200).send(
    ok(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        role: user.role.toLowerCase(),
        organizationId: user.organizationId,
        isVerified: user.isVerified,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
      {
        requestId: request.correlationId ?? "unknown",
        service: "auth-service",
      }
    )
  )
})