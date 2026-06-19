import type { FastifyRequest, FastifyReply } from "fastify"
import { asyncHandler } from "@cleannation/shared-utils"
import { ok } from "@cleannation/shared-types"
import { ZoneService } from "../services/zone.service"

const zoneService = new ZoneService()

function getMeta(request: FastifyRequest) {
  return {
    requestId: (request.headers["x-correlation-id"] as string) ?? "unknown",
    service: "location-service",
  }
}

export const getZone = asyncHandler(async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const zone = await zoneService.getById(request.params.id)
  return reply.status(200).send(ok(zone, getMeta(request)))
})

export const findNearbyZones = asyncHandler(async (
  request: FastifyRequest<{
    Querystring: {
      lat: number
      lng: number
      radiusMeters?: number
    }
  }>,
  reply: FastifyReply
) => {
  const { lat, lng, radiusMeters = 10_000 } = request.query
  const zones = await zoneService.findNearby(lat, lng, radiusMeters)
  return reply.status(200).send(ok(zones, getMeta(request)))
})

export const listZones = asyncHandler(async (
  request: FastifyRequest<{
    Querystring: {
      country?: string
      region?: string
      page?: number
      limit?: number
    }
  }>,
  reply: FastifyReply
) => {
  const result = await zoneService.list({
    country: request.query.country,
    region: request.query.region,
    page: request.query.page ?? 1,
    limit: request.query.limit ?? 20,
  })

  return reply.status(200).send({
    success: true,
    data: result.zones,
    error: null,
    meta: {
      ...getMeta(request),
      timestamp: new Date().toISOString(),
      pagination: {
        page: request.query.page ?? 1,
        limit: request.query.limit ?? 20,
        total: result.total,
      },
    },
  })
})

export const createZone = asyncHandler(async (
  request: FastifyRequest<{
    Body: {
      name: string
      description: string
      lat: number
      lng: number
      radiusMeters: number
      country: string
      region: string
      city: string
      eventId?: string
    }
  }>,
  reply: FastifyReply
) => {
  const role = request.headers["x-user-role"]

  // Only organizers and above can create zones
  if (
    role !== "organizer" &&
    role !== "org_admin" &&
    role !== "platform_admin"
  ) {
    const { ForbiddenError } = await import("@cleannation/shared-utils")
    throw new ForbiddenError("Only organizers can create cleanup zones")
  }

  const zone = await zoneService.create(request.body)
  return reply.status(201).send(ok(zone, getMeta(request)))
})