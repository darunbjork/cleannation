import * as aws from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { createLogger, FileTooLargeError, InvalidFileTypeError } from "@cleannation/shared-utils"
import { config } from "../config/index"
import { MediaRepository } from "../repositories/media.repository"

const logger = createLogger("media-service")

// S3 client configured for Cloudflare R2
// R2 is S3-compatible — same SDK, different endpoint
const s3 = new aws.S3Client({
  region: "auto",  // R2 uses "auto" region
  endpoint: config.r2.endpoint,
  credentials: {
    accessKeyId: config.r2.accessKeyId,
    secretAccessKey: config.r2.secretAccessKey,
  },
})

export class UploadService {
  private readonly mediaRepo = new MediaRepository()

  // Step 1: Generate a presigned URL for direct browser-to-R2 upload
  async generatePresignedUrl(params: {
    eventId: string
    userId: string
    type: "BEFORE_PHOTO" | "AFTER_PHOTO" | "PROGRESS_PHOTO"
    mimeType: string
    fileSizeBytes: number
  }): Promise<{
    mediaId: string
    uploadUrl: string
    storageKey: string
    expiresAt: string
  }> {
    // Validate file type before generating URL
    // This prevents generating URLs for files we will reject anyway
    if (
      !config.upload.allowedMimeTypes.includes(
        params.mimeType as (typeof config.upload.allowedMimeTypes)[number]
      )
    ) {
      throw new InvalidFileTypeError([...config.upload.allowedMimeTypes])
    }

    if (params.fileSizeBytes > config.upload.maxFileSizeBytes) {
      throw new FileTooLargeError(
        config.upload.maxFileSizeBytes / (1024 * 1024)
      )
    }

    // Construct storage key — deterministic, not random
    // Format: events/{eventId}/{type}/{userId}_{timestamp}.{ext}
    // This structure allows:
    //   - Listing all media for an event: prefix "events/{eventId}/"
    //   - Organising by type: prefix "events/{eventId}/before/"
    //   - Identifying uploader: userId is in the key
    const ext = params.mimeType === "image/png" ? "png"
      : params.mimeType === "image/webp" ? "webp"
      : "jpg"

    const typeFolder = params.type.toLowerCase().replace("_photo", "")
    const storageKey = `events/${params.eventId}/${typeFolder}/${params.userId}_${Date.now()}.${ext}`

    // Pre-create the DB record BEFORE generating the presigned URL
    // This creates the mediaId the client will use in the confirmation call
    // If the upload is abandoned, this record stays as PENDING and
    // is cleaned up by a scheduled job after 24 hours
    const media = await this.mediaRepo.create({
      eventId: params.eventId,
      userId: params.userId,
      type: params.type,
      storageKey,
      fileSizeBytes: params.fileSizeBytes,
      mimeType: params.mimeType,
      // Width/height unknown until upload completes — set to 0 initially
      // Updated in confirmUpload after we read the actual image
      width: 0,
      height: 0,
    })

    // Generate presigned PUT URL
    // Client sends a PUT request to this URL with the file as the body
    const command = new aws.PutObjectCommand({
      Bucket: config.r2.bucketName,
      Key: storageKey,
      ContentType: params.mimeType,
      ContentLength: params.fileSizeBytes,
      // Metadata stored with the object in R2
      // Useful for debugging and auditing without hitting our DB
      Metadata: {
        "media-id": media.id,
        "event-id": params.eventId,
        "user-id": params.userId,
        "media-type": params.type,
      },
    })

    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: config.upload.presignedUrlExpirySeconds,
    })

    const expiresAt = new Date(
      Date.now() + config.upload.presignedUrlExpirySeconds * 1000
    ).toISOString()

    logger.info(
      {
        mediaId: media.id,
        eventId: params.eventId,
        userId: params.userId,
        storageKey,
      },
      "Presigned upload URL generated"
    )

    return {
      mediaId: media.id,
      uploadUrl,
      storageKey,
      expiresAt,
    }
  }

  // Step 2: Called by client AFTER upload to R2 completes
  // Reads actual image dimensions and queues for verification
  async confirmUpload(
    mediaId: string,
    userId: string
  ): Promise<{ success: boolean; queued: boolean }> {
    const media = await this.mediaRepo.findById(mediaId)

    if (media === null) {
      const { NotFoundError } = await import("@cleannation/shared-utils")
      throw new NotFoundError("Media asset")
    }

    // Verify the requester owns this upload
    if (media.userId !== userId) {
      const { ForbiddenError } = await import("@cleannation/shared-utils")
      throw new ForbiddenError("Cannot confirm another user's upload")
    }

    // Read the uploaded object to get actual dimensions
    // This also verifies the upload actually happened (object exists in R2)
    try {
      const getCommand = new aws.GetObjectCommand({
        Bucket: config.r2.bucketName,
        Key: media.storageKey,
      })
      const response = await (s3 as any).send(getCommand)
      const buffer = Buffer.from(
        await response.Body!.transformToByteArray()
      )

      // Use Sharp to read image metadata
      const { default: sharp } = await import("sharp")
      const metadata = await sharp(buffer).metadata()

      // Update DB with actual dimensions
      await this.mediaRepo.updateVerificationStatus(
        mediaId,
        "PENDING",  // Keep pending — verification pipeline will process it
        null,
        null,
        config.verification.pipelineVersion
      )

      // Update dimensions (Prisma doesn't have a partial update helper here,
      // so we use a direct update on the underlying client)
      await prisma_direct_update(mediaId, {
        width: metadata.width ?? 0,
        height: metadata.height ?? 0,
      })

      logger.info(
        {
          mediaId,
          width: metadata.width,
          height: metadata.height,
          storageKey: media.storageKey,
        },
        "Upload confirmed — queued for verification"
      )

      return { success: true, queued: true }
    } catch (error: unknown) {
      logger.error(
        {
          mediaId,
          storageKey: media.storageKey,
          error: error instanceof Error ? error.message : "unknown",
        },
        "Upload confirmation failed — object may not exist in R2"
      )
      throw error
    }
  }

  // Generate a signed URL for reading a private asset
  // Used for before/after comparison views — not publicly accessible
  async getPresignedReadUrl(
    storageKey: string,
    expirySeconds = 3600
  ): Promise<string> {
    const command = new aws.GetObjectCommand({
      Bucket: config.r2.bucketName,
      Key: storageKey,
    })
    return getSignedUrl(s3, command, { expiresIn: expirySeconds })
  }

  // Public URL — for publicly accessible verified photos
  getPublicUrl(storageKey: string): string {
    return `${config.r2.publicUrl}/${storageKey}`
  }
}

// Direct Prisma update helper — avoids circular import issues
async function prisma_direct_update(
  id: string,
  data: { width: number; height: number }
): Promise<void> {
  const { prisma } = await import("../db/prisma")
  await prisma.mediaAsset.update({
    where: { id },
    data: { ...data, updatedAt: new Date() },
  })
}