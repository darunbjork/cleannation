// services/auth-service/src/controllers/auth.controller.ts
import { asyncHandler } from "@cleannation/shared-utils"
import { ok } from "@cleannation/shared-types"
import { AuthService } from "../services/auth.service"
import { config } from "../config/index"

const authService = new AuthService()

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env["NODE_ENV"] === "production",
  sameSite: "strict" as const,
  path: "/auth/refresh",
  maxAge: config.jwt.refreshTokenExpiryMs / 1000,
}

// Helper to cast request with correlationId
const getCorrelationId = (request: any): string => 
  request.correlationId ?? "unknown"

// POST /auth/register
export const register = asyncHandler(async (request, reply) => {
  const body = request.body as {
    email: string
    username: string
    password: string
    displayName: string
  }
  const userAgent = request.headers["user-agent"];
  const serviceInput = {
    ...body,
    userAgent: typeof userAgent === 'string' ? userAgent : undefined,
    ipAddress: request.ip,
  };

  const result = await authService.register(serviceInput)

  void reply.setCookie("refresh_token", result.refreshToken, REFRESH_COOKIE_OPTIONS)

  return reply.status(201).send(
    ok(
      { accessToken: result.accessToken, user: result.user },
      { requestId: getCorrelationId(request), service: "auth-service" }
    )
  )
})

// POST /auth/login
export const login = asyncHandler(async (request, reply) => {
  const body = request.body as { email: string; password: string }
  const userAgent = request.headers["user-agent"];
  const serviceInput = {
    ...body,
    userAgent: typeof userAgent === 'string' ? userAgent : undefined,
    ipAddress: request.ip,
  };

  const result = await authService.login(serviceInput)

  void reply.setCookie("refresh_token", result.refreshToken, REFRESH_COOKIE_OPTIONS)

  return reply.status(200).send(
    ok(
      { accessToken: result.accessToken, user: result.user },
      { requestId: getCorrelationId(request), service: "auth-service" }
    )
  )
})

// POST /auth/refresh
export const refresh = asyncHandler(async (request, reply) => {
  const cookies = request.cookies as Record<string, string | undefined>
  const refreshTokenPlaintext = cookies?.["refresh_token"]

  if (!refreshTokenPlaintext) {
    return reply.status(401).send({
      success: false,
      data: null,
      error: { code: "UNAUTHORIZED", message: "No refresh token", details: null },
      meta: { requestId: getCorrelationId(request), service: "auth-service", timestamp: new Date().toISOString() },
    })
  }

  const userAgent = request.headers["user-agent"];
  const serviceInput = {
    refreshTokenPlaintext,
    userAgent: typeof userAgent === 'string' ? userAgent : undefined,
    ipAddress: request.ip,
  };

  const result = await authService.refresh(serviceInput)

  void reply.setCookie("refresh_token", result.refreshToken, REFRESH_COOKIE_OPTIONS)

  return reply.status(200).send(
    ok(
      { accessToken: result.accessToken, user: result.user },
      { requestId: getCorrelationId(request), service: "auth-service" }
    )
  )
})

// POST /auth/logout
export const logout = asyncHandler(async (request, reply) => {
  const cookies = request.cookies as Record<string, string | undefined>
  const refreshTokenPlaintext = cookies?.["refresh_token"]

  if (refreshTokenPlaintext) {
    await authService.logout({ refreshTokenPlaintext })
  }

  void reply.clearCookie("refresh_token", { path: "/auth/refresh" })

  return reply.status(200).send(
    ok(
      { message: "Logged out successfully" },
      { requestId: getCorrelationId(request), service: "auth-service" }
    )
  )
})

// GET /auth/me
export const getMe = asyncHandler(async (request, reply) => {
  const userId = request.headers["x-user-id"]

  if (typeof userId !== "string") {
    return reply.status(401).send({
      success: false,
      data: null,
      error: { code: "UNAUTHORIZED", message: "Missing user context", details: null },
      meta: { requestId: getCorrelationId(request), service: "auth-service", timestamp: new Date().toISOString() },
    })
  }

  const { UserRepository } = await import("../repositories/user.repository")
  const userRepo = new UserRepository()
  const user = await userRepo.findById(userId)

  if (!user) {
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
      { requestId: getCorrelationId(request), service: "auth-service" }
    )
  )
})
