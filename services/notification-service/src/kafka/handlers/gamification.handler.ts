// services/notification-service/src/kafka/handlers/gamification.handler.ts
// Handles badge.earned events

import { createLogger } from "@cleannation/shared-utils"
import type { BadgeEarnedPayload } from "@cleannation/shared-types"
import { NotificationService } from "../../services/notification.service"
import { badgeEarnedTemplate } from "../../email/templates"

const logger = createLogger("notification-service")
const notifService = new NotificationService()

export async function handleBadgeEarned(
  kafkaEventId: string,
  kafkaTopic: string,
  payload: BadgeEarnedPayload
): Promise<void> {
  logger.info(
    { userId: payload.userId, badge: payload.badgeCategory, kafkaEventId },
    "Handling badge.earned"
  )

  const template = badgeEarnedTemplate({
    displayName: "Volunteer",
    badgeName: payload.badgeName,
    badgeDescription: `You earned the ${payload.badgeName} badge!`,
    bonusPoints: payload.pointsBonus,
    dashboardUrl: notifService.getAppUrl("/profile"),
  })

  await notifService.sendEmailNotification({
    kafkaEventId,
    kafkaTopic,
    userId: payload.userId,
    type: "BADGE_EARNED",
    recipientEmail: `user_${payload.userId}@placeholder.com`,
    template,
  })

  await notifService.sendPushNotification({
    kafkaEventId,
    kafkaTopic,
    userId: payload.userId,
    type: "BADGE_EARNED",
    payload: {
      title: `🎖️ ${payload.badgeName} unlocked!`,
      body: `+${payload.pointsBonus} bonus points added`,
      url: notifService.getAppUrl("/profile"),
      tag: `badge-${payload.badgeCategory}`,
    },
  })
}