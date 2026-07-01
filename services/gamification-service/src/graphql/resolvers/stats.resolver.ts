import type { GraphQLContext } from "../context"
import { StatsRepository } from "../../repositories/stats.repository"
import { BadgeRepository } from "../../repositories/badge.repository"
import { LeaderboardService } from "../../services/leaderboard.service"
import { createLogger } from "@cleannation/shared-utils"

const logger = createLogger("gamification-service")
const statsRepo = new StatsRepository()
const badgeRepo = new BadgeRepository()
const leaderboardService = new LeaderboardService()

export const statsResolvers = {
  Query: {
    // Returns stats for the currently authenticated user
    myStats: async (
      _: unknown,
      __: unknown,
      context: GraphQLContext
    ) => {
      if (context.userId === null) return null

      logger.info(
        { userId: context.userId, correlationId: context.correlationId },
        "GraphQL: myStats query"
      )

      const stats = await statsRepo.findByUserId(context.userId)

      if (stats === null) {
        // New user — no stats yet — return zeroed object
        return {
          userId: context.userId,
          totalPoints: 0,
          eventsJoined: 0,
          eventsCompleted: 0,
          currentStreakDays: 0,
          longestStreakDays: 0,
          globalRank: null,
          monthlyRank: null,
          badges: [],
        }
      }

      // Get rank from Redis sorted sets (O(log n) — fast)
      const ranks = await leaderboardService.getUserRankAcrossScopes(
        context.userId
      )

      return {
        userId: stats.userId,
        totalPoints: stats.totalPoints,
        eventsJoined: stats.eventsJoined,
        eventsCompleted: stats.eventsCompleted,
        currentStreakDays: stats.currentStreakDays,
        longestStreakDays: stats.longestStreakDays,
        globalRank: ranks.globalRank,
        monthlyRank: ranks.monthlyRank,
      }
    },

    // Returns all available badges in the catalog
    badges: async () => {
      return badgeRepo.findAll()
    },

    // Returns badges earned by a specific user
    userBadges: async (
      _: unknown,
      args: { userId: string }
    ) => {
      return badgeRepo.getUserBadges(args.userId)
    },
  },

  // Field resolver for UserStats.badges
  // Called when a GraphQL query includes badges on myStats
  UserStats: {
    badges: async (parent: { userId: string }) => {
      return badgeRepo.getUserBadges(parent.userId)
    },
  },
}