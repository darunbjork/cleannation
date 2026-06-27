import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
  log:
    process.env["NODE_ENV"] === "development"
      ? [{ level: "error", emit: "stdout" }]
      : [{ level: "error", emit: "stdout" }],
})

export { prisma }