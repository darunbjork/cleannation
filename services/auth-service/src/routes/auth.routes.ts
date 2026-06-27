import type { FastifyInstance, RouteHandlerMethod } from "fastify"
import * as authController from "../controllers/auth.controller"

export default async function authRoutes(
  fastify: FastifyInstance
): Promise<void> {

  // POST /auth/register
  fastify.post("/auth/register", {
    schema: {
      body: {
        type: "object",
        required: ["email", "username", "password", "displayName"],
        additionalProperties: false,
        properties: {
          email: {
            type: "string",
            format: "email",
            maxLength: 254,
          },
          username: {
            type: "string",
            minLength: 3,
            maxLength: 30,
            // Alphanumeric + underscores only — prevents injection
            pattern: "^[a-zA-Z0-9_]+$",
          },
          password: {
            type: "string",
            minLength: 8,
            maxLength: 128,
          },
          displayName: {
            type: "string",
            minLength: 1,
            maxLength: 50,
          },
        },
      },
    },
    config: {
      // Stricter rate limit — registration abuse creates fake accounts
      rateLimit: { max: 3, timeWindow: "1 minute" },
    },
  }, authController.register as unknown as RouteHandlerMethod)

  // POST /auth/login
  fastify.post("/auth/login", {
    schema: {
      body: {
        type: "object",
        required: ["email", "password"],
        additionalProperties: false,
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 1, maxLength: 128 },
        },
      },
    },
    config: {
      rateLimit: { max: 5, timeWindow: "1 minute" },
    },
  }, authController.login as unknown as RouteHandlerMethod)

  // POST /auth/refresh — reads from HttpOnly cookie, no body
  fastify.post("/auth/refresh", {
    schema: {
      body: { type: "object", properties: {} },
    },
    config: {
      rateLimit: { max: 20, timeWindow: "1 minute" },
    },
  }, authController.refresh as unknown as RouteHandlerMethod)

  // POST /auth/logout
  fastify.post("/auth/logout", {
    config: {
      rateLimit: { max: 20, timeWindow: "1 minute" },
    },
  }, authController.logout as unknown as RouteHandlerMethod)

  // GET /auth/me — protected by gateway (x-user-id header injected)
  fastify.get("/auth/me", authController.getMe as unknown as RouteHandlerMethod)
}
