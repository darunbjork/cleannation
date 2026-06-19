import {
  requireEnv,
  requireEnvInt,
  validateRequiredEnv,
} from "@cleannation/shared-utils"

validateRequiredEnv([
  "LOCATION_DATABASE_URL",
  "KAFKA_BROKERS",
])

export const config = {
  port: requireEnvInt("LOCATION_SERVICE_PORT", 3003),
  host: "0.0.0.0",
  nodeEnv: process.env["NODE_ENV"] ?? "development",

  db: { url: requireEnv("LOCATION_DATABASE_URL") },

  kafka: {
    brokers: requireEnv("KAFKA_BROKERS").split(","),
    clientId: "location-service",
    groupId: "location-service-group",
  },

  cors: {
    origin: process.env["CORS_ORIGIN"] ?? "http://localhost:5173",
  },

  websocket: {
    pingIntervalMs: 30_000,
    pongTimeoutMs: 10_000,
    maxUpdatesPerSecond: 2,
    maxRoomSize: 500,
  },
} as const
