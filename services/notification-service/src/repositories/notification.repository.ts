// services/notification-service/src/repositories/notification.repository.ts
// Handles idempotency checks and notification audit logging.
//
// THE IDEMPOTENCY CONTRACT:
// Before processing any Kafka message, call findByKafkaEventId.
// If it returns a record, the message was already processed.
// Skip processing and commit the offset.
// This makes the entire consumer safe to replay from any offset.

import type {
  NotificationStatus,
  NotificationType,
  NotificationChannel,
} from "../generated/prisma"

import { prisma } from "../db/prisma"

export class NotificationRepository {

  // Check idempotency — was this Kafka event already processed?
  async findByKafkaEventId(
    kafkaEventId: string
  ): Promise<{ id: string; status: NotificationStatus } | null> {
    return prisma.notificationLog.findUnique({
      where: { kafkaEventId },
      select: { id: true, status: true },
    })
  }

  async createLog(data: {
    kafkaEventId: string
    kafkaTopic: string
    userId: string
    type: NotificationType
    channel: NotificationChannel
    recipient: string
    subject?: string
    bodyPreview?: string
  }) {
    return prisma.notificationLog.create({
      data: {
        kafkaEventId: data.kafkaEventId,
        kafkaTopic: data.kafkaTopic,
        userId: data.userId,
        type: data.type,
        channel: data.channel,
        recipient: data.recipient,
        subject: data.subject ?? null,
        bodyPreview: data.bodyPreview?.slice(0, 500) ?? null,
        status: "PENDING",
        attemptCount: 0,
      },
    })
  }

  async markSent(id: string): Promise<void> {
    await prisma.notificationLog.update({
      where: { id },
      data: {
        status: "SENT",
        sentAt: new Date(),
        updatedAt: new Date(),
      },
    })
  }

  async markFailed(
    id: string,
    errorMessage: string,
    attemptCount: number
  ): Promise<void> {
    await prisma.notificationLog.update({
      where: { id },
      data: {
        status: "FAILED",
        errorMessage: errorMessage.slice(0, 500),
        attemptCount,
        updatedAt: new Date(),
      },
    })
  }

  async markDlq(
    id: string,
    errorMessage: string,
    attemptCount: number
  ): Promise<void> {
    await prisma.notificationLog.update({
      where: { id },
      data: {
        status: "DLQ",
        errorMessage: errorMessage.slice(0, 500),
        attemptCount,
        updatedAt: new Date(),
      },
    })
  }

  async markSkipped(id: string): Promise<void> {
    await prisma.notificationLog.update({
      where: { id },
      data: { status: "SKIPPED", updatedAt: new Date() },
    })
  }

  async incrementAttempt(id: string): Promise<number> {
    const updated = await prisma.notificationLog.update({
      where: { id },
      data: {
        attemptCount: { increment: 1 },
        updatedAt: new Date(),
      },
      select: { attemptCount: true },
    })
    return updated.attemptCount
  }

  // Find push subscription for a user
  async findPushSubscription(userId: string) {
    return prisma.pushSubscription.findUnique({
      where: { userId },
    })
  }

  async upsertPushSubscription(data: {
    userId: string
    endpoint: string
    p256dhKey: string
    authKey: string
    userAgent?: string
  }) {
    return prisma.pushSubscription.upsert({
      where: { userId: data.userId },
      create: {
        userId: data.userId,
        endpoint: data.endpoint,
        p256dhKey: data.p256dhKey,
        authKey: data.authKey,
        userAgent: data.userAgent ?? null,
      },
      update: {
        endpoint: data.endpoint,
        p256dhKey: data.p256dhKey,
        authKey: data.authKey,
        userAgent: data.userAgent ?? null,
        updatedAt: new Date(),
      },
    })
  }

  // Remove push subscription — called when push returns 410 Gone
  // (user revoked browser push permission)
  async deletePushSubscription(userId: string): Promise<void> {
    await prisma.pushSubscription.deleteMany({
      where: { userId },
    })
  }
}