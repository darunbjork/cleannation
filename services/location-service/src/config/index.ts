// services/location-service/src/config/index.ts

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
    // How often the server pings clients to detect dead connections
    // A participant who loses signal should be marked inactive
    pingIntervalMs: 30_000,

    // How long without a pong before we consider the connection dead
    pongTimeoutMs: 10_000,

    // Maximum position updates per second per participant
    // Prevents a buggy client from flooding the room
    maxUpdatesPerSecond: 2,

    // Maximum participants per WebSocket room
    // At 500 participants, broadcasting becomes expensive:
    // 500 senders × 499 recipients = 249,500 messages/update cycle
    // For events > 500 participants, shard into sub-rooms by zone sector
    maxRoomSize: 500,
  },
} as const
