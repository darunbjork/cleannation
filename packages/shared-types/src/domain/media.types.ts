export type MediaType = "before_photo" | "after_photo" | "progress_photo"

export type VerificationStatus =
  | "pending"
  | "processing"
  | "verified"
  | "rejected"
  | "manual_review"

export interface MediaAsset {
  id: string
  eventId: string
  userId: string
  type: MediaType
  storageKey: string
  publicUrl: string
  thumbnailUrl: string | null
  verificationStatus: VerificationStatus
  verificationScore: number | null
  verificationNotes: string | null
  fileSizeBytes: number
  mimeType: "image/jpeg" | "image/png" | "image/webp"
  width: number
  height: number
  uploadedAt: string
  verifiedAt: string | null
}

export interface UploadPresignedUrl {
  uploadUrl: string
  mediaId: string
  expiresAt: string
  maxFileSizeBytes: number
}
