// services/media-service/src/routes/media.routes.ts

import type { FastifyInstance } from "fastify"
import * as mediaController from "../controllers/media.controller"

export default async function mediaRoutes(
  fastify: FastifyInstance
): Promise<void> {
  // Request presigned upload URL
  fastify.post("/media/upload-url", {
    schema: {
      body: {
        type: "object",
        required: ["eventId", "type", "mimeType", "fileSizeBytes"],
        properties: {
          eventId: { type: "string" },
          type: {
            type: "string",
            enum: ["BEFORE_PHOTO", "AFTER_PHOTO", "PROGRESS_PHOTO"],
          },
          mimeType: {
            type: "string",
            enum: ["image/jpeg", "image/png", "image/webp"],
          },
          fileSizeBytes: {
            type: "number",
            minimum: 1,
            maximum: 10_485_760,  // 10MB
          },
        },
      },
    },
    config: { rateLimit: { max: 10, timeWindow: "1 minute" } },
  }, mediaController.requestUploadUrl)

  // Confirm upload complete
  fastify.post("/media/:id/confirm", {
    schema: {
      params: {
        type: "object",
        required: ["id"],
        properties: { id: { type: "string" } },
      },
    },
  }, mediaController.confirmUpload)

  // Get all media for an event
  fastify.get("/media/event/:eventId", {
    schema: {
      params: {
        type: "object",
        required: ["eventId"],
        properties: { eventId: { type: "string" } },
      },
    },
  }, mediaController.getEventMedia)

  // Get single media asset
  fastify.get("/media/:id", {
    schema: {
      params: {
        type: "object",
        required: ["id"],
        properties: { id: { type: "string" } },
      },
    },
  }, mediaController.getMedia)
}