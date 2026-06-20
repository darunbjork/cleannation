// services/gamification-service/src/repositories/stats.repository.ts

import type { UserStats, PointsReason } from "../generated/prisma"
import { prisma } from "../db/prisma"

export class StatsRepository {

  async findByUserId(userId: string): Promise<UserStats | null> {
    return prisma.userStats.findUnique({ where: { userId } })
  }

  // Upsert — creates stats row on first point award, updates thereafter
  async upsertStats(
    userId: string,
    updates: {
      totalPoints?: number
      eventsJoined?: number
      eventsCompleted?: number
      currentStreakDays?: number
      longestStreakDays?: number
      lastEventAt?: Date
      kgWasteEstimated?: number
    }
  ): Promise<UserStats> {
    return prisma.userStats.upsert({
      where: { userId },
      create: {
        userId,
        totalPoints: updates.totalPoints ?? 0,
        eventsJoined: updates.eventsJoined ?? 0,
        eventsCompleted: updates.eventsCompleted ?? 0,
        currentStreakDays: updates.currentStreakDays ?? 0,
        longestStreakDays: updates.longestStreakDays ?? 0,
        lastEventAt: updates.lastEventAt ?? null,
        kgWasteEstimated: updates.kgWasteEstimated ?? 0,
      },
      update: {
        ...(updates.totalPoints !== undefined
          ? { totalPoints: { increment: updates.totalPoints } }
          : {}),
        ...(updates.eventsJoined !== undefined
          ? { eventsJoined: { increment: updates.eventsJoined } }
          : {}),
        ...(updates.eventsCompleted !== undefined
          ? { eventsCompleted: { increment: updates.eventsCompleted } }
          : {}),
        ...(updates.currentStreakDays !== undefined
          ? { currentStreakDays: updates.currentStreakDays }
          : {}),
        ...(updates.longestStreakDays !== undefined
          ? { longestStreakDays: updates.longestStreakDays }
          : {}),
        ...(updates.lastEventAt !== undefined
          ? { lastEventAt: updates.lastEventAt }
          : {}),
        ...(updates.kgWasteEstimated !== undefined
          ? { kgWasteEstimated: { increment: updates.kgWasteEstimated } }
          : {}),
        updatedAt: new Date(),
      },
    })
  }

  async addPointsTransaction(data: {
    userId: string
    points: number
    reason: PointsReason
    eventId?: string
    mediaId?: string
    balanceAfter: number
  }) {
    return prisma.pointsTransaction.create({
      data: {
        userId: data.userId,
        points: data.points,
        reason: data.reason,
        eventId: data.eventId ?? null,
        mediaId: data.mediaId ?? null,
        balanceAfter: data.balanceAfter,
      },
    })
  }

  // Used for leaderboard rebuild — get all users sorted by points
  async getAllUserStats(): Promise<Array<{ userId: string; totalPoints: number }>> {
    return prisma.userStats.findMany({
      select: { userId: true, totalPoints: true },
      orderBy: { totalPoints: "desc" },
    })
  }

  async getTopByPoints(
    limit: number,
    offset: number
  ): Promise<UserStats[]> {
    return prisma.userStats.findMany({
      orderBy: { totalPoints: "desc" },
      take: limit,
      skip: offset,
    })
  }
}