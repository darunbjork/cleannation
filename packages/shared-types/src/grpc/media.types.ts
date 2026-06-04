// packages/shared-types/src/grpc/media.types.ts
// TypeScript mirrors of Protobuf message types for media-service gRPC.
// These match packages/proto/media.proto exactly.
// When the .proto changes, update this file — CI will catch any mismatch.

export interface GetVerificationStatusRequest {
  mediaId: string
}

export interface GetVerificationStatusResponse {
  mediaId: string
  status: "pending" | "processing" | "verified" | "rejected" | "manual_review"
  score: number    // 0.0 – 1.0
  processedAt: string | null
}

export interface BatchVerificationStatusRequest {
  mediaIds: string[]
}

export interface BatchVerificationStatusResponse {
  results: GetVerificationStatusResponse[]
}

export interface TriggerVerificationRequest {
  mediaId: string
  eventId: string
  priority: "normal" | "high"  // high = organizer paid tier
}

export interface TriggerVerificationResponse {
  queued: boolean
  estimatedProcessingMs: number
}
