// services/media-service/src/config/index.ts

import {
  requireEnv,
  requireEnvInt,
  validateRequiredEnv,
} from "@cleannation/shared-utils"

validateRequiredEnv([
  "MEDIA_DATABASE_URL",
  "R2_ACCOUNT_ID",
  "R2_ACCESS_KEY_ID",
  "R2_SECRET_ACCESS_KEY",
  "R2_BUCKET_NAME",
])

export const config = {
  port: requireEnvInt("MEDIA_SERVICE_PORT", 3004),
  // gRPC runs on a separate port from the HTTP REST API
  // This separation is intentional:
  // - REST port is exposed publicly via the gateway
  // - gRPC port is internal only — not exposed through the gateway
  // - Kubernetes NetworkPolicy restricts gRPC port to cluster-internal traffic
  grpcPort: requireEnvInt("MEDIA_GRPC_PORT", 50051),
  host: "0.0.0.0",
  nodeEnv: process.env["NODE_ENV"] ?? "development",

  db: { url: requireEnv("MEDIA_DATABASE_URL") },

  kafka: {
    brokers: (process.env["KAFKA_BROKERS"] ?? "localhost:19092").split(","),
    clientId: "media-service",
    groupId: "media-service-group",
  },

  r2: {
    accountId: requireEnv("R2_ACCOUNT_ID"),
    accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
    secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
    bucketName: requireEnv("R2_BUCKET_NAME"),
    // R2 S3-compatible endpoint format
    endpoint: `https://${requireEnv("R2_ACCOUNT_ID")}.r2.cloudflarestorage.com`,
    // CDN URL for serving assets publicly
    // Set to a custom domain in production: https://media.cleannation.app
    publicUrl:
      process.env["R2_PUBLIC_URL"] ??
      `https://${process.env["R2_BUCKET_NAME"] ?? "media"}.${process.env["R2_ACCOUNT_ID"] ?? "dev"}.r2.dev`,
  },

  upload: {
    // Presigned URL expiry — client must upload within this window
    presignedUrlExpirySeconds: 300,  // 5 minutes
    // Maximum file size enforced at presigned URL level
    maxFileSizeBytes: 10 * 1024 * 1024,  // 10MB
    // Allowed MIME types — enforced in presigned URL conditions
    allowedMimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
    ] as const,
  },

  verification: {
    // Score threshold to mark as VERIFIED
    // Below this: REJECTED or MANUAL_REVIEW
    verifiedThreshold: 0.7,
    manualReviewThreshold: 0.4,
    // Pipeline version — increment when algorithm changes
    // Allows re-processing old assets when the pipeline improves
    pipelineVersion: "1.0.0",
  },
} as const