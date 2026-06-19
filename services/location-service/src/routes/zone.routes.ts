import type { FastifyInstance } from "fastify"
import * as zoneController from "../controllers/zone.controller"

export default async function zoneRoutes(
  fastify: FastifyInstance
): Promise<void> {
  // Get zone by ID
  fastify.get("/locations/zones/:id", {
    schema: {
      params: {
        type: "object",
        required: ["id"],
        properties: { id: { type: "string" } },
      },
    },
  }, zoneController.getZone)

  // Find zones near a coordinate — the core map query
  fastify.get("/locations/zones/nearby", {
    schema: {
      querystring: {
        type: "object",
        required: ["lat", "lng"],
        properties: {
          lat: { type: "number", minimum: -90, maximum: 90 },
          lng: { type: "number", minimum: -180, maximum: 180 },
          radiusMeters: { type: "number", minimum: 100, maximum: 50000 },
        },
      },
    },
  }, zoneController.findNearbyZones)

  // List zones with filters
  fastify.get("/locations/zones", zoneController.listZones)

  // Create a zone — organizer+ only
  fastify.post("/locations/zones", {
    schema: {
      body: {
        type: "object",
        required: ["name", "description", "lat", "lng",
                   "radiusMeters", "country", "region", "city"],
        properties: {
          name: { type: "string", minLength: 3, maxLength: 100 },
          description: { type: "string", minLength: 10, maxLength: 500 },
          lat: { type: "number", minimum: -90, maximum: 90 },
          lng: { type: "number", minimum: -180, maximum: 180 },
          radiusMeters: { type: "number", minimum: 100, maximum: 10000 },
          country: { type: "string", minLength: 2, maxLength: 2 },
          region: { type: "string", minLength: 1, maxLength: 100 },
          city: { type: "string", minLength: 1, maxLength: 100 },
          eventId: { type: "string" },
        },
      },
    },
    config: { rateLimit: { max: 10, timeWindow: "1 minute" } },
  }, zoneController.createZone)
}