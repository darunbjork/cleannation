// packages/shared-types/src/events/kafka.types.ts
// Every Kafka event payload is typed here.
// Producer and consumer import the same interface — contract enforced at compile time.
// Topic names are const — never hardcode strings in service code.

export const KAFKA_TOPICS = {
  USER_REGISTERED: "user.registered",
  USER_UPDATED: "user.updated",
  USER_BANNED: "user.banned",

  EVENT_CREATED: "event.created",
  EVENT_UPDATED: "event.updated",
  EVENT_CANCELLED: "event.cancelled",
  EVENT_JOINED: "event.joined",
  EVENT_LEFT: "event.left",
  EVENT_COMPLETED: "event.completed",

  MEDIA_UPLOADED: "media.uploaded",
  MEDIA_VERIFIED: "media.verified",
  MEDIA_REJECTED: "media.rejected",

  POINTS_AWARDED: "points.awarded",
  BADGE_EARNED: "badge.earned",

  PAYMENT_COMPLETED: "payment.completed",
  SUBSCRIPTION_CHANGED: "subscription.changed",
  SUBSCRIPTION_CANCELLED: "subscription.cancelled",
} as const

export type KafkaTopic = (typeof KAFKA_TOPICS)[keyof typeof KAFKA_TOPICS]

// Base envelope — every Kafka message includes these fields
export interface KafkaEventEnvelope<TPayload> {
  eventId: string       // UUID — used for deduplication (idempotency)
  topic: KafkaTopic
  version: "1.0"        // schema version — increment when payload changes
  occurredAt: string    // ISO 8601 — when the domain event happened
  payload: TPayload
}

// ── Payload types per topic ───────────────────────────────────────────────

export interface UserRegisteredPayload {
  userId: string
  email: string
  username: string
  role: string
}

export interface EventCreatedPayload {
  eventId: string
  organizerId: string
  organizationId: string | null
  title: string
  scheduledAt: string
  locationId: string
}

export interface EventJoinedPayload {
  eventId: string
  userId: string
  registrationId: string
  registeredAt: string
}

export interface EventCompletedPayload {
  eventId: string
  organizerId: string
  participantCount: number
  verifiedMediaCount: number
  durationMin: number
  pointsToAward: number
}

export interface MediaVerifiedPayload {
  mediaId: string
  eventId: string
  userId: string
  type: "before_photo" | "after_photo" | "progress_photo"
  verificationScore: number
}

export interface PointsAwardedPayload {
  userId: string
  points: number
  reason: string
  eventId: string | null
  newTotal: number
}

export interface BadgeEarnedPayload {
  userId: string
  badgeCategory: string
  badgeName: string
  pointsBonus: number
}

export interface PaymentCompletedPayload {
  organizationId: string
  tier: string
  amount: number
  currency: string
  stripePaymentId: string
}

export interface SubscriptionChangedPayload {
  organizationId: string
  previousTier: string
  newTier: string
  effectiveAt: string
}
