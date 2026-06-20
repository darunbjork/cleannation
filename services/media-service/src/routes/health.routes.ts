// services/media-service/src/routes/health.routes.ts

import type { FastifyInstance } from "fastify"
import { ServiceHealthChecker, createLogger } from "@cleannation/shared-utils"
import { prisma } from "../db/prisma"
import * as aws from "@aws-sdk/client-s3"
import { config } from "../config/index"

const logger = createLogger("media-service")
const healthChecker = new ServiceHealthChecker("media-service", logger)

const s3 = new aws.S3Client({
  region: "auto",
  endpoint: config.r2.endpoint,
  credentials: {
    accessKeyId: config.r2.accessKeyId,
    secretAccessKey: config.r2.secretAccessKey,
  },
})

healthChecker.register("postgres", async () => {
  await prisma.$queryRaw`SELECT 1`
})

healthChecker.register("r2-storage", async () => {
  // HeadBucket: verifies bucket exists and credentials are valid
  // Does not download any data — extremely lightweight
  await (s3 as any).send(new aws.HeadBucketCommand({ Bucket: config.r2.bucketName }))
})

export default async function healthRoutes(
  fastify: FastifyInstance
): Promise<void> {
  fastify.get("/health/live", async (_req, reply) =>
    reply.status(200).send(healthChecker.liveness())
  )
  fastify.get("/health/ready", async (_req, reply) => {
    const result = await healthChecker.readiness()
    return reply.status(result.status === "ok" ? 200 : 503).send(result)
  })
}