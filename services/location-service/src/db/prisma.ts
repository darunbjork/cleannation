// services/location-service/src/db/prisma.ts
// Singleton Prisma client for location-service.

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
  log:
    process.env["NODE_ENV"] === "development"
      ? [{ level: "error", emit: "stdout" }]
      : [{ level: "error", emit: "stdout" }],
})

export { prisma }
