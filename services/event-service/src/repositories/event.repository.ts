// services/event-service/src/repositories/event.repository.ts

import type {
  CleanupEvent,
  EventStatus,
  EventCategory,
  Prisma,
} from "@prisma/client"
import { prisma } from "../db/prisma"

export class EventRepository {

  async findById(id: string): Promise<CleanupEvent | null> {
    return prisma.cleanupEvent.findFirst({
      where: { id, deletedAt: null },
    })
  }

  async findMany(filters: {
    status?: EventStatus
    category?: EventCategory
    organizerId?: string | undefined
    locationId?: string | undefined
    page: number
    limit: number
  }): Promise<{ events: CleanupEvent[]; total: number }> {
    const where: Prisma.CleanupEventWhereInput = {
      deletedAt: null,
      ...(filters.status !== undefined
        ? { status: filters.status }
        : {}),
      ...(filters.category !== undefined
        ? { category: filters.category }
        : {}),
      ...(filters.organizerId !== undefined
        ? { organizerId: filters.organizerId }
        : {}),
      ...(filters.locationId !== undefined
        ? { locationId: filters.locationId }
        : {}),
    }

    const skip = (filters.page - 1) * filters.limit

    // Run count and data queries in parallel — saves one round trip
    const [events, total] = await Promise.all([
      prisma.cleanupEvent.findMany({
        where,
        orderBy: { scheduledAt: "asc" },
        skip,
        take: filters.limit,
      }),
      prisma.cleanupEvent.count({ where }),
    ])

    return { events, total }
  }

  async create(data: {
    title: string
    description: string
    category: EventCategory
    organizerId: string
    organizationId: string | null
    maxParticipants: number
    scheduledAt: Date
    estimatedDurationMin: number
    locationId: string
    pointsReward: number
  }): Promise<CleanupEvent> {
    return prisma.cleanupEvent.create({ data })
  }

  async update(
    id: string,
    data: Partial<{
      title: string
      description: string
      status: EventStatus
      maxParticipants: number
      scheduledAt: Date
      estimatedDurationMin: number
      pointsReward: number
    }>
  ): Promise<CleanupEvent> {
    return prisma.cleanupEvent.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    })
  }

  // Soft delete — never remove event records
  // Organizers, participants, and grant reports reference them
  async softDelete(id: string): Promise<void> {
    await prisma.cleanupEvent.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        status: "CANCELLED",
        updatedAt: new Date(),
      },
    })
  }

  // Count events created by an organizer in the current month
  // Used for tier limit enforcement
  async countByOrganizerThisMonth(
    organizerId: string
  ): Promise<number> {
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    return prisma.cleanupEvent.count({
      where: {
        organizerId,
        createdAt: { gte: startOfMonth },
        deletedAt: null,
      },
    })
  }

  // Atomically increment participant count
  // Using raw update (not read-then-write) prevents race conditions
  // Two simultaneous joins cannot both read count=49 and both write 50
  async incrementParticipantCount(
    id: string,
    maxParticipants: number
  ): Promise<CleanupEvent | null> {
    try {
      return await prisma.cleanupEvent.update({
        where: {
          id,
          // Optimistic lock: only update if there's still capacity
          // This prevents over-registration at the database level
          currentParticipants: { lt: maxParticipants },
          deletedAt: null,
        },
        data: {
          currentParticipants: { increment: 1 },
          updatedAt: new Date(),
        },
      })
    } catch {
      // Record not found = no capacity available
      return null
    }
  }

  async decrementParticipantCount(id: string): Promise<void> {
    await prisma.cleanupEvent.update({
      where: { id },
      data: {
        currentParticipants: { decrement: 1 },
        updatedAt: new Date(),
      },
    })
  }
}
