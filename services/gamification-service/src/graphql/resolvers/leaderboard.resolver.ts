// services/gamification-service/src/graphql/resolvers/leaderboard.resolver.ts

import type { GraphQLContext } from "../context"
import { LeaderboardService } from "../../services/leaderboard.service"
import { StatsRepository } from "../../repositories/stats.repository"
import { BadgeRepository } from "../../repositories/badge.repository"

const leaderboardService = new LeaderboardService()
const statsRepo = new StatsRepository()
const badgeRepo = new BadgeRepository()

export const leaderboardResolvers = {
  Query: {
    leaderboard: async (
      _: unknown,
      args: {
        period?: "ALL_TIME" | "THIS_MONTH"
        page?: number
        limit?: number
      },
      context: GraphQLContext
    ) => {
      const page = args.page ?? 1
      const limit = Math.min(args.limit ?? 20, 100)
      const period =
        args.period === "THIS_MONTH" ? "this_month" : "all_time"

      const result = await leaderboardService.getGlobalLeaderboard({
        period,
        page,
        limit,
        requestingUserId: context.userId,
      })

      const pages = Math.ceil(result.totalCount / limit)

      return {
        ...result,
        pagination: {
          page,
          limit,
          total: result.totalCount,
          hasNext: page < pages,
          hasPrev: page > 1,
        },
      }
    },

    myStats: async (
      _: unknown,
      __: unknown,
      context: GraphQLContext
    ) => {
      if (context.userId === null) return null

      const stats = await statsRepo.findByUserId(context.userId)
      if (stats === null) return null

      const ranks = await leaderboardService.getUserRankAcrossScopes(
        context.userId
      )

      return {
        ...stats,
        globalRank: ranks.globalRank,
        monthlyRank: ranks.monthlyRank,
      }
    },

    badges: async () => {
      return badgeRepo.findAll()
    },

    userBadges: async (
      _: unknown,
      args: { userId: string }
    ) => {
      return badgeRepo.getUserBadges(args.userId)
    },
  },

  // Field resolver — UserStats.badges
  UserStats: {
    badges: async (parent: { userId: string }) => {
      return badgeRepo.getUserBadges(parent.userId)
    },
  },
}