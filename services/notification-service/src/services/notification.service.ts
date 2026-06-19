import { createLogger } from "@cleannation/shared-utils"
import { sendEmail } from "../email/sender"
import { sendPush } from "../push/sender"
import { NotificationRepository } from "../repositories/notification.repository"
import type { EmailTemplate } from "../email/templates"
import type { PushPayload } from "../push/sender"
import type { NotificationType } from "../generated/prisma"
const logger = createLogger("notification-service")
const notifRepo = new NotificationRepository()

const APP_BASE_URL =
  process.env["APP_BASE_URL"] ?? "http://localhost:5173"

export class NotificationService {

  // Send an email notification with full audit logging
  async sendEmailNotification(params: {
    kafkaEventId: string
    kafkaTopic: string
    userId: string
    type: NotificationType
    recipientEmail: string
    template: EmailTemplate
  }): Promise<void> {
    // Create the audit log record first (status: PENDING)
    const log = await notifRepo.createLog({
      kafkaEventId: params.kafkaEventId,
      kafkaTopic: params.kafkaTopic,
      userId: params.userId,
      type: params.type,
      channel: "EMAIL",
      recipient: params.recipientEmail,
      subject: params.template.subject,
      bodyPreview: params.template.text,
    })

    const result = await sendEmail(params.recipientEmail, params.template)

    if (result.success) {
      await notifRepo.markSent(log.id)
    } else {
      await notifRepo.markFailed(
        log.id,
        result.error ?? "Unknown error",
        1
      )
      // Re-throw so the Kafka handler can retry/DLQ
      throw new Error(`Email send failed: ${result.error ?? "unknown"}`)
    }
  }

  // Send a push notification with subscription management
  async sendPushNotification(params: {
    kafkaEventId: string
    kafkaTopic: string
    userId: string
    type: NotificationType
    payload: PushPayload
  }): Promise<void> {
    const subscription = await notifRepo.findPushSubscription(
      params.userId
    )

    // No push subscription — user hasn't granted permission
    // This is normal — skip silently
    if (subscription === null) {
      logger.info(
        { userId: params.userId },
        "No push subscription — push skipped"
      )
      return
    }

    const log = await notifRepo.createLog({
      kafkaEventId: `${params.kafkaEventId}:push`,
      kafkaTopic: params.kafkaTopic,
      userId: params.userId,
      type: params.type,
      channel: "PUSH",
      recipient: subscription.endpoint.slice(0, 100),
      subject: params.payload.title,
      bodyPreview: params.payload.body,
    })

    const result = await sendPush(
      {
        endpoint: subscription.endpoint,
        p256dhKey: subscription.p256dhKey,
        authKey: subscription.authKey,
      },
      params.payload
    )

    if (result.success) {
      await notifRepo.markSent(log.id)
    } else {
      await notifRepo.markFailed(log.id, result.error ?? "unknown", 1)

      // 410 Gone: subscription expired — delete it
      // Do NOT retry — retrying a 410 violates Web Push protocol
      if (result.subscriptionExpired === true) {
        await notifRepo.deletePushSubscription(params.userId)
        logger.info(
          { userId: params.userId },
          "Push subscription deleted (410 Gone)"
        )
        return  // Do not throw — this is expected, not an error
      }

      throw new Error(`Push send failed: ${result.error ?? "unknown"}`)
    }
  }

  getAppUrl(path: string): string {
    return `${APP_BASE_URL}${path}`
  }
}