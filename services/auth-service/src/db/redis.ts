// services/auth-service/src/db/redis.ts
// Redis client for refresh token blocklist.
//
// WHY Redis for the blocklist (not PostgreSQL):
// On every API request that carries a refresh token, we check
// if the token's jti is in the blocklist.
// A Redis GET is ~0.1ms. A PostgreSQL SELECT with index is ~2-5ms.
// At 1000 req/s, that 2-4ms difference = 2-4 extra seconds of
// aggregate latency per second of traffic.
// Redis is the correct tool for this high-frequency boolean lookup.

import Redis from "ioredis"
import { createLogger } from "@cleannation/shared-utils"

const logger = createLogger("auth-service")

const redis = new Redis(process.env["REDIS_URL"] ?? "redis://localhost:6379", {
  // Retry strategy — reconnects automatically on disconnect
  retryStrategy(times: number) {
    const delay = Math.min(times * 100, 3000)
    return delay
  },
  // Fail fast on initial connection — caught in health check
  connectTimeout: 5000,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
})

redis.on("connect", () => {
  logger.info("Redis connected")
})

redis.on("error", (error: Error) => {
  // Log but do not crash — Redis failure degrades gracefully
  // (logout becomes ineffective, not impossible)
  logger.error({ error: error.message }, "Redis connection error")
})

export { redis }
