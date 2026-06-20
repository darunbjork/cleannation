import { createLogger } from "@cleannation/shared-utils"
import { MediaRepository } from "../repositories/media.repository"
import { config } from "../config/index"

const logger = createLogger("media-service")
const mediaRepo = new MediaRepository()

export interface VerificationResult {
  score: number          // 0.0 - 1.0
  status: "VERIFIED" | "REJECTED" | "MANUAL_REVIEW"
  notes: string
}

// Main pipeline entry point
// Called by the polling job in src/index.ts every 30 seconds
export async function processPendingMedia(): Promise<void> {
  const pending = await mediaRepo.findPendingVerification(5)

  if (pending.length === 0) return

  logger.info(
    { count: pending.length },
    "Processing pending media verification"
  )

  // Process concurrently — each verification is independent
  // Limit concurrency to 5 to avoid Sharp memory spikes
  await Promise.allSettled(
    pending.map((asset) => processAsset(asset.id, asset.storageKey))
  )
}

async function processAsset(
  mediaId: string,
  storageKey: string
): Promise<void> {
  // Mark as PROCESSING immediately — prevents other instances
  // from picking up the same asset if running multiple processors
  await mediaRepo.updateVerificationStatus(
    mediaId,
    "PROCESSING",
    null,
    null,
    config.verification.pipelineVersion
  )

  try {
    const result = await analyzeImage(storageKey)

    await mediaRepo.updateVerificationStatus(
      mediaId,
      result.status,
      result.score,
      result.notes,
      config.verification.pipelineVersion
    )

    logger.info(
      {
        mediaId,
        status: result.status,
        score: result.score,
        notes: result.notes,
      },
      "Media verification complete"
    )

  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown pipeline error"

    logger.error(
      { mediaId, storageKey, error: errorMessage },
      "Media verification failed"
    )

    await mediaRepo.updateVerificationStatus(
      mediaId,
      "MANUAL_REVIEW",
      null,
      `Pipeline error: ${errorMessage}`,
      config.verification.pipelineVersion
    )
  }
}

// Heuristic image analysis using Sharp
// In production: replace this with Vision API call
async function analyzeImage(
  storageKey: string
): Promise<VerificationResult> {
  const { default: sharp } = await import("sharp")
  const aws = await import("@aws-sdk/client-s3")

  const s3 = new aws.S3Client({
    region: "auto",
    endpoint: config.r2.endpoint,
    credentials: {
      accessKeyId: config.r2.accessKeyId,
      secretAccessKey: config.r2.secretAccessKey,
    },
  })

  // Fetch image from R2
  const command = new aws.GetObjectCommand({
    Bucket: config.r2.bucketName,
    Key: storageKey,
  })

const response = await (s3 as any).send(command)
  const buffer = Buffer.from(
    await response.Body!.transformToByteArray()
  )

  // Analyze with Sharp
  const image = sharp(buffer)
  const metadata = await image.metadata()

  // Rule 1: Minimum resolution — photos must be at least 400x400px
  // Rejects test uploads (1x1 pixel) and accidental uploads
  if (
    (metadata.width ?? 0) < 400 ||
    (metadata.height ?? 0) < 400
  ) {
    return {
      score: 0.1,
      status: "REJECTED",
      notes: `Image too small: ${metadata.width}x${metadata.height}px. Minimum 400x400px required.`,
    }
  }

  // Rule 2: Detect predominantly black/dark images
  // (camera covered, very dark conditions)
  const { dominant } = await image
    .resize(50, 50, { fit: "cover" })  // Downsample for analysis speed
    .toColorspace("srgb")
    .stats()

  const brightness =
    (dominant.r + dominant.g + dominant.b) / 3

  if (brightness < 15) {
    return {
      score: 0.1,
      status: "REJECTED",
      notes: "Image is too dark. Please retake in better lighting conditions.",
    }
  }

  // Rule 3: Detect blurry images using Laplacian variance
  // Sharp does not expose Laplacian directly, but we can approximate:
  // Compare a sharpened version's difference to detect edges
  const [originalStats, sharpenedStats] = await Promise.all([
    image.clone().greyscale().stats(),
    image.clone().greyscale().sharpen({ sigma: 3 }).stats(),
  ])

  // Sharp provides standard deviation directly as 'stdev' on each channel
  const origChannel = originalStats.channels[0]
  const sharpChannel = sharpenedStats.channels[0]
  const originalVariance = origChannel?.stdev ?? 0
  const sharpenedVariance = sharpChannel?.stdev ?? 0

  const blurScore = originalVariance / Math.max(sharpenedVariance, 1)

  if (blurScore < 0.3) {
    return {
      score: 0.3,
      status: "MANUAL_REVIEW",
      notes: "Image appears blurry. Manual review requested.",
    }
  }

  // Rule 4: Check for outdoor/nature content heuristic
  // Green channel dominance suggests outdoor/natural environment
  // (grass, trees, bushes — typical cleanup locations)
  const greenDominance = dominant.g / Math.max(dominant.r, dominant.b, 1)

  // Score calculation:
  // Base: 0.6 (passes basic checks)
  // + greenDominance bonus: outdoor photo evidence
  // + brightness bonus: well-lit photo
  // + resolution bonus: high-quality photo
  const resolutionScore = Math.min(
    ((metadata.width ?? 400) * (metadata.height ?? 400)) /
    (4000 * 4000),
    0.1
  )

  const finalScore = Math.min(
    0.6 +
    Math.min(greenDominance * 0.15, 0.15) +
    Math.min(brightness / 255 * 0.1, 0.1) +
    resolutionScore,
    1.0
  )

  if (finalScore >= config.verification.verifiedThreshold) {
    return {
      score: finalScore,
      status: "VERIFIED",
      notes: `Automated verification passed. Score: ${finalScore.toFixed(2)}`,
    }
  }

  if (finalScore >= config.verification.manualReviewThreshold) {
    return {
      score: finalScore,
      status: "MANUAL_REVIEW",
      notes: `Score below verification threshold. Manual review requested. Score: ${finalScore.toFixed(2)}`,
    }
  }

  return {
    score: finalScore,
    status: "REJECTED",
    notes: `Image did not meet verification requirements. Score: ${finalScore.toFixed(2)}`,
  }
}