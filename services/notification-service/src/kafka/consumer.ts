import { Kafka, type Consumer, type EachMessagePayload } from "kafkajs"
import { createLogger, logKafkaEvent } from "@cleannation/shared-utils"
import {
  KAFKA_TOPICS,
  type KafkaEventEnvelope,
  type UserRegisteredPayload,
  type EventJoinedPayload,
  type EventCompletedPayload,
  type BadgeEarnedPayload,
} from "@cleannation/shared-types"
import { config } from "../config/index"
import { NotificationRepository } from "../repositories/notification.repository"
import { publishToDlq } from "./dlq.producer"
import { handleUserRegistered } from "./handlers/user.handler"
import {
  handleEventJoined,
  handleEventCompleted,
} from "./handlers/event.handler"
import { handleBadgeEarned } from "./handlers/gamification.handler"

const logger = createLogger("notification-service")
const notifRepo = new NotificationRepository()

const kafka = new Kafka({
  clientId: config.kafka.clientId,
  brokers: config.kafka.brokers,
  retry: { initialRetryTime: 300, retries: 10 },
})

let consumer: Consumer | null = null

// Exponential backoff sleep
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Process a single message with retry + DLQ fallback
async function processWithRetry(
  topic: string,
  envelope: KafkaEventEnvelope<unknown>
): Promise<void> {
  const { eventId: kafkaEventId, payload } = envelope

  // ── STEP 1: IDEMPOTENCY CHECK ──────────────────────────────────────
  const existing = await notifRepo.findByKafkaEventId(kafkaEventId)
  if (existing !== null) {
    logger.info(
      { kafkaEventId, topic, status: existing.status },
      "Message already processed — skipping (idempotency)"
    )
    return
  }

  // ── STEP 2: ROUTE TO HANDLER ────────────────────────────────────────
  type Handler = () => Promise<void>

  const getHandler = (): Handler | null => {
    switch (topic) {
      case KAFKA_TOPICS.USER_REGISTERED:
        return () =>
          handleUserRegistered(
            kafkaEventId,
            topic,
            payload as UserRegisteredPayload
          )
      case KAFKA_TOPICS.EVENT_JOINED:
        return () =>
          handleEventJoined(
            kafkaEventId,
            topic,
            payload as EventJoinedPayload
          )
      case KAFKA_TOPICS.EVENT_COMPLETED:
        return () =>
          handleEventCompleted(
            kafkaEventId,
            topic,
            payload as EventCompletedPayload
          )
      case KAFKA_TOPICS.BADGE_EARNED:
        return () =>
          handleBadgeEarned(
            kafkaEventId,
            topic,
            payload as BadgeEarnedPayload
          )
      default:
        return null
    }
  }

  const handler = getHandler()

  if (handler === null) {
    logger.warn({ topic, kafkaEventId }, "No handler for topic — skipping")
    return
  }

  // ── STEP 3: RETRY WITH EXPONENTIAL BACKOFF ─────────────────────────
  let attempt = 0
  let lastError: Error | null = null

  while (attempt < config.kafka.maxRetries) {
    try {
      await handler()

      logKafkaEvent(logger, {
        kafkaTopic: topic,
        action: "consumed",
        durationMs: 0,
      })

      return  // Success — exit retry loop
    } catch (error: unknown) {
      lastError =
        error instanceof Error ? error : new Error("Unknown error")
      attempt++

      if (attempt < config.kafka.maxRetries) {
        const delayMs =
          config.kafka.retryBaseDelayMs * Math.pow(2, attempt - 1)

        logger.warn(
          {
            kafkaEventId,
            topic,
            attempt,
            maxRetries: config.kafka.maxRetries,
            retryAfterMs: delayMs,
            error: lastError.message,
          },
          "Message processing failed — retrying"
        )

        await sleep(delayMs)
      }
    }
  }

  // ── STEP 4: DLQ — all retries exhausted ───────────────────────────
  const errorMessage =
    lastError?.message ?? "Unknown error after all retries"

  logger.error(
    {
      kafkaEventId,
      topic,
      attempt,
      errorMessage,
    },
    "Message moved to DLQ after max retries"
  )

  await publishToDlq({
    originalTopic: topic,
    originalEventId: kafkaEventId,
    originalPayload: payload,
    errorMessage,
    attemptCount: attempt,
    failedAt: new Date().toISOString(),
  })
}

export async function startConsumer(): Promise<void> {
  consumer = kafka.consumer({
    groupId: config.kafka.groupId,
    heartbeatInterval: 3000,
    sessionTimeout: 30000,
  })

  await consumer.connect()

  await consumer.subscribe({
    topics: [
      KAFKA_TOPICS.USER_REGISTERED,
      KAFKA_TOPICS.EVENT_JOINED,
      KAFKA_TOPICS.EVENT_CANCELLED,
      KAFKA_TOPICS.EVENT_COMPLETED,
      KAFKA_TOPICS.BADGE_EARNED,
    ],
    fromBeginning: false,
  })

  await consumer.run({
    autoCommit: false,

    // ── eachMessage with explicit types ──────────────────────────────
    eachMessage: async ({
      topic,
      partition,
      message,
      heartbeat,
    }: EachMessagePayload): Promise<void> => {
      if (message.value === null) {
        logger.warn({ topic, partition }, "Null message value — skipping")
        return
      }

      let envelope: KafkaEventEnvelope<unknown>

      try {
        envelope = JSON.parse(
          message.value.toString()
        ) as KafkaEventEnvelope<unknown>
      } catch {
        logger.error(
          { topic, partition },
          "Failed to parse Kafka message — skipping malformed message"
        )
        await consumer?.commitOffsets([
          {
            topic,
            partition,
            offset: (BigInt(message.offset) + 1n).toString(),
          },
        ])
        return
      }

      await heartbeat()

      await processWithRetry(topic, envelope)

      await consumer?.commitOffsets([
        {
          topic,
          partition,
          offset: (BigInt(message.offset) + 1n).toString(),
        },
      ])
    },
  })

  logger.info("notification-service Kafka consumer started")
}

export async function stopConsumer(): Promise<void> {
  if (consumer !== null) {
    await consumer.stop()
    await consumer.disconnect()
    logger.info("notification-service consumer stopped")
  }
}