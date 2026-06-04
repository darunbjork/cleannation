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
};
//# sourceMappingURL=kafka.types.js.map