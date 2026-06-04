export declare const KAFKA_TOPICS: {
    readonly USER_REGISTERED: "user.registered";
    readonly USER_UPDATED: "user.updated";
    readonly USER_BANNED: "user.banned";
    readonly EVENT_CREATED: "event.created";
    readonly EVENT_UPDATED: "event.updated";
    readonly EVENT_CANCELLED: "event.cancelled";
    readonly EVENT_JOINED: "event.joined";
    readonly EVENT_LEFT: "event.left";
    readonly EVENT_COMPLETED: "event.completed";
    readonly MEDIA_UPLOADED: "media.uploaded";
    readonly MEDIA_VERIFIED: "media.verified";
    readonly MEDIA_REJECTED: "media.rejected";
    readonly POINTS_AWARDED: "points.awarded";
    readonly BADGE_EARNED: "badge.earned";
    readonly PAYMENT_COMPLETED: "payment.completed";
    readonly SUBSCRIPTION_CHANGED: "subscription.changed";
    readonly SUBSCRIPTION_CANCELLED: "subscription.cancelled";
};
export type KafkaTopic = (typeof KAFKA_TOPICS)[keyof typeof KAFKA_TOPICS];
export interface KafkaEventEnvelope<TPayload> {
    eventId: string;
    topic: KafkaTopic;
    version: "1.0";
    occurredAt: string;
    payload: TPayload;
}
export interface UserRegisteredPayload {
    userId: string;
    email: string;
    username: string;
    role: string;
}
export interface EventCreatedPayload {
    eventId: string;
    organizerId: string;
    organizationId: string | null;
    title: string;
    scheduledAt: string;
    locationId: string;
}
export interface EventJoinedPayload {
    eventId: string;
    userId: string;
    registrationId: string;
    registeredAt: string;
}
export interface EventCompletedPayload {
    eventId: string;
    organizerId: string;
    participantCount: number;
    verifiedMediaCount: number;
    durationMin: number;
    pointsToAward: number;
}
export interface MediaVerifiedPayload {
    mediaId: string;
    eventId: string;
    userId: string;
    type: "before_photo" | "after_photo" | "progress_photo";
    verificationScore: number;
}
export interface PointsAwardedPayload {
    userId: string;
    points: number;
    reason: string;
    eventId: string | null;
    newTotal: number;
}
export interface BadgeEarnedPayload {
    userId: string;
    badgeCategory: string;
    badgeName: string;
    pointsBonus: number;
}
export interface PaymentCompletedPayload {
    organizationId: string;
    tier: string;
    amount: number;
    currency: string;
    stripePaymentId: string;
}
export interface SubscriptionChangedPayload {
    organizationId: string;
    previousTier: string;
    newTier: string;
    effectiveAt: string;
}
//# sourceMappingURL=kafka.types.d.ts.map