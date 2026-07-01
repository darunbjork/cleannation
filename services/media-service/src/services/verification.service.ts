import { createLogger } from "@cleannation/shared-utils"
import { MediaRepository } from "../repositories/media.repository"
import { processPendingMedia } from "../pipeline/processor"
import { publishMediaVerified } from "../kafka/producer"
import { config } from "../config/index"

const logger = createLogger("media-service")
const mediaRepo = new MediaRepository()

export class VerificationService {

  // Run one cycle of the verification pipeline.
  // Fetches pending assets, processes them, publishes Kafka events.
  // Safe to call concurrently — each asset is marked PROCESSING
  // immediately to prevent double-processing.
  async runPipelineCycle(): Promise<void> {
    await processPendingMedia()
  }

  // Manually trigger verification for a specific asset.
  // Used by the gRPC TriggerVerification handler.
  async triggerForAsset(
    mediaId: string,
    priority: "normal" | "high"
  ): Promise<{ queued: boolean; estimatedProcessingMs: number }> {
    const asset = await mediaRepo.findById(mediaId)

    if (asset === null) {
      return { queued: false, estimatedProcessingMs: 0 }
    }

    // Only re-queue if in a retriable state
    if (
      asset.verificationStatus !== "PENDING" &&
      asset.verificationStatus !== "REJECTED"
    ) {
      return { queued: false, estimatedProcessingMs: 0 }
    }

    // Reset to PENDING so the next pipeline cycle picks it up
    await mediaRepo.updateVerificationStatus(
      mediaId,
      "PENDING",
      null,
      null,
      config.verification.pipelineVersion
    )

    logger.info(
      { mediaId, priority },
      "Verification manually triggered"
    )

    // HIGH priority: next 5s cycle. NORMAL: next 30s cycle.
    const estimatedMs = priority === "high" ? 5_000 : 30_000

    return { queued: true, estimatedProcessingMs: estimatedMs }
  }

  // Get verification status summary for an event.
  // Used by event-service to show verification progress.
  async getEventVerificationSummary(eventId: string): Promise<{
    total: number
    pending: number
    verified: number
    rejected: number
    manualReview: number
  }> {
    const assets = await mediaRepo.findByEvent(eventId)

    return {
      total: assets.length,
      pending: assets.filter(
        (a) =>
          a.verificationStatus === "PENDING" ||
          a.verificationStatus === "PROCESSING"
      ).length,
      verified: assets.filter(
        (a) => a.verificationStatus === "VERIFIED"
      ).length,
      rejected: assets.filter(
        (a) => a.verificationStatus === "REJECTED"
      ).length,
      manualReview: assets.filter(
        (a) => a.verificationStatus === "MANUAL_REVIEW"
      ).length,
    }
  }

  // Publish Kafka event after successful verification.
  // Called by the pipeline processor after updating the DB.
  async publishVerifiedEvent(
    mediaId: string,
    eventId: string,
    userId: string,
    score: number,
    type: "BEFORE_PHOTO" | "AFTER_PHOTO" | "PROGRESS_PHOTO"
  ): Promise<void> {
    await publishMediaVerified({
      mediaId,
      eventId,
      userId,
      type: type.toLowerCase() as
        | "before_photo"
        | "after_photo"
        | "progress_photo",
      verificationScore: score,
    })

    logger.info(
      { mediaId, eventId, userId, score },
      "Media verified — Kafka event published"
    )
  }
}