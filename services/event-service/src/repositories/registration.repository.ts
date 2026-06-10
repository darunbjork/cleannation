// services/event-service/src/repositories/registration.repository.ts

import type { Registration, RegistrationStatus } from "@prisma/client"
import { prisma } from "../db/prisma"

export class RegistrationRepository {

  async findByEventAndUser(
    eventId: string,
    userId: string
  ): Promise<Registration | null> {
    return prisma.registration.findUnique({
      where: { eventId_userId: { eventId, userId } },
    })
  }

  async findByUser(
    userId: string,
    status?: RegistrationStatus
  ): Promise<Registration[]> {
    return prisma.registration.findMany({
      where: {
        userId,
        ...(status !== undefined ? { status } : {}),
      },
      orderBy: { registeredAt: "desc" },
    })
  }

  async findByEvent(eventId: string): Promise<Registration[]> {
    return prisma.registration.findMany({
      where: { eventId },
      orderBy: { registeredAt: "asc" },
    })
  }

  async create(data: {
    eventId: string
    userId: string
  }): Promise<Registration> {
    return prisma.registration.create({
      data: {
        eventId: data.eventId,
        userId: data.userId,
        status: "REGISTERED",
      },
    })
  }

  async updateStatus(
    id: string,
    status: RegistrationStatus,
    timestamps: {
      checkedInAt?: Date
      checkedOutAt?: Date
    } = {}
  ): Promise<Registration> {
    return prisma.registration.update({
      where: { id },
      data: { status, ...timestamps },
    })
  }

  async countByEvent(eventId: string): Promise<number> {
    return prisma.registration.count({
      where: { eventId, status: { not: "CANCELLED" } },
    })
  }
}
