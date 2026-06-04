// packages/shared-types/src/domain/media.types.ts
// Photo upload and AI verification types.
// media-service owns these records.

export type MediaType = "before_photo" | "after_photo" | "progress_photo"

export type VerificationStatus =
  | "pending"     // uploaded, queued for AI analysis
  | "processing"  // AI pipeline running
  | "verified"    // AI confirmed cleanup visible
  | "rejected"    // AI found no cleanup evidence
  | "manual_review" // AI uncertain — human moderator needed

export interface MediaAsset {
  id: string
  eventId: string
  userId: string
  type: MediaType
  storageKey: string        // R2/S3 object key — never expose directly
  publicUrl: string         // CDN URL for display
  thumbnailUrl: string | null
  verificationStatus: VerificationStatus
  verificationScore: number | null   // 0–1 confidence from AI
  verificationNotes: string | null
  fileSizeBytes: number
  mimeType: "image/jpeg" | "image/png" | "image/webp"
  width: number
  height: number
  uploadedAt: string
  verifiedAt: string | null
}

// Presigned URL for direct client-to-R2 upload
// Client uploads directly to R2 — never through our API server
// This keeps media bandwidth off our compute costs
export interface UploadPresignedUrl {
  uploadUrl: string       // R2 presigned POST URL
  mediaId: string         // pre-assigned ID — client sends back after upload
  expiresAt: string       // presigned URL expiry
  maxFileSizeBytes: number
}
