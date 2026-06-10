// services/event-service/src/controllers/event.controller.ts
// REST controllers — mutations only.
// Zero business logic. Zero try/catch.

import type { FastifyRequest, FastifyReply } from "fastify"
import { asyncHandler } from "@cleannation/shared-utils"
import { ok } from "@cleannation/shared-types"
import { EventService, CreateEventSchema } from "../services/event.service"

const eventService = new EventService()

function getActor(request: FastifyRequest) {
  return {
    userId: request.headers["x-user-id"] as string,
    role: request.headers["x-user-role"] as string,
    orgId: (request.headers["x-org-id"] as string) || null,
  }
}

function getMeta(request: FastifyRequest) {
  return {
    requestId: (request as unknown as { correlationId: string }).correlationId ?? "unknown",
    service: "event-service",
  }
}

export const createEvent = asyncHandler(async (
  request: FastifyRequest<{ Body: unknown }>,
  reply: FastifyReply
) => {
  // Zod parse — throws ValidationError if input fails business rules
  const { ValidationError } = await import("@cleannation/shared-utils")
  const parsed = CreateEventSchema.safeParse(request.body)
  if (!parsed.success) {
    throw new ValidationError(parsed.error.flatten())
  }

  const event = await eventService.create(parsed.data, getActor(request))

  return reply.status(201).send(ok(event, getMeta(request)))
})

export const getEvent = asyncHandler(async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const event = await eventService.getById(request.params.id)
  return reply.status(200).send(ok(event, getMeta(request)))
})

export const listEvents = asyncHandler(async (
  request: FastifyRequest<{
    Querystring: {
      status?: string
      category?: string
      organizerId?: string
      page?: number
      limit?: number
    }
  }>,
  reply: FastifyReply
) => {
  const { events, total } = await eventService.list({
    ...request.query,
    page: request.query.page ?? 1,
    limit: request.query.limit ?? 20,
  })

  const limit = request.query.limit ?? 20
  const page = request.query.page ?? 1
  const pages = Math.ceil(total / limit)

  return reply.status(200).send({
    success: true,
    data: events,
    error: null,
    meta: {
      ...getMeta(request),
      timestamp: new Date().toISOString(),
      pagination: {
        page,
        limit,
        total,
        pages,
        hasNext: page < pages,
        hasPrev: page > 1,
      },
    },
  })
})

export const publishEvent = asyncHandler(async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const event = await eventService.publish(
    request.params.id,
    getActor(request)
  )
  return reply.status(200).send(ok(event, getMeta(request)))
})

export const cancelEvent = asyncHandler(async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  await eventService.cancel(request.params.id, getActor(request))
  return reply.status(204).send()
})

export const joinEvent = asyncHandler(async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const registration = await eventService.join(
    request.params.id,
    { userId: request.headers["x-user-id"] as string }
  )
  return reply.status(201).send(ok(registration, getMeta(request)))
})

export const leaveEvent = asyncHandler(async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  await eventService.leave(
    request.params.id,
    { userId: request.headers["x-user-id"] as string }
  )
  return reply.status(204).send()
})
