// services/event-service/src/db/prisma.ts
// Singleton Prisma client for event-service.

import { PrismaClient } from "@prisma/client"
import { createLogger } from "@cleannation/shared-utils"

const logger = createLogger("event-service")

const prisma = new PrismaClient({
  log:
    process.env["NODE_ENV"] === "development"
      ? [
          { level: "query", emit: "event" },
          { level: "error", emit: "stdout" },
        ]
      : [{ level: "error", emit: "stdout" }],
})

if (process.env["NODE_ENV"] === "development") { 
  prisma.$on("query", (e: { query: string; duration: number }) => {
    if (e.duration > 100) {
      logger.warn({ query: e.query, durationMs: e.duration }, "Slow query")
    }
  })
}

export { prisma }
