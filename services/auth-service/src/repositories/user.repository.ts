import type { User } from "@prisma/client"
import { prisma } from "../db/prisma"

export class UserRepository {

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    })
  }

  async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { username: username.toLowerCase().trim() },
    })
  }

  // Counts ALL users — used to determine if first user gets platform_admin
  async countAll(): Promise<number> {
    return prisma.user.count()
  }

  async create(data: {
    email: string
    username: string
    displayName: string
    passwordHash: string
    role: "VOLUNTEER" | "ORGANIZER" | "ORG_ADMIN" | "PLATFORM_ADMIN"
    organizationId?: string
  }): Promise<User> {
    return prisma.user.create({
      data: {
        email: data.email.toLowerCase().trim(),
        username: data.username.toLowerCase().trim(),
        displayName: data.displayName,
        passwordHash: data.passwordHash,
        role: data.role,
        organizationId: data.organizationId ?? null,
      },
    })
  }

  async updatePasswordHash(
    userId: string,
    newHash: string
  ): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newHash, updatedAt: new Date() },
    })
  }

  async ban(userId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { isBanned: true, updatedAt: new Date() },
    })
  }
}
