// services/notification-service/src/db/prisma.ts

import { PrismaClient } from "../generated/prisma"

const prisma = new PrismaClient({
  log:
    process.env["NODE_ENV"] === "development"
      ? [{ level: "error", emit: "stdout" }]
      : [{ level: "error", emit: "stdout" }],
})

export { prisma }