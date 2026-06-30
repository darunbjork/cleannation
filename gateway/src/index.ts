import Fastify, { type FastifyPluginCallback } from "fastify"
import cookie, { type FastifyCookieOptions } from "@fastify/cookie"
import helmet, { type FastifyHelmetOptions } from "@fastify/helmet"
import { createLogger } from "@cleannation/shared-utils"
import { config } from "./config/index"

import jwtPlugin from "./plugins/jwt"
import rateLimitPlugin from "./plugins/rateLimit"
import corsPlugin from "./plugins/cors"
import errorHandlerPlugin from "./plugins/errorHandler"

import correlationIdMiddleware from "./middleware/correlationId"
import requestLoggerMiddleware from "./middleware/requestLogger"

import healthRoutes from "./routes/health"
import proxyRoutes from "./routes/proxy"

const logger = createLogger("gateway")

async function buildServer() {
  const fastify = Fastify({
    logger: {
      level: process.env["LOG_LEVEL"] ?? "info",
      ...(config.nodeEnv === "development"
        ? {
            transport: {
              target: "pino-pretty",
              options: {
                colorize: true,
                translateTime: "HH:MM:ss",
                ignore: "pid,hostname",
                messageFormat: "[gateway] {msg}",
              },
            },
          }
        : {}),
    },
    genReqId: () => `req_${Math.random().toString(36).slice(2, 11)}`,
  })

  // ── Register custom content-type parser to allow empty JSON bodies ──
  // The _req parameter is intentionally unused; prefix with underscore.
  fastify.addContentTypeParser("application/json", { parseAs: "string" }, (_req, body, done) => {
    // body can be Buffer or string; convert to string safely
    const bodyStr = typeof body === "string" ? body : body.toString("utf-8")
    if (bodyStr.trim() === "") {
      done(null, undefined)
      return
    }
    try {
      const json = JSON.parse(bodyStr)
      done(null, json)
    } catch (err: any) {
      err.statusCode = 400
      done(err)
    }
  })

  // ── Plugins ─────────────────────────────────────────────────────────
  await fastify.register(helmet as unknown as FastifyPluginCallback<FastifyHelmetOptions>, {
    contentSecurityPolicy: config.nodeEnv === "production",
  })

  await fastify.register(corsPlugin as unknown as FastifyPluginCallback)

  await fastify.register(cookie as unknown as FastifyPluginCallback<FastifyCookieOptions>, {
    secret: process.env["COOKIE_SECRET"] ?? "dev-cookie-secret-change-in-prod",
  })

  await fastify.register(correlationIdMiddleware)
  await fastify.register(requestLoggerMiddleware)

  await fastify.register(rateLimitPlugin as unknown as FastifyPluginCallback)
  await fastify.register(jwtPlugin as unknown as FastifyPluginCallback)

  await fastify.register(errorHandlerPlugin)

  await fastify.register(healthRoutes)
  await fastify.register(proxyRoutes)

  return fastify
}

async function start(): Promise<void> {
  const fastify = await buildServer()

  try {
    await fastify.listen({ port: config.port, host: config.host })
    logger.info({ port: config.port, env: config.nodeEnv }, "Gateway started")
  } catch (error: unknown) {
    logger.error({ error }, "Failed to start gateway")
    process.exit(1)
  }

  const shutdown = async (signal: string): Promise<void> => {
    logger.info({ signal }, "Shutdown signal received")
    try {
      await fastify.close()
      logger.info("Gateway shutdown complete")
      process.exit(0)
    } catch (error: unknown) {
      logger.error({ error }, "Error during shutdown")
      process.exit(1)
    }
  }

  process.on("SIGTERM", () => void shutdown("SIGTERM"))
  process.on("SIGINT", () => void shutdown("SIGINT"))
}

start().catch((error: unknown) => {
  console.error("Failed to start gateway:", error)
  process.exit(1)
})