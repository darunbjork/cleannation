import type { RefreshToken } from "@prisma/client"
import { prisma } from "../db/prisma"

export class RefreshTokenRepository {

  async create(data: {
    userId: string
    tokenHash: string
    jti: string
    expiresAt: Date
    userAgent?: string
    ipAddress?: string
  }): Promise<RefreshToken> {
    return prisma.refreshToken.create({
      data: {
        userId: data.userId,
        tokenHash: data.tokenHash,
        jti: data.jti,
        expiresAt: data.expiresAt,
        userAgent: data.userAgent ?? null,
        ipAddress: data.ipAddress ?? null,
      },
    })
  }

  async findByTokenHash(
    tokenHash: string
  ): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({
      where: { tokenHash },
    })
  }

  // Revokes a single token — called during rotation
  async revoke(id: string): Promise<void> {
    await prisma.refreshToken.update({
      where: { id },
      data: { revokedAt: new Date() },
    })
  }

  // Revokes ALL tokens for a user — called on password change or ban
  async revokeAllForUser(userId: string): Promise<number> {
    const result = await prisma.refreshToken.updateMany({
      where: {
        userId,
        revokedAt: null,
      },
      data: { revokedAt: new Date() },
    })
    return result.count
  }

  // Cleanup expired tokens — run as a scheduled job
  async deleteExpired(): Promise<number> {
    const result = await prisma.refreshToken.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    })
    return result.count
  }
}
