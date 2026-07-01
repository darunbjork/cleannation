import type { FastifyRequest, FastifyReply } from "fastify"
import { asyncHandler } from "@cleannation/shared-utils"
import { ok } from "@cleannation/shared-types"
import { EventService } from "../services/event.service"

const eventService = new EventService()

function getMeta(request: FastifyRequest) {
  return {
    requestId:
      (request.headers["x-correlation-id"] as string) ?? "unknown",
    service: "event-service",
  }
}

// POST /events/:id/join
export const joinEvent = asyncHandler(async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const userId = request.headers["x-user-id"] as string

  const registration = await eventService.join(
    request.params.id,
    { userId }
  )

  return reply.status(201).send(ok(registration, getMeta(request)))
})

// DELETE /events/:id/join
export const leaveEvent = asyncHandler(async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const userId = request.headers["x-user-id"] as string

  await eventService.leave(
    request.params.id,
    { userId }
  )

  return reply.status(204).send()
})

// POST /events/:id/checkin
// Called when volunteer physically arrives at the event zone
export const checkInEvent = asyncHandler(async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const userId = request.headers["x-user-id"] as string

  // Registration status update — REGISTERED → CHECKED_IN
  const { RegistrationRepository } = await import(
    "../repositories/registration.repository"
  )
  const regRepo = new RegistrationRepository()

  const registration = await regRepo.findByEventAndUser(
    request.params.id,
    userId
  )

  if (registration === null) {
    const { NotFoundError } = await import("@cleannation/shared-utils")
    throw new NotFoundError("Registration")
  }

  const updated = await regRepo.updateStatus(
    registration.id,
    "CHECKED_IN",
    { checkedInAt: new Date() }
  )

  return reply.status(200).send(ok(updated, getMeta(request)))
})

// GET /events/:id/registrations
// Returns all registrations for an event (organizer only)
export const listRegistrations = asyncHandler(async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { RegistrationRepository } = await import(
    "../repositories/registration.repository"
  )
  const regRepo = new RegistrationRepository()

  const registrations = await regRepo.findByEvent(request.params.id)

  return reply.status(200).send(ok(registrations, getMeta(request)))
})