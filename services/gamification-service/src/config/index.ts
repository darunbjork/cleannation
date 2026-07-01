// services/gamification-service/src/config/index.ts

import {
  requireEnv,
  requireEnvInt,
  validateRequiredEnv,
} from "@cleannation/shared-utils"

validateRequiredEnv([
  "GAMIFICATION_DATABASE_URL",
  "REDIS_URL",
  "KAFKA_BROKERS",
])

export const config = {
  port: requireEnvInt("GAMIFICATION_SERVICE_PORT", 3005),
  host: "0.0.0.0",
  nodeEnv: process.env["NODE_ENV"] ?? "development",

  db: { url: requireEnv("GAMIFICATION_DATABASE_URL") },

  redis: {
    url: requireEnv("REDIS_URL"),
    // Redis key TTL for leaderboard caches
    // Sorted sets themselves have no TTL (persistent)
    // But paginated result caches expire after 60s
    cacheResultTtlSec: 60,
  },

  kafka: {
    brokers: requireEnv("KAFKA_BROKERS").split(","),
    clientId: "gamification-service",
    groupId: "gamification-service-group",
    requestTimeout: 30000,
  },

  // Points awarded per action
  // All in one place — tune without touching business logic
  points: {
    eventCompleted: 100,      // base reward
    mediaVerified: 50,        // per verified photo
    streakBonus7Day: 75,      // 7-day consecutive event streak
    streakBonus30Day: 300,    // 30-day streak
    firstEventBonus: 50,      // first-time participant bonus
  },

  // Redis sorted set key patterns
  // Scope-based: global, country, region, city
  leaderboardKeys: {
    global: "lb:global:all_time",
    globalMonthly: () =>
      `lb:global:${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
    country: (code: string) => `lb:country:${code}:all_time`,
    region: (regionId: string) => `lb:region:${regionId}:all_time`,
  },
} as const