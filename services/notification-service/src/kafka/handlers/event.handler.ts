// services/notification-service/src/kafka/handlers/event.handler.ts
// Handles event.joined, event.cancelled, event.completed events

import { createLogger } from "@cleannation/shared-utils"
import type {
  EventJoinedPayload,
  EventCompletedPayload,
} from "@cleannation/shared-types"
import { NotificationService } from "../../services/notification.service"
import {
  eventConfirmationTemplate,
  eventCancelledTemplate,
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

  // NOTE: In production we would fetch event details from event-service
  // via gRPC to get the full event title, date, city.
  // For this step: use placeholder data — the pattern is complete.
  // gRPC inter-service calls are implemented in Step 9.

  const template = eventConfirmationTemplate({
    displayName: "Volunteer",       // → fetched from auth-service
    eventTitle: "Cleanup Event",    // → fetched from event-service
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

  // Also send push notification
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

  // In production: fetch all participant userIds from event-service
  // and send one notification per participant.
  // For this step: demonstrate the pattern with the organizer.
  const template = eventCompletedTemplate({
    displayName: "Organizer",
    eventTitle: "Cleanup Event",
    pointsEarned: payload.pointsToAward,
    totalPoints: payload.pointsToAward,  // → fetched from gamification-service
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