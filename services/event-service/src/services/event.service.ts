// services/event-service/src/services/event.service.ts
// Event business logic — orchestrates repository + Kafka publishing.

import { z } from "zod"
import {
  NotFoundError,
  ForbiddenError,
  EventFullError,
  EventNotActiveError,
  AlreadyRegisteredError,
  createLogger,
} from "@cleannation/shared-utils"
import {
  KAFKA_TOPICS,
  type EventCreatedPayload,
  type EventJoinedPayload,
  type EventCompletedPayload,
} from "@cleannation/shared-types"
import { EventRepository } from "../repositories/event.repository"
import { RegistrationRepository } from "../repositories/registration.repository"
import { TierService } from "./tier.service"
import { publishEvent } from "../kafka/producer"

const logger = createLogger("event-service")

// Zod schemas for input validation
// Used alongside Fastify JSON Schema — Zod handles business-rule validation,
// Fastify handles HTTP-level validation (required fields, types)
export const CreateEventSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(2000),
  category: z.enum([
    "BEACH", "PARK", "URBAN_STREET", "FOREST",
    "RIVER", "HIGHWAY", "NEIGHBORHOOD", "OTHER",
  ]),
  maxParticipants: z.number().int().min(2).max(10000),
  scheduledAt: z.string().datetime(),
  estimatedDurationMin: z.number().int().min(30).max(480),
  locationId: z.string().min(1),
  pointsReward: z.number().int().min(10).max(1000),
})

export type CreateEventInput = z.infer<typeof CreateEventSchema>

export class EventService {
  private readonly eventRepo = new EventRepository()
  private readonly registrationRepo = new RegistrationRepository()
  private readonly tierService = new TierService()

  async getById(id: string) {
    const event = await this.eventRepo.findById(id)
    if (event === null) throw new NotFoundError("Event")
    return event
  }

  async list(filters: {
    status?: string
    category?: string
    organizerId?: string
    page: number
    limit: number
  }) {
    return this.eventRepo.findMany({
      status: filters.status as never,
      category: filters.category as never,
      organizerId: filters.organizerId,
      page: filters.page,
      limit: Math.min(filters.limit, 100),
    })
  }

  async create(
    input: CreateEventInput,
    actor: { userId: string; role: string; orgId: string | null }
  ) {
    // Enforce tier limits before creating
    await this.tierService.assertCanCreateEvent(actor.userId, actor.role)

    // Validate that scheduledAt is in the future
    const scheduledAt = new Date(input.scheduledAt)
    if (scheduledAt <= new Date()) {
      const { ValidationError } = await import("@cleannation/shared-utils")
      throw new ValidationError("scheduledAt must be in the future")
    }

    const event = await this.eventRepo.create({
      title: input.title,
      description: input.description,
      category: input.category as never,
      organizerId: actor.userId,
      organizationId: actor.orgId,
      maxParticipants: input.maxParticipants,
      scheduledAt,
      estimatedDurationMin: input.estimatedDurationMin,
      locationId: input.locationId,
      pointsReward: input.pointsReward,
    })

    logger.info(
      { eventId: event.id, organizerId: actor.userId },
      "Event created"
    )

    // Publish Kafka event — fire and forget
    // notification-service will send confirmation email
    // location-service will initialize the cleanup zone
    const payload: EventCreatedPayload = {
      eventId: event.id,
      organizerId: actor.userId,
      organizationId: actor.orgId,
      title: event.title,
      scheduledAt: event.scheduledAt.toISOString(),
      locationId: event.locationId,
    }

    await publishEvent(
      KAFKA_TOPICS.EVENT_CREATED,
      payload,
      event.id  // partition key — all events for this eventId on same partition
    )

    return event
  }

  async update(
    id: string,
    data: Partial<CreateEventInput>,
    actor: { userId: string; role: string }
  ) {
    const event = await this.eventRepo.findById(id)
    if (event === null) throw new NotFoundError("Event")

    // Only the organizer or platform_admin can update
    if (
      event.organizerId !== actor.userId &&
      actor.role !== "platform_admin"
    ) {
      throw new ForbiddenError("Only the event organizer can update this event")
    }

    // Cannot update a completed or cancelled event
    if (["COMPLETED", "VERIFIED", "CANCELLED"].includes(event.status)) {
      throw new EventNotActiveError()
    }

    const updated = await this.eventRepo.update(id, {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.description !== undefined
        ? { description: data.description }
        : {}),
      ...(data.maxParticipants !== undefined
        ? { maxParticipants: data.maxParticipants }
        : {}),
      ...(data.scheduledAt !== undefined
        ? { scheduledAt: new Date(data.scheduledAt) }
        : {}),
    })

    logger.info({ eventId: id, updatedBy: actor.userId }, "Event updated")

    return updated
  }

  async publish(id: string, actor: { userId: string; role: string }) {
    const event = await this.eventRepo.findById(id)
    if (event === null) throw new NotFoundError("Event")

    if (
      event.organizerId !== actor.userId &&
      actor.role !== "platform_admin"
    ) {
      throw new ForbiddenError("Only the event organizer can publish this event")
    }

    if (event.status !== "DRAFT") {
      const { ValidationError } = await import("@cleannation/shared-utils")
      throw new ValidationError("Only draft events can be published")
    }

    return this.eventRepo.update(id, { status: "PUBLISHED" as never })
  }

  async cancel(id: string, actor: { userId: string; role: string }) {
    const event = await this.eventRepo.findById(id)
    if (event === null) throw new NotFoundError("Event")

    if (
      event.organizerId !== actor.userId &&
      actor.role !== "platform_admin"
    ) {
      throw new ForbiddenError("Only the event organizer can cancel this event")
    }

    await this.eventRepo.softDelete(id)

    logger.info({ eventId: id, cancelledBy: actor.userId }, "Event cancelled")

    // Notify all registrants via Kafka
    // notification-service consumes this and sends cancellation emails
    await publishEvent(
      KAFKA_TOPICS.EVENT_CANCELLED,
      { eventId: id, organizerId: actor.userId },
      id
    )
  }

  async join(eventId: string, actor: { userId: string }) {
    const event = await this.eventRepo.findById(eventId)
    if (event === null) throw new NotFoundError("Event")

    if (event.status !== "PUBLISHED" && event.status !== "ACTIVE") {
      throw new EventNotActiveError()
    }

    // Check for existing registration
    const existing = await this.registrationRepo.findByEventAndUser(
      eventId,
      actor.userId
    )
    if (existing !== null && existing.status !== "CANCELLED") {
      throw new AlreadyRegisteredError()
    }

    // Atomically increment participant count — returns null if full
    const updated = await this.eventRepo.incrementParticipantCount(
      eventId,
      event.maxParticipants
    )

    if (updated === null) {
      throw new EventFullError()
    }

    const registration = await this.registrationRepo.create({
      eventId,
      userId: actor.userId,
    })

    logger.info(
      { eventId, userId: actor.userId, registrationId: registration.id },
      "User joined event"
    )

    const payload: EventJoinedPayload = {
      eventId,
      userId: actor.userId,
      registrationId: registration.id,
      registeredAt: registration.registeredAt.toISOString(),
    }

    await publishEvent(KAFKA_TOPICS.EVENT_JOINED, payload, eventId)

    return registration
  }

  async leave(eventId: string, actor: { userId: string }) {
    const event = await this.eventRepo.findById(eventId)
    if (event === null) throw new NotFoundError("Event")

    const registration = await this.registrationRepo.findByEventAndUser(
      eventId,
      actor.userId
    )

    if (registration === null || registration.status === "CANCELLED") {
      const { NotFoundError: NFE } = await import("@cleannation/shared-utils")
      throw new NFE("Registration")
    }

    // Cannot leave an event you have already checked into
    if (registration.status === "CHECKED_IN") {
      const { ValidationError } = await import("@cleannation/shared-utils")
      throw new ValidationError("Cannot leave an event after check-in")
    }

    await this.registrationRepo.updateStatus(registration.id, "CANCELLED")
    await this.eventRepo.decrementParticipantCount(eventId)

    await publishEvent(
      KAFKA_TOPICS.EVENT_LEFT,
      { eventId, userId: actor.userId },
      eventId
    )

    logger.info({ eventId, userId: actor.userId }, "User left event")
  }

  async complete(
    eventId: string,
    actor: { userId: string; role: string },
    stats: { participantCount: number; verifiedMediaCount: number }
  ) {
    const event = await this.eventRepo.findById(eventId)
    if (event === null) throw new NotFoundError("Event")

    if (
      event.organizerId !== actor.userId &&
      actor.role !== "platform_admin"
    ) {
      throw new ForbiddenError("Only the organizer can complete this event")
    }

    if (event.status !== "ACTIVE") {
      throw new EventNotActiveError()
    }

    await this.eventRepo.update(eventId, { status: "COMPLETED" as never })

    const payload: EventCompletedPayload = {
      eventId,
      organizerId: actor.userId,
      participantCount: stats.participantCount,
      verifiedMediaCount: stats.verifiedMediaCount,
      durationMin: event.estimatedDurationMin,
      pointsToAward: event.pointsReward,
    }

    await publishEvent(KAFKA_TOPICS.EVENT_COMPLETED, payload, eventId)

    logger.info({ eventId }, "Event completed")

    return this.eventRepo.findById(eventId)
  }
}
