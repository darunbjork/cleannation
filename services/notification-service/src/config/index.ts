// services/notification-service/src/config/index.ts

import {
  requireEnv,
  requireEnvInt,
  validateRequiredEnv,
} from "@cleannation/shared-utils"

validateRequiredEnv([
  "NOTIFICATION_DATABASE_URL",
  "KAFKA_BROKERS",
  "SMTP_HOST",
  "SMTP_USER",
  "SMTP_PASS",
])

export const config = {
  port: requireEnvInt("NOTIFICATION_SERVICE_PORT", 3006),
  host: "0.0.0.0",
  nodeEnv: process.env["NODE_ENV"] ?? "development",

  db: { url: requireEnv("NOTIFICATION_DATABASE_URL") },

  kafka: {
    brokers: requireEnv("KAFKA_BROKERS").split(","),
    clientId: "notification-service",
    groupId: "notification-service-group",
    // Max retries before moving message to DLQ
    maxRetries: 3,
    // Exponential backoff: 1s, 2s, 4s
    retryBaseDelayMs: 1_000,
  },

  smtp: {
    host: requireEnv("SMTP_HOST"),
    port: requireEnvInt("SMTP_PORT", 587),
    user: requireEnv("SMTP_USER"),
    pass: requireEnv("SMTP_PASS"),
    // From address for all platform emails
    fromAddress: process.env["SMTP_FROM"] ?? "noreply@cleannation.app",
    fromName: process.env["SMTP_FROM_NAME"] ?? "CleanNation",
  },

  push: {
    // VAPID keys — generated once, stored in env
    // Generate with: npx web-push generate-vapid-keys
    vapidPublicKey:
      process.env["PUSH_VAPID_PUBLIC"] ?? "",
    vapidPrivateKey:
      process.env["PUSH_VAPID_PRIVATE"] ?? "",
    // Contact email — required by VAPID spec
    vapidSubject:
      process.env["PUSH_VAPID_SUBJECT"] ?? "mailto:push@cleannation.app",
  },
} as const