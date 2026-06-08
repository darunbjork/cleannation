export interface GetVerificationStatusRequest {
  mediaId: string
}

export interface GetVerificationStatusResponse {
  mediaId: string
  status: "pending" | "processing" | "verified" | "rejected" | "manual_review"
  score: number
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
  priority: "normal" | "high"
}

export interface TriggerVerificationResponse {
  queued: boolean
  estimatedProcessingMs: number
}
