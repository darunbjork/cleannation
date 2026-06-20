// services/gamification-service/src/services/leaderboard.service.ts

import { createLogger } from "@cleannation/shared-utils"
import { LeaderboardRepository } from "../repositories/leaderboard.repository"
import { StatsRepository } from "../repositories/stats.repository"
import { config } from "../config/index"

const logger = createLogger("gamification-service")
const leaderboardRepo = new LeaderboardRepository()
const statsRepo = new StatsRepository()

export interface LeaderboardPage {
  scope: string
  period: string
  entries: Array<{
    rank: number
    userId: string
    totalPoints: number
  }>
  totalCount: number
  userRank: number | null
}

export class LeaderboardService {

  async getGlobalLeaderboard(params: {
    period: "all_time" | "this_month"
    page: number
    limit: number
    requestingUserId: string | null
  }): Promise<LeaderboardPage> {
    const key =
      params.period === "this_month"
        ? config.leaderboardKeys.globalMonthly()
        : config.leaderboardKeys.global

    const limit = Math.min(params.limit, 100)
    const offset = (params.page - 1) * limit

    const [entries, totalCount, userRank] = await Promise.all([
      leaderboardRepo.getTopN(key, limit, offset),
      leaderboardRepo.getTotalCount(key),
      params.requestingUserId !== null
        ? leaderboardRepo.getRank(key, params.requestingUserId)
        : Promise.resolve(null),
    ])

    return {
      scope: "global",
      period: params.period,
      entries,
      totalCount,
      userRank,
    }
  }

  async getUserRankAcrossScopes(userId: string) {
    const keys = [
      config.leaderboardKeys.global,
      config.leaderboardKeys.globalMonthly(),
    ]

    const ranks = await leaderboardRepo.getMultiScopeRanks(keys, userId)

    return {
      globalRank: ranks[config.leaderboardKeys.global] ?? null,
      monthlyRank:
        ranks[config.leaderboardKeys.globalMonthly()] ?? null,
    }
  }

  // Rebuild Redis sorted sets from PostgreSQL
  // Called on startup and hourly to correct any drift
  async rebuildLeaderboards(): Promise<void> {
    logger.info("Starting leaderboard rebuild from PostgreSQL")

    const allStats = await statsRepo.getAllUserStats()

    if (allStats.length === 0) {
      logger.info("No stats found — leaderboards not rebuilt")
      return
    }

    await leaderboardRepo.rebuildFromData(
      config.leaderboardKeys.global,
      allStats
    )

    logger.info(
      { userCount: allStats.length },
      "Leaderboard rebuild complete"
    )
  }
}