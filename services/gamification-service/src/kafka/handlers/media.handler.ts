// services/gamification-service/src/kafka/handlers/media.handler.ts

import { createLogger } from "@cleannation/shared-utils"
import type { MediaVerifiedPayload } from "@cleannation/shared-types"
import { PointsService } from "../../services/points.service"
import { BadgeService } from "../../services/badge.service"

const logger = createLogger("gamification-service")
const pointsService = new PointsService()
const badgeService = new BadgeService()

export async function handleMediaVerified(
  payload: MediaVerifiedPayload
): Promise<void> {
  logger.info(
    { mediaId: payload.mediaId, userId: payload.userId },
    "Handling media.verified — awarding points"
  )

  await pointsService.awardMediaVerification({
    userId: payload.userId,
    mediaId: payload.mediaId,
    eventId: payload.eventId,
  })

  await badgeService.checkAndAwardBadges(payload.userId)
}