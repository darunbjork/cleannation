export type EventStatus = "draft" | "published" | "active" | "completed" | "verified" | "cancelled";
export type EventCategory = "beach" | "park" | "urban_street" | "forest" | "river" | "highway" | "neighborhood" | "other";
export interface CleanupEvent {
    id: string;
    title: string;
    description: string;
    category: EventCategory;
    status: EventStatus;
    organizerId: string;
    organizationId: string | null;
    maxParticipants: number;
    currentParticipants: number;
    scheduledAt: string;
    estimatedDurationMin: number;
    locationId: string;
    mediaIds: string[];
    pointsReward: number;
    createdAt: string;
    updatedAt: string;
}
export type EventSummary = Pick<CleanupEvent, "id" | "title" | "category" | "status" | "scheduledAt" | "estimatedDurationMin" | "currentParticipants" | "maxParticipants" | "pointsReward" | "locationId">;
export interface EventRegistration {
    id: string;
    eventId: string;
    userId: string;
    registeredAt: string;
    checkedInAt: string | null;
    checkedOutAt: string | null;
    status: "registered" | "checked_in" | "completed" | "no_show";
}
export interface CreateEventInput {
    title: string;
    description: string;
    category: EventCategory;
    maxParticipants: number;
    scheduledAt: string;
    estimatedDurationMin: number;
    locationId: string;
    pointsReward: number;
}
//# sourceMappingURL=event.types.d.ts.map