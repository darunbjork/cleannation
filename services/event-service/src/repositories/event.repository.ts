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

  async incrementParticipantCount(
    id: string,
    maxParticipants: number
  ): Promise<CleanupEvent | null> {
    try {
      return await prisma.cleanupEvent.update({
        where: {
          id,
          currentParticipants: { lt: maxParticipants },
          deletedAt: null,
        },
        data: {
          currentParticipants: { increment: 1 },
          updatedAt: new Date(),
        },
      })
    } catch {
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