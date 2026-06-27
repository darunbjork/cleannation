import { PrismaClient } from "@prisma/client"
import { createLogger } from "@cleannation/shared-utils"

const logger = createLogger("auth-service")

// Bun/Node module cache ensures this runs once per process
const prisma = new PrismaClient({
  log:
    process.env["NODE_ENV"] === "development"
      ? [
          { level: "query", emit: "event" },
          { level: "error", emit: "stdout" },
          { level: "warn", emit: "stdout" },
        ]
      : [{ level: "error", emit: "stdout" }],
})

// Log slow queries in development — catches N+1 issues early
if (process.env["NODE_ENV"] === "development") {
  prisma.$on("query", (e: { query: string; duration: number }) => {
    if (e.duration > 100) {
      logger.warn(
        { query: e.query, durationMs: e.duration },
        "Slow query detected"
      )
    }
  })
}

export { prisma }
