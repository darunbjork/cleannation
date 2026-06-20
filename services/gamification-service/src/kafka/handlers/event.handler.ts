// services/gamification-service/src/kafka/handlers/event.handler.ts

import { createLogger } from "@cleannation/shared-utils"
import type { EventCompletedPayload } from "@cleannation/shared-types"
import { PointsService } from "../../services/points.service"
import { BadgeService } from "../../services/badge.service"
import { StatsRepository } from "../../repositories/stats.repository"

const logger = createLogger("gamification-service")
const pointsService = new PointsService()
const badgeService = new BadgeService()
const statsRepo = new StatsRepository()

export async function handleEventCompleted(
  payload: EventCompletedPayload
): Promise<void> {
  logger.info(
    { eventId: payload.eventId, organizerId: payload.organizerId },
    "Handling event.completed — awarding points"
  )

  // In production: fetch all participant userIds from event-service
  // For this step: award points to the organizer as a demonstration
  // The pattern is complete — just extend participantIds array
  const participantIds = [payload.organizerId]

  for (const userId of participantIds) {
    const stats = await statsRepo.findByUserId(userId)
    const isFirstEvent =
      stats === null || stats.eventsCompleted === 0

    await pointsService.awardEventCompletion({
      userId,
      eventId: payload.eventId,
      pointsReward: payload.pointsToAward,
      isFirstEvent,
    })

    // Check for newly earned badges after each award
    await badgeService.checkAndAwardBadges(userId)
  }
}