// services/event-service/src/config/index.ts

import {
  requireEnv,
  requireEnvInt,
  validateRequiredEnv,
} from "@cleannation/shared-utils"

validateRequiredEnv([
  "EVENT_DATABASE_URL",
  "KAFKA_BROKERS",
])

export const config = {
  port: requireEnvInt("EVENT_SERVICE_PORT", 3002),
  host: "0.0.0.0",
  nodeEnv: process.env["NODE_ENV"] ?? "development",

  db: {
    url: requireEnv("EVENT_DATABASE_URL"),
  },

  kafka: {
    brokers: requireEnv("KAFKA_BROKERS").split(","),
    clientId: "event-service",
    // Producer config — tuned for reliability over throughput
    producer: {
      // Wait for all replicas to acknowledge before considering write successful
      // Prevents data loss if the leader broker fails immediately after write
      acks: -1 as const,
      // Batch messages for 10ms before sending — improves throughput
      // without significantly impacting latency
      lingerMs: 10,
      // Retry up to 5 times with exponential backoff
      retries: 5,
    },
  },

  cors: {
    origin: process.env["CORS_ORIGIN"] ?? "http://localhost:5173",
  },

  // Tier limits — checked before event creation
  // Mirrors TIER_FEATURES from shared-types
  tierLimits: {
    free: { maxEventsPerMonth: 0 },
    organizer: { maxEventsPerMonth: 4 },
    pro_organizer: { maxEventsPerMonth: -1 },
    enterprise: { maxEventsPerMonth: -1 },
    municipality: { maxEventsPerMonth: -1 },
  } as const,
} as const
