// services/media-service/src/repositories/media.repository.ts

 import type { MediaAsset, VerificationStatus, MediaType } from "../generated/prisma"
import { prisma } from "../db/prisma"

export class MediaRepository {

  async findById(id: string): Promise<MediaAsset | null> {
    return prisma.mediaAsset.findUnique({ where: { id } })
  }

  async findManyByIds(ids: string[]): Promise<MediaAsset[]> {
    if (ids.length === 0) return []
    return prisma.mediaAsset.findMany({
      where: { id: { in: ids } },
    })
  }

  async findByEvent(eventId: string): Promise<MediaAsset[]> {
    return prisma.mediaAsset.findMany({
      where: { eventId },
      orderBy: { uploadedAt: "asc" },
    })
  }

  async findPendingVerification(limit = 10): Promise<MediaAsset[]> {
    return prisma.mediaAsset.findMany({
      where: { verificationStatus: "PENDING" },
      orderBy: { uploadedAt: "asc" },
      take: limit,
    })
  }

  async create(data: {
    eventId: string
    userId: string
    type: MediaType
    storageKey: string
    fileSizeBytes: number
    mimeType: string
    width: number
    height: number
  }): Promise<MediaAsset> {
    return prisma.mediaAsset.create({ data })
  }

  async updateVerificationStatus(
    id: string,
    status: VerificationStatus,
    score: number | null,
    notes: string | null,
    pipelineVersion: string
  ): Promise<MediaAsset> {
    return prisma.mediaAsset.update({
      where: { id },
      data: {
        verificationStatus: status,
        verificationScore: score,
        verificationNotes: notes,
        pipelineVersion,
        verifiedAt: status === "VERIFIED" ? new Date() : null,
        updatedAt: new Date(),
      },
    })
  }

  async countByEventAndStatus(
    eventId: string,
    status: VerificationStatus
  ): Promise<number> {
    return prisma.mediaAsset.count({
      where: { eventId, verificationStatus: status },
    })
  }
}