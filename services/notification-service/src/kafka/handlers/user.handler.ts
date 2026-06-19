// services/notification-service/src/kafka/handlers/user.handler.ts
// Handles user.registered events → welcome email

import { createLogger } from "@cleannation/shared-utils"
import type { UserRegisteredPayload } from "@cleannation/shared-types"
import { NotificationService } from "../../services/notification.service"
import { welcomeTemplate } from "../../email/templates"

const logger = createLogger("notification-service")
const notifService = new NotificationService()

export async function handleUserRegistered(
  kafkaEventId: string,
  kafkaTopic: string,
  payload: UserRegisteredPayload
): Promise<void> {
  logger.info(
    { userId: payload.userId, kafkaEventId },
    "Handling user.registered"
  )

  const template = welcomeTemplate({
    displayName: payload.username,
    loginUrl: notifService.getAppUrl("/events"),
  })

  await notifService.sendEmailNotification({
    kafkaEventId,
    kafkaTopic,
    userId: payload.userId,
    type: "WELCOME",
    recipientEmail: payload.email,
    template,
  })
}