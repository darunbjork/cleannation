// services/location-service/src/controllers/zone.controller.ts

import type { FastifyRequest, FastifyReply } from "fastify"
import { asyncHandler, type RouteHandler, type MinimalFastifyInstance } from "@cleannation/shared-utils"
import { ok } from "@cleannation/shared-types"
import { ZoneService } from "../services/zone.service"
import { config } from "../config/index"

const zoneService = new ZoneService()

function getMeta(request: FastifyRequest) {
  return {
    requestId: (request as unknown as { correlationId: string }).correlationId ?? "unknown",
    service: "location-service",
  }
}

export const getZone: RouteHandler = asyncHandler(async function (this: MinimalFastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const params = request.params as { id: string }
  const zone = await zoneService.getById(params.id)
  return reply.status(200).send(ok(zone, getMeta(request)))
})

export const findNearbyZones: RouteHandler = asyncHandler(async function (this: MinimalFastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const query = request.query as {
    lat: number
    lng: number
    radiusMeters?: number
  }
  const { lat, lng, radiusMeters = 10_000 } = query
  const zones = await zoneService.findNearby(lat, lng, radiusMeters)
  return reply.status(200).send(ok(zones, getMeta(request)))
})

export const listZones: RouteHandler = asyncHandler(async function (this: MinimalFastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const query = request.query as {
    country?: string
    region?: string
    page?: number
    limit?: number
  }
  const result = await zoneService.list({
    country: query.country,
    region: query.region,
    page: query.page ?? 1,
    limit: query.limit ?? 20,
  })

  return reply.status(200).send({
    success: true,
    data: result.zones,
    error: null,
    meta: {
      ...getMeta(request),
      timestamp: new Date().toISOString(),
      pagination: {
        page: query.page ?? 1,
        limit: query.limit ?? 20,
        total: result.total,
      },
    },
  })
})

export const createZone: RouteHandler = asyncHandler(async function (this: MinimalFastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const body = request.body as {
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

  const zone = await zoneService.create(body)
  return reply.status(201).send(ok(zone, getMeta(request)))
})
