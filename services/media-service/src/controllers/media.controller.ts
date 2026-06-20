// services/media-service/src/controllers/media.controller.ts

import type { FastifyRequest, FastifyReply } from "fastify"
import { asyncHandler } from "@cleannation/shared-utils"
import { ok } from "@cleannation/shared-types"
import { UploadService } from "../services/upload.service"
import { MediaRepository } from "../repositories/media.repository"

const uploadService = new UploadService()
const mediaRepo = new MediaRepository()

function getMeta(request: FastifyRequest) {
  return {
    requestId:
      (request.headers["x-correlation-id"] as string) ?? "unknown",
    service: "media-service",
  }
}

// POST /media/upload-url
// Client requests a presigned URL before uploading
export const requestUploadUrl = asyncHandler(async (
  request: FastifyRequest<{
    Body: {
      eventId: string
      type: "BEFORE_PHOTO" | "AFTER_PHOTO" | "PROGRESS_PHOTO"
      mimeType: string
      fileSizeBytes: number
    }
  }>,
  reply: FastifyReply
) => {
  const userId = request.headers["x-user-id"] as string

  const result = await uploadService.generatePresignedUrl({
    ...request.body,
    userId,
  })

  return reply.status(200).send(ok(result, getMeta(request)))
})

// POST /media/:id/confirm
// Client calls this after successfully uploading to R2
export const confirmUpload = asyncHandler(async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const userId = request.headers["x-user-id"] as string

  const result = await uploadService.confirmUpload(
    request.params.id,
    userId
  )

  return reply.status(200).send(ok(result, getMeta(request)))
})

// GET /media/event/:eventId
// Returns all media assets for an event with signed read URLs
export const getEventMedia = asyncHandler(async (
  request: FastifyRequest<{ Params: { eventId: string } }>,
  reply: FastifyReply
) => {
  const assets = await mediaRepo.findByEvent(request.params.eventId)

  // Generate signed read URLs for each asset
  // In production: cache these URLs in Redis for ~1 hour
  const assetsWithUrls = await Promise.all(
    assets.map(async (asset) => ({
      id: asset.id,
      eventId: asset.eventId,
      userId: asset.userId,
      type: asset.type,
      verificationStatus: asset.verificationStatus,
      verificationScore: asset.verificationScore,
      width: asset.width,
      height: asset.height,
      uploadedAt: asset.uploadedAt.toISOString(),
      verifiedAt: asset.verifiedAt?.toISOString() ?? null,
      // Signed URL — valid for 1 hour
      url: await uploadService.getPresignedReadUrl(
        asset.storageKey,
        3600
      ),
    }))
  )

  return reply.status(200).send(
    ok(assetsWithUrls, getMeta(request))
  )
})

// GET /media/:id
// Returns a single media asset with signed URL
export const getMedia = asyncHandler(async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const asset = await mediaRepo.findById(request.params.id)

  if (asset === null) {
    const { NotFoundError } = await import("@cleannation/shared-utils")
    throw new NotFoundError("Media asset")
  }

  const url = await uploadService.getPresignedReadUrl(
    asset.storageKey,
    3600
  )

  return reply.status(200).send(
    ok({ ...asset, url }, getMeta(request))
  )
})