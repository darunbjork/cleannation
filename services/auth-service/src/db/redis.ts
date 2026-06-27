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
