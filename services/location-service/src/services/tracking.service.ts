// services/location-service/src/services/tracking.service.ts
// Tracking service — business logic for participant check-ins.
// Coordinates between the WebSocket room manager and the database.
// Called by the WebSocket handler when participants check in/out.

import { createLogger } from "@cleannation/shared-utils"
import { prisma } from "../db/prisma"

const logger = createLogger("location-service")

export class TrackingService {

  // Record a participant check-in to the database
  // Called when a volunteer sends join_room over WebSocket
  async checkIn(
    eventId: string,
    userId: string,
    zoneId: string
  ): Promise<void> {
    await prisma.participantCheckIn.upsert({
      where: { eventId_userId: { eventId, userId } },
      create: {
        eventId,
        userId,
        zoneId,
        checkedInAt: new Date(),
      },
      update: {
        // Re-check-in if they disconnected and reconnected
        checkedInAt: new Date(),
        checkedOutAt: null,
      },
    })

    logger.info({ eventId, userId, zoneId }, "Participant checked in")
  }

  // Record participant checkout
  // Called when volunteer sends leave_room or disconnects
  async checkOut(eventId: string, userId: string): Promise<void> {
    await prisma.participantCheckIn.updateMany({
      where: {
        eventId,
        userId,
        checkedOutAt: null,
      },
      data: { checkedOutAt: new Date() },
    })

    logger.info({ eventId, userId }, "Participant checked out")
  }

  // Update last known GPS position in database
  // Called periodically from position_update WebSocket messages
  // Not every update hits the DB — only every 10th update
  // to reduce write load while keeping audit trail
  async updateLastPosition(
    eventId: string,
    userId: string,
    lat: number,
    lng: number
  ): Promise<void> {
    await prisma.participantCheckIn.updateMany({
      where: { eventId, userId, checkedOutAt: null },
      data: {
        lastLat: lat,
        lastLng: lng,
        lastSeenAt: new Date(),
      },
    })
  }

  // Get all active participants for an event
  async getActiveParticipants(
    eventId: string
  ): Promise<
    Array<{
      userId: string
      checkedInAt: Date
      lastLat: number | null
      lastLng: number | null
      lastSeenAt: Date | null
    }>
  > {
    return prisma.participantCheckIn.findMany({
      where: { eventId, checkedOutAt: null },
      select: {
        userId: true,
        checkedInAt: true,
        lastLat: true,
        lastLng: true,
        lastSeenAt: true,
      },
    })
  }

  // Count active participants currently in an event
  async countActive(eventId: string): Promise<number> {
    return prisma.participantCheckIn.count({
      where: { eventId, checkedOutAt: null },
    })
  }
}