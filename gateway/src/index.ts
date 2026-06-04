import Fastify from "fastify"
import cookie from "@fastify/cookie"
import helmet from "@fastify/helmet"
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
    genReqId: () =>
      `req_${Math.random().toString(36).slice(2, 11)}`,
  })

  await fastify.register(helmet, {
    contentSecurityPolicy: config.nodeEnv === "production",
  })

  await fastify.register(corsPlugin)

  await fastify.register(cookie, {
    secret: process.env["COOKIE_SECRET"] ?? "dev-cookie-secret-change-in-prod",
  })

  await fastify.register(correlationIdMiddleware)
  await fastify.register(requestLoggerMiddleware)
  await fastify.register(rateLimitPlugin)
  await fastify.register(jwtPlugin)
  await fastify.register(errorHandlerPlugin)

  await fastify.register(healthRoutes)
  await fastify.register(proxyRoutes)

  return fastify
}

async function shutdown(
  fastify: Awaited<ReturnType<typeof buildServer>>,
  signal: string
): Promise<void> {
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

buildServer().then((fastify) => {
  process.on("SIGTERM", () => void shutdown(fastify, "SIGTERM"))
  process.on("SIGINT", () => void shutdown(fastify, "SIGINT"))

  fastify.listen({ port: config.port, host: config.host }).then(() => {
    logger.info({ port: config.port, env: config.nodeEnv }, "Gateway started")
  }).catch((error: unknown) => {
    logger.error({ error }, "Failed to start gateway")
    process.exit(1)
  })
}).catch((error: unknown) => {
  console.error("Failed to build server:", error)
  process.exit(1)
})
