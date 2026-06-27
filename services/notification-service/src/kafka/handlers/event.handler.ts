import { createLogger } from "@cleannation/shared-utils"
import type {
  EventJoinedPayload,
  EventCompletedPayload,
} from "@cleannation/shared-types"
import { NotificationService } from "../../services/notification.service"
import {
  eventConfirmationTemplate,
  eventCompletedTemplate,
} from "../../email/templates"

const logger = createLogger("notification-service")
const notifService = new NotificationService()

export async function handleEventJoined(
  kafkaEventId: string,
  kafkaTopic: string,
  payload: EventJoinedPayload
): Promise<void> {
  logger.info(
    { userId: payload.userId, eventId: payload.eventId, kafkaEventId },
    "Handling event.joined"
  )

  const template = eventConfirmationTemplate({
    displayName: "Volunteer",      
    eventTitle: "Cleanup Event",   
    eventDate: new Date(payload.registeredAt).toLocaleDateString("en-SE"),
    eventCity: "Your City",
    pointsReward: 100,
    eventUrl: notifService.getAppUrl(`/events/${payload.eventId}`),
  })

  await notifService.sendEmailNotification({
    kafkaEventId,
    kafkaTopic,
    userId: payload.userId,
    type: "EVENT_CONFIRMATION",
    recipientEmail: `user_${payload.userId}@placeholder.com`,
    template,
  })

  await notifService.sendPushNotification({
    kafkaEventId,
    kafkaTopic,
    userId: payload.userId,
    type: "EVENT_CONFIRMATION",
    payload: {
      title: "You're registered! ✅",
      body: "Your spot is confirmed. We'll remind you 24h before.",
      url: notifService.getAppUrl(`/events/${payload.eventId}`),
      tag: `event-join-${payload.eventId}`,
    },
  })
}

export async function handleEventCompleted(
  kafkaEventId: string,
  kafkaTopic: string,
  payload: EventCompletedPayload
): Promise<void> {
  logger.info(
    { eventId: payload.eventId, kafkaEventId },
    "Handling event.completed"
  )

  const template = eventCompletedTemplate({
    displayName: "Organizer",
    eventTitle: "Cleanup Event",
    pointsEarned: payload.pointsToAward,
    totalPoints: payload.pointsToAward,  
    dashboardUrl: notifService.getAppUrl("/dashboard"),
  })

  await notifService.sendEmailNotification({
    kafkaEventId,
    kafkaTopic,
    userId: payload.organizerId,
    type: "EVENT_COMPLETED",
    recipientEmail: `organizer_${payload.organizerId}@placeholder.com`,
    template,
  })
}