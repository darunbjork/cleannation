import { createLogger } from "@cleannation/shared-utils"
import { StatsRepository } from "../repositories/stats.repository"
import { LeaderboardRepository } from "../repositories/leaderboard.repository"
import { config } from "../config/index"
import { notifyUser } from "../websocket/notifier"

const logger = createLogger("gamification-service")
const statsRepo = new StatsRepository()
const leaderboardRepo = new LeaderboardRepository()

export interface AwardPointsResult {
  userId: string
  pointsAwarded: number
  newTotal: number
  globalRank: number | null
}

export class PointsService {

  async awardEventCompletion(params: {
    userId: string
    eventId: string
    pointsReward: number
    isFirstEvent: boolean
  }): Promise<AwardPointsResult> {
    let totalPoints = params.pointsReward

    // Bonus for first event
    if (params.isFirstEvent) {
      totalPoints += config.points.firstEventBonus
      logger.info(
        { userId: params.userId },
        "First event bonus applied"
      )
    }

    return this.awardPoints({
      userId: params.userId,
      points: totalPoints,
      reason: "EVENT_COMPLETED",
      eventId: params.eventId,
      updates: {
        eventsCompleted: 1,
        lastEventAt: new Date(),
      },
    })
  }

  async awardMediaVerification(params: {
    userId: string
    mediaId: string
    eventId: string
  }): Promise<AwardPointsResult> {
    return this.awardPoints({
      userId: params.userId,
      points: config.points.mediaVerified,
      reason: "MEDIA_VERIFIED",
      eventId: params.eventId,
      mediaId: params.mediaId,
    })
  }

  // Core award function — all point awards flow through here
  private async awardPoints(params: {
    userId: string
    points: number
    reason: "EVENT_COMPLETED" | "MEDIA_VERIFIED" | "BADGE_BONUS" |
            "STREAK_BONUS" | "REFERRAL_BONUS" | "ADMIN_ADJUSTMENT"
    eventId?: string
    mediaId?: string
    updates?: {
      eventsCompleted?: number
      eventsJoined?: number
      lastEventAt?: Date
    }
  }): Promise<AwardPointsResult> {
    // ── STEP 1: PostgreSQL (durable) ─────────────────────────────────
    const stats = await statsRepo.upsertStats(params.userId, {
      totalPoints: params.points,
      ...params.updates,
    })

    // Build transaction data with only defined optional fields
    const transactionData: {
      userId: string
      points: number
      reason: any
      balanceAfter: number
      eventId?: string
      mediaId?: string
    } = {
      userId: params.userId,
      points: params.points,
      reason: params.reason,
      balanceAfter: stats.totalPoints,
    }

    if (params.eventId !== undefined) {
      transactionData.eventId = params.eventId
    }
    if (params.mediaId !== undefined) {
      transactionData.mediaId = params.mediaId
    }

    await statsRepo.addPointsTransaction(transactionData)

    // ── STEP 2: Redis sorted sets (fast leaderboard layer) ───────────
    let globalRank: number | null = null

    try {
      // Update global leaderboard
      await leaderboardRepo.incrementScore(
        config.leaderboardKeys.global,
        params.userId,
        params.points
      )

      // Update monthly leaderboard
      await leaderboardRepo.incrementScore(
        config.leaderboardKeys.globalMonthly(),
        params.userId,
        params.points
      )

      // Get new global rank after update
      globalRank = await leaderboardRepo.getRank(
        config.leaderboardKeys.global,
        params.userId
      )
    } catch (redisError: unknown) {
      // Redis failure is non-fatal — leaderboard will correct on rebuild
      logger.error(
        {
          userId: params.userId,
          error:
            redisError instanceof Error
              ? redisError.message
              : "unknown",
        },
        "Redis leaderboard update failed — will correct on next rebuild"
      )
    }

    // ── STEP 3: WebSocket push (live update) ─────────────────────────
    // Non-blocking — do not await, failure is silent
    // User's session may not be active — that is normal
    notifyUser(params.userId, {
      type: "points_awarded",
      payload: {
        userId: params.userId,
        points: params.points,
        reason: params.reason,
        newTotal: stats.totalPoints,
        globalRank,
      },
    })

    logger.info(
      {
        userId: params.userId,
        points: params.points,
        reason: params.reason,
        newTotal: stats.totalPoints,
        globalRank,
      },
      "Points awarded"
    )

    return {
      userId: params.userId,
      pointsAwarded: params.points,
      newTotal: stats.totalPoints,
      globalRank,
    }
  }
}