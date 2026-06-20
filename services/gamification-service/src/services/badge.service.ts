import { createLogger } from "@cleannation/shared-utils"
import { StatsRepository } from "../repositories/stats.repository"
import { BadgeRepository } from "../repositories/badge.repository"
import { notifyUser } from "../websocket/notifier"

const logger = createLogger("gamification-service")
const statsRepo = new StatsRepository()
const badgeRepo = new BadgeRepository()

export class BadgeService {

  // Check all badges for a user and award any newly earned ones
  // Called after every point award
  async checkAndAwardBadges(
    userId: string
  ): Promise<string[]> {
    const stats = await statsRepo.findByUserId(userId)
    if (stats === null) return []

    const awarded: string[] = []

    // Check each badge eligibility
    const checks: Array<{
      category: "FIRST_CLEANUP" | "EVENTS_10" | "EVENTS_50" |
                "EVENTS_100" | "STREAK_7DAY" | "STREAK_30DAY"
      eligible: boolean
    }> = [
      {
        category: "FIRST_CLEANUP",
        eligible: stats.eventsCompleted >= 1,
      },
      {
        category: "EVENTS_10",
        eligible: stats.eventsCompleted >= 10,
      },
      {
        category: "EVENTS_50",
        eligible: stats.eventsCompleted >= 50,
      },
      {
        category: "EVENTS_100",
        eligible: stats.eventsCompleted >= 100,
      },
      {
        category: "STREAK_7DAY",
        eligible: stats.currentStreakDays >= 7,
      },
      {
        category: "STREAK_30DAY",
        eligible: stats.currentStreakDays >= 30,
      },
    ]

    for (const check of checks) {
      if (!check.eligible) continue

      const badge = await badgeRepo.findByCategory(check.category)
      if (badge === null) continue

      // awardBadge is idempotent — returns null if already has badge
      const userBadge = await badgeRepo.awardBadge(userId, badge.id)

      if (userBadge !== null) {
        awarded.push(badge.id)

        logger.info(
          { userId, badgeCategory: check.category, bonus: badge.pointsBonus },
          "Badge awarded"
        )

        // Push WebSocket notification
        notifyUser(userId, {
          type: "badge_earned",
          payload: {
            userId,
            badgeName: badge.name,
            badgeCategory: check.category,
            pointsBonus: badge.pointsBonus,
          },
        })
      }
    }

    return awarded
  }
}