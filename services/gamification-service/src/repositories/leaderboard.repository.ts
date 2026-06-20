// services/gamification-service/src/repositories/leaderboard.repository.ts
// Redis sorted set operations for leaderboard data.
//
// THIS IS THE PERFORMANCE-CRITICAL LAYER.
// Every method here is O(log n) or O(1) in Redis.
// None of these operations touch PostgreSQL.
//
// SORTED SET DATA MODEL:
// Key: "lb:global:all_time"
// Members: userId strings
// Scores: total points (float — Redis allows decimal scores)
//
// Example Redis state:
// lb:global:all_time:
//   "usr_alice" → 2100.0
//   "usr_bob"   → 1850.5
//   "usr_carol" → 1200.0
//
// ZREVRANK returns position (0 = highest):
//   ZREVRANK lb:global:all_time "usr_alice" → 0  (rank 1)
//   ZREVRANK lb:global:all_time "usr_bob"   → 1  (rank 2)

import { redis } from "../db/redis"
import { createLogger } from "@cleannation/shared-utils"

const logger = createLogger("gamification-service")

export interface LeaderboardEntry {
  rank: number
  userId: string
  totalPoints: number
}

export class LeaderboardRepository {

  // Add or update a user's score in a leaderboard
  // ZINCRBY is atomic — no race condition between concurrent awards
  async incrementScore(
    key: string,
    userId: string,
    deltaPoints: number
  ): Promise<number> {
    // ZINCRBY returns the new score as a string
    const newScore = await redis.zincrby(key, deltaPoints, userId)
    return parseFloat(newScore)
  }

  // Get user's rank in a leaderboard (1-indexed for display)
  // Returns null if user has no score in this leaderboard
  async getRank(
    key: string,
    userId: string
  ): Promise<number | null> {
    // ZREVRANK returns 0-based rank (0 = highest scorer)
    // Returns null if member doesn't exist
    const rank = await redis.zrevrank(key, userId)
    if (rank === null) return null
    return rank + 1  // Convert to 1-indexed
  }

  // Get user's current score
  async getScore(
    key: string,
    userId: string
  ): Promise<number | null> {
    const score = await redis.zscore(key, userId)
    if (score === null) return null
    return parseFloat(score)
  }

  // Get top N entries with scores
  // ZREVRANGE returns members in descending score order
  async getTopN(
    key: string,
    limit: number,
    offset = 0
  ): Promise<LeaderboardEntry[]> {
    // ZREVRANGE with WITHSCORES returns alternating [member, score, member, score...]
    const raw = await redis.zrevrange(
      key,
      offset,
      offset + limit - 1,
      "WITHSCORES"
    )

    const entries: LeaderboardEntry[] = []

    // Parse alternating member/score pairs
    for (let i = 0; i < raw.length; i += 2) {
      const userId = raw[i]
      const scoreStr = raw[i + 1]
      if (userId === undefined || scoreStr === undefined) continue

      entries.push({
        rank: offset + Math.floor(i / 2) + 1,  // 1-indexed
        userId,
        totalPoints: parseFloat(scoreStr),
      })
    }

    return entries
  }

  // Total number of members in the leaderboard
  async getTotalCount(key: string): Promise<number> {
    return redis.zcard(key)
  }

  // Get rank and score for a user across multiple leaderboard keys
  // Used to display rank in multiple scopes simultaneously
  async getMultiScopeRanks(
    keys: string[],
    userId: string
  ): Promise<Record<string, number | null>> {
    if (keys.length === 0) return {}

    // Use Redis pipeline — sends all commands in one round trip
    // Without pipeline: N separate TCP round trips
    // With pipeline: 1 TCP round trip for all N commands
    const pipeline = redis.pipeline()

    for (const key of keys) {
      pipeline.zrevrank(key, userId)
    }

    const results = await pipeline.exec()

    const ranks: Record<string, number | null> = {}

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const result = results?.[i]
      if (key === undefined || result === undefined) continue

      const [err, rank] = result as [Error | null, number | null]
      if (err !== null || rank === null) {
        ranks[key] = null
      } else {
        ranks[key] = rank + 1  // 1-indexed
      }
    }

    return ranks
  }

  // Rebuild a sorted set from PostgreSQL data
  // Called on startup to ensure Redis is consistent with DB
  async rebuildFromData(
    key: string,
    entries: Array<{ userId: string; totalPoints: number }>
  ): Promise<void> {
    if (entries.length === 0) return

    // Delete existing set and rebuild atomically
    // ZADD with multiple members in one command
    const pipeline = redis.pipeline()
    pipeline.del(key)

    // Chunk into groups of 100 to avoid oversized Redis commands
    const chunkSize = 100
    for (let i = 0; i < entries.length; i += chunkSize) {
      const chunk = entries.slice(i, i + chunkSize)
      // zadd arguments: [score1, member1, score2, member2, ...]
      const args: (string | number)[] = []
      for (const entry of chunk) {
        args.push(entry.totalPoints, entry.userId)
      }
      pipeline.zadd(key, ...args)
    }

    await pipeline.exec()

    logger.info(
      { key, count: entries.length },
      "Leaderboard rebuilt from PostgreSQL"
    )
  }
}