// services/media-service/src/grpc/handlers.ts
// gRPC method implementations.
// These are called by the gRPC server when a client sends a request.
//
// NOTE ON TYPES:
// @grpc/proto-loader dynamically loads .proto files at runtime.
// It does not generate TypeScript types automatically.
// We use the TypeScript mirrors from packages/shared-types/src/grpc/media.types.ts
// which we maintain manually to match the .proto file.
//
// In production with a larger team, you would use:
//   protoc --plugin=ts-proto → generates TypeScript from .proto at build time
// This step uses runtime loading for simplicity.

import type {
  GetVerificationStatusRequest,
  GetVerificationStatusResponse,
  BatchVerificationStatusRequest,
  BatchVerificationStatusResponse,
  TriggerVerificationRequest,
  TriggerVerificationResponse,
} from "@cleannation/shared-types"
import { createLogger } from "@cleannation/shared-utils"
import { MediaRepository } from "../repositories/media.repository"

const logger = createLogger("media-service")
const mediaRepo = new MediaRepository()

// Maps Prisma enum to Proto enum integer
function toProtoStatus(
  status: string
): number {
  const map: Record<string, number> = {
    PENDING: 1,
    PROCESSING: 2,
    VERIFIED: 3,
    REJECTED: 4,
    MANUAL_REVIEW: 5,
  }
  return map[status] ?? 0
}

// gRPC handler: GetVerificationStatus
// Called by event-service when loading event detail page
export async function getVerificationStatus(
  call: {
    request: GetVerificationStatusRequest
  },
  callback: (
    error: null | Error,
    response?: GetVerificationStatusResponse
  ) => void
): Promise<void> {
  const { mediaId } = call.request

  try {
    const asset = await mediaRepo.findById(mediaId)

    if (asset === null) {
      callback(new Error(`Media asset not found: ${mediaId}`))
      return
    }

    // Note: error_message is not included in the current shared-types definition.
    // If needed, extend the type or use a cast.
    const response: GetVerificationStatusResponse = {
      mediaId: asset.id,
      status: toProtoStatus(asset.verificationStatus) as never,
      score: asset.verificationScore ?? 0,
      processedAt: asset.verifiedAt?.toISOString() ?? "",
      // error_message is omitted until type is fixed
    }

    logger.info(
      { mediaId, status: asset.verificationStatus },
      "gRPC: GetVerificationStatus"
    )

    callback(null, response)
  } catch (error: unknown) {
    logger.error(
      {
        mediaId,
        error: error instanceof Error ? error.message : "unknown",
      },
      "gRPC: GetVerificationStatus failed"
    )
    callback(
      error instanceof Error ? error : new Error("Internal gRPC error")
    )
  }
}

// gRPC handler: BatchGetVerificationStatus
// The key performance optimization — N statuses in 1 gRPC call
// instead of N individual REST calls
export async function batchGetVerificationStatus(
  call: {
    request: BatchVerificationStatusRequest
  },
  callback: (
    error: null | Error,
    response?: BatchVerificationStatusResponse
  ) => void
): Promise<void> {
  const { mediaIds } = call.request

  // Enforce batch size limit — prevents unbounded queries
  if (mediaIds.length > 100) {
    callback(new Error("Batch size exceeds maximum of 100"))
    return
  }

  try {
    const assets = await mediaRepo.findManyByIds(mediaIds)

    // Build a map for O(1) lookup by ID
    const assetMap = new Map(assets.map((a) => [a.id, a]))

    const results: GetVerificationStatusResponse[] = mediaIds.map(
      (mediaId: string) => {
        const asset = assetMap.get(mediaId)

        if (asset === undefined) {
          // Return UNSPECIFIED for missing assets — do not error the whole batch
          return {
            mediaId,
            status: 0 as never,  // VERIFICATION_STATUS_UNSPECIFIED
            score: 0,
            processedAt: "",
          }
        }

        return {
          mediaId: asset.id,
          status: toProtoStatus(asset.verificationStatus) as never,
          score: asset.verificationScore ?? 0,
          processedAt: asset.verifiedAt?.toISOString() ?? "",
        }
      }
    )

    logger.info(
      { batchSize: mediaIds.length },
      "gRPC: BatchGetVerificationStatus"
    )

    callback(null, { results })
  } catch (error: unknown) {
    logger.error(
      { error: error instanceof Error ? error.message : "unknown" },
      "gRPC: BatchGetVerificationStatus failed"
    )
    callback(
      error instanceof Error ? error : new Error("Internal gRPC error")
    )
  }
}

// gRPC handler: TriggerVerification
// Called by event-service after upload confirmation
// to prioritize processing for Pro/Enterprise tier events
export async function triggerVerification(
  call: {
    request: TriggerVerificationRequest
  },
  callback: (
    error: null | Error,
    response?: TriggerVerificationResponse
  ) => void
): Promise<void> {
  const { mediaId, priority } = call.request

  try {
    const asset = await mediaRepo.findById(mediaId)

    if (asset === null) {
      callback(new Error(`Media asset not found: ${mediaId}`))
      return
    }

    // For PENDING assets, reset status to PENDING to re-queue
    // For assets already being processed, return current status
    if (
      asset.verificationStatus !== "PENDING" &&
      asset.verificationStatus !== "REJECTED"
    ) {
      callback(null, {
        queued: false,
        estimatedProcessingMs: 0,
      })
      return
    }

    await mediaRepo.updateVerificationStatus(
      mediaId,
      "PENDING",
      null,
      null,
      "1.0.0"
    )

    // priority is a string enum: "normal" or "high" (lowercase)
    const estimatedMs = priority === "high" ? 5_000 : 30_000

    logger.info(
      { mediaId, priority },
      "gRPC: TriggerVerification — queued"
    )

    callback(null, {
      queued: true,
      estimatedProcessingMs: estimatedMs,
    })
  } catch (error: unknown) {
    callback(
      error instanceof Error ? error : new Error("Internal gRPC error")
    )
  }
}