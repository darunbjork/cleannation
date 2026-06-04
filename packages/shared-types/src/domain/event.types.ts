// packages/shared-types/src/domain/event.types.ts
// Cleanup event domain types.
// event-service owns these records.

export type EventStatus =
  | "draft"       // created, not yet published
  | "published"   // visible, accepting registrations
  | "active"      // event day — GPS check-in enabled
  | "completed"   // finished — photo verification phase
  | "verified"    // all photos verified — points awarded
  | "cancelled"

export type EventCategory =
  | "beach"
  | "park"
  | "urban_street"
  | "forest"
  | "river"
  | "highway"
  | "neighborhood"
  | "other"

export interface CleanupEvent {
  id: string
  title: string
  description: string
  category: EventCategory
  status: EventStatus
  organizerId: string
  organizationId: string | null
  maxParticipants: number
  currentParticipants: number
  scheduledAt: string       // ISO 8601
  estimatedDurationMin: number
  locationId: string        // foreign key → location-service
  mediaIds: string[]        // foreign keys → media-service
  pointsReward: number      // awarded to volunteers on completion
  createdAt: string
  updatedAt: string
}

// Shape returned to volunteers browsing events
export type EventSummary = Pick<
  CleanupEvent,
  | "id"
  | "title"
  | "category"
  | "status"
  | "scheduledAt"
  | "estimatedDurationMin"
  | "currentParticipants"
  | "maxParticipants"
  | "pointsReward"
  | "locationId"
>

export interface EventRegistration {
  id: string
  eventId: string
  userId: string
  registeredAt: string
  checkedInAt: string | null
  checkedOutAt: string | null
  status: "registered" | "checked_in" | "completed" | "no_show"
}

export interface CreateEventInput {
  title: string
  description: string
  category: EventCategory
  maxParticipants: number
  scheduledAt: string
  estimatedDurationMin: number
  locationId: string
  pointsReward: number
}
