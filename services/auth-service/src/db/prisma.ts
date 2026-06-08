// services/auth-service/src/db/prisma.ts
// Singleton Prisma client.
//
// WHY singleton:
// PrismaClient manages a connection pool internally.
// Creating a new PrismaClient per request = a new connection pool
// per request = connection limit exhaustion under any real load.
// PostgreSQL default max_connections = 100.
// At 100 concurrent requests, each creating a new client = instant 
// connection limit hit = all subsequent requests fail.
//
// One client per process = one pool per process = correct.

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