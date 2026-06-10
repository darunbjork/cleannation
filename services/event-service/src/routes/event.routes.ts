// services/event-service/src/routes/event.routes.ts

import type { FastifyInstance } from "fastify"
import * as eventController from "../controllers/event.controller"

export default async function eventRoutes(
  fastify: FastifyInstance
): Promise<void> {
  // List events — public, high read rate
  fastify.get("/events", eventController.listEvents)

  // Get single event — public
  fastify.get("/events/:id", {
    schema: {
      params: {
        type: "object",
        required: ["id"],
        properties: { id: { type: "string" } },
      },
    },
  }, eventController.getEvent)

  // Create event — requires organizer+ role (enforced in service)
  fastify.post("/events", {
    schema: {
      body: { type: "object" },
    },
    config: { rateLimit: { max: 30, timeWindow: "1 minute" } },
  }, eventController.createEvent)

  // Publish event — organizer only
  fastify.patch("/events/:id/publish", eventController.publishEvent)

  // Cancel event — soft delete
  fastify.delete("/events/:id", eventController.cancelEvent)

  // Join event — any authenticated user
  fastify.post("/events/:id/join", {
    config: { rateLimit: { max: 30, timeWindow: "1 minute" } },
  }, eventController.joinEvent)

  // Leave event
  fastify.delete("/events/:id/join", eventController.leaveEvent)
}
