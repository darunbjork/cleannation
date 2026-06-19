import { PrismaClient } from "@prisma/client"
import { createLogger } from "@cleannation/shared-utils"

const logger = createLogger("location-service")

const prisma = new PrismaClient({
  log:
    process.env["NODE_ENV"] === "development"
      ? [{ level: "error", emit: "stdout" }]
      : [{ level: "error", emit: "stdout" }],
})

export { prisma }