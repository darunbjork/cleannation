// services/gamification-service/src/db/redis.ts
// Redis client — used for sorted set leaderboards and
// WebSocket session tracking.
//
// SORTED SET OPERATIONS USED:
//
// ZADD leaderboard:global NX score userId
//   NX = only add if not exists (first time user appears on leaderboard)
//
// ZINCRBY leaderboard:global deltaPoints userId
//   Atomically increment score — safe for concurrent updates
//   Two simultaneous point awards cannot race — Redis processes them serially
//
// ZREVRANK leaderboard:global userId
//   Get 0-based rank of userId (0 = highest scorer)
//   O(log n) — uses Redis skip list index
//
// ZREVRANGE leaderboard:global 0 9 WITHSCORES
//   Get top 10 with their scores
//   O(log n + 10)
//
// ZCARD leaderboard:global
//   Total member count — O(1)

import Redis from "ioredis"
import { createLogger } from "@cleannation/shared-utils"

const logger = createLogger("gamification-service")

const redis = new Redis(
  process.env["REDIS_URL"] ?? "redis://localhost:6379",
  {
    retryStrategy: (times) => Math.min(times * 100, 3000),
    connectTimeout: 5000,
    maxRetriesPerRequest: 3,
    lazyConnect: true,
  }
)

redis.on("connect", () => logger.info("Redis connected"))
redis.on("error", (e: Error) =>
  logger.error({ error: e.message }, "Redis error")
)

export { redis }