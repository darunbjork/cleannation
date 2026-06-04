import {
  requireEnv,
  requireEnvInt,
  validateRequiredEnv,
} from "@cleannation/shared-utils"

validateRequiredEnv([
  "JWT_PUBLIC_KEY",
  "AUTH_SERVICE_URL",
  "EVENT_SERVICE_URL",
  "LOCATION_SERVICE_URL",
  "MEDIA_SERVICE_URL",
  "GAMIFICATION_SERVICE_URL",
  "NOTIFICATION_SERVICE_URL",
  "PAYMENT_SERVICE_URL",
])

export const config = {
  port: requireEnvInt("GATEWAY_PORT", 3000),
  host: "0.0.0.0",
  nodeEnv: process.env["NODE_ENV"] ?? "development",

  jwt: {
    publicKey: requireEnv("JWT_PUBLIC_KEY").replace(/\\n/g, "\n"),
    algorithm: "RS256" as const,
    accessTokenExpiry: "15m",
  },

  cors: {
    origin: process.env["CORS_ORIGIN"] ?? "http://localhost:5173",
    credentials: true,
  },

  services: {
    auth: requireEnv("AUTH_SERVICE_URL"),
    event: requireEnv("EVENT_SERVICE_URL"),
    location: requireEnv("LOCATION_SERVICE_URL"),
    media: requireEnv("MEDIA_SERVICE_URL"),
    gamification: requireEnv("GAMIFICATION_SERVICE_URL"),
    notification: requireEnv("NOTIFICATION_SERVICE_URL"),
    payment: requireEnv("PAYMENT_SERVICE_URL"),
  },

  rateLimits: {
    auth: { max: 5, timeWindow: "1 minute" },
    write: { max: 60, timeWindow: "1 minute" },
    read: { max: 300, timeWindow: "1 minute" },
    mediaUpload: { max: 10, timeWindow: "1 minute" },
    payment: { max: 20, timeWindow: "1 minute" },
  },
} as const

export type Config = typeof config
