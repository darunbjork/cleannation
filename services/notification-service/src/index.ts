// services/notification-service/src/index.ts
// notification-service entry point.
//
// NOTE: This service is primarily a Kafka consumer.
// The HTTP server exists ONLY for health checks.
// No business logic is exposed via HTTP.
// All notification triggers come from Kafka events.

import Fastify from "fastify"
import { createLogger } from "@cleannation/shared-utils"
import { config } from "./config/index"
import { prisma } from "./db/prisma"
import { startConsumer, stopConsumer } from "./kafka/consumer"
import {
  connectDlqProducer,
  disconnectDlqProducer,
} from "./kafka/dlq.producer"
import healthRoutes from "./routes/health.routes"

const logger = createLogger("notification-service")

async function buildServer() {
  const fastify = Fastify({ logger: false })

  fastify.addHook("onRequest", async (request) => {
    ;(request as unknown as { startTime: number }).startTime = Date.now()
  })

  fastify.addHook("onResponse", async (request, reply) => {
    const startTime = (request as unknown as { startTime?: number }).startTime
    logger.info({
      method: request.method,
      path: request.url,
      statusCode: reply.statusCode,
      durationMs: startTime !== undefined ? Date.now() - startTime : -1,
    }, "HTTP request")
  })

  await fastify.register(healthRoutes)

  return fastify
}

async function start(): Promise<void> {
  // Connect DLQ producer before starting consumer
  // If DLQ is unavailable, we still start — failed messages are logged
  await connectDlqProducer()

  // Start Kafka consumer
  await startConsumer()

  // Start minimal HTTP server for health checks
  const fastify = await buildServer()
  await fastify.listen({ port: config.port, host: config.host })

  logger.info(
    { port: config.port },
    "notification-service started"
  )

  const shutdown = async (signal: string): Promise<void> => {
    logger.info({ signal }, "Shutdown signal received")

    // Stop consumer first — finish processing current messages
    await stopConsumer()
    await fastify.close()
    await disconnectDlqProducer()
    await prisma.$disconnect()

    logger.info("notification-service shutdown complete")
    process.exit(0)
  }

  process.on("SIGTERM", () => void shutdown("SIGTERM"))
  process.on("SIGINT", () => void shutdown("SIGINT"))
}

start().catch((error: unknown) => {
  logger.error({ error }, "Failed to start notification-service")
  process.exit(1)
})