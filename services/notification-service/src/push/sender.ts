import webPush from "web-push"
import { createLogger } from "@cleannation/shared-utils"
import { config } from "../config/index"

const logger = createLogger("notification-service")

// Configure VAPID once at module load — not per-send
if (
  config.push.vapidPublicKey !== "" &&
  config.push.vapidPrivateKey !== ""
) {
  webPush.setVapidDetails(
    config.push.vapidSubject,
    config.push.vapidPublicKey,
    config.push.vapidPrivateKey
  )
}

export interface PushPayload {
  title: string
  body: string
  icon?: string
  badge?: string
  url?: string  // URL to open when notification is clicked
  tag?: string  // Replaces existing notification with same tag
}

export interface SendPushResult {
  success: boolean
  statusCode?: number
  error?: string
  // True when push returns 410 — subscription is expired, must delete
  subscriptionExpired?: boolean
}

export async function sendPush(
  subscription: {
    endpoint: string
    p256dhKey: string
    authKey: string
  },
  payload: PushPayload
): Promise<SendPushResult> {
  // Skip push if VAPID not configured — development without push keys
  if (
    config.push.vapidPublicKey === "" ||
    config.push.vapidPrivateKey === ""
  ) {
    logger.info("Push skipped — VAPID keys not configured")
    return { success: true }
  }

  try {
    await webPush.sendNotification(
      {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.p256dhKey,
          auth: subscription.authKey,
        },
      },
      JSON.stringify(payload),
      {
        TTL: 3600,  // Message lives on push service for 1 hour if device offline
        urgency: "normal",
      }
    )

    logger.info(
      { endpoint: subscription.endpoint.slice(0, 50) },
      "Push notification sent"
    )

    return { success: true }
  } catch (error: unknown) {
    const statusCode =
      error instanceof Error && "statusCode" in error
        ? (error as { statusCode: number }).statusCode
        : undefined

    // 410 Gone: user revoked push permission in their browser
    // We MUST delete this subscription — sending to it again
    // violates the Web Push protocol and wastes resources
    const subscriptionExpired = statusCode === 410

    logger.error(
      {
        endpoint: subscription.endpoint.slice(0, 50),
        statusCode,
        subscriptionExpired,
        error: error instanceof Error ? error.message : "unknown",
      },
      "Push notification failed"
    )

  return {
  success: false,
  subscriptionExpired,
  error: error instanceof Error ? error.message : "Unknown push error",
  ...(statusCode !== undefined && { statusCode }),
}
  }
}