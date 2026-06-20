// services/gamification-service/src/repositories/badge.repository.ts

import type { Badge, UserBadge, BadgeCategory } from "../generated/prisma"
import { prisma } from "../db/prisma"

export class BadgeRepository {

  async findAll(): Promise<Badge[]> {
    return prisma.badge.findMany({
      orderBy: { rarity: "asc" },
    })
  }

  async findById(id: string): Promise<Badge | null> {
    return prisma.badge.findUnique({ where: { id } })
  }

  async findByCategory(
    category: BadgeCategory
  ): Promise<Badge | null> {
    return prisma.badge.findUnique({ where: { category } })
  }

  async getUserBadges(userId: string): Promise<Array<UserBadge & { badge: Badge }>> {
    return prisma.userBadge.findMany({
      where: { userId },
      include: { badge: true },
      orderBy: { earnedAt: "desc" },
    })
  }

  async hasEarnedBadge(
    userId: string,
    badgeId: string
  ): Promise<boolean> {
    const count = await prisma.userBadge.count({
      where: { userId, badgeId },
    })
    return count > 0
  }

  // Award a badge — idempotent due to @@unique constraint
  // Returns null if already awarded (not an error)
  async awardBadge(
    userId: string,
    badgeId: string
  ): Promise<UserBadge | null> {
    try {
      return await prisma.userBadge.create({
        data: { userId, badgeId },
      })
    } catch {
      // Unique constraint violation — already has this badge
      return null
    }
  }

  // Seed the badge catalog — called on service startup
  // Idempotent — uses upsert so it is safe to run multiple times
  async seedBadges(): Promise<void> {
    const badges: Array<{
      category: BadgeCategory
      name: string
      description: string
      iconUrl: string
      pointsBonus: number
      rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY"
    }> = [
      {
        category: "FIRST_CLEANUP" as BadgeCategory,
        name: "First Step",
        description: "Completed your first cleanup event",
        iconUrl: "/badges/first-cleanup.svg",
        pointsBonus: 50,
        rarity: "COMMON",
      },
      {
        category: "EVENTS_10" as BadgeCategory,
        name: "Dedicated Cleaner",
        description: "Completed 10 cleanup events",
        iconUrl: "/badges/events-10.svg",
        pointsBonus: 100,
        rarity: "COMMON",
      },
      {
        category: "EVENTS_50" as BadgeCategory,
        name: "Cleanup Champion",
        description: "Completed 50 cleanup events",
        iconUrl: "/badges/events-50.svg",
        pointsBonus: 300,
        rarity: "RARE",
      },
      {
        category: "EVENTS_100" as BadgeCategory,
        name: "Legend",
        description: "Completed 100 cleanup events",
        iconUrl: "/badges/events-100.svg",
        pointsBonus: 1000,
        rarity: "LEGENDARY",
      },
      {
        category: "STREAK_7DAY" as BadgeCategory,
        name: "On a Roll",
        description: "7-day consecutive event streak",
        iconUrl: "/badges/streak-7.svg",
        pointsBonus: 75,
        rarity: "COMMON",
      },
      {
        category: "STREAK_30DAY" as BadgeCategory,
        name: "Unstoppable",
        description: "30-day consecutive event streak",
        iconUrl: "/badges/streak-30.svg",
        pointsBonus: 300,
        rarity: "EPIC",
      },
    ]

    for (const badge of badges) {
      await prisma.badge.upsert({
        where: { category: badge.category },
        create: badge,
        update: {
          name: badge.name,
          description: badge.description,
          pointsBonus: badge.pointsBonus,
        },
      })
    }
  }
}