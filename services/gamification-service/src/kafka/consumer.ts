// services/gamification-service/src/kafka/consumer.ts

import { Kafka, type Consumer } from "kafkajs"
import { createLogger } from "@cleannation/shared-utils"
import {
  KAFKA_TOPICS,
  type KafkaEventEnvelope,
  type EventCompletedPayload,
  type MediaVerifiedPayload,
} from "@cleannation/shared-types"
import { config } from "../config/index"
import { handleEventCompleted } from "./handlers/event.handler"
import { handleMediaVerified } from "./handlers/media.handler"

const logger = createLogger("gamification-service")

const kafka = new Kafka({
  clientId: config.kafka.clientId,
  brokers: config.kafka.brokers,
  retry: { initialRetryTime: 300, retries: 10 },
})

let consumer: Consumer | null = null

export async function startConsumer(): Promise<void> {
  consumer = kafka.consumer({ groupId: config.kafka.groupId })

  await consumer.connect()
  await consumer.subscribe({
    topics: [KAFKA_TOPICS.EVENT_COMPLETED, KAFKA_TOPICS.MEDIA_VERIFIED],
    fromBeginning: false,
  })

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message, heartbeat }) => {
      if (message.value === null) return

      let envelope: KafkaEventEnvelope<unknown>
      try {
        envelope = JSON.parse(
          message.value.toString()
        ) as KafkaEventEnvelope<unknown>
      } catch {
        logger.error({ topic }, "Failed to parse Kafka message")
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

      try {
        switch (topic) {
          case KAFKA_TOPICS.EVENT_COMPLETED:
            await handleEventCompleted(
              envelope.payload as EventCompletedPayload
            )
            break
          case KAFKA_TOPICS.MEDIA_VERIFIED:
            await handleMediaVerified(
              envelope.payload as MediaVerifiedPayload
            )
            break
        }
      } catch (error: unknown) {
        logger.error(
          {
            topic,
            eventId: envelope.eventId,
            error:
              error instanceof Error ? error.message : "unknown",
          },
          "Gamification event processing failed"
        )
        // Continue — do not block pipeline on gamification failures
      }

      await consumer?.commitOffsets([
        {
          topic,
          partition,
          offset: (BigInt(message.offset) + 1n).toString(),
        },
      ])
    },
  })

  logger.info("Gamification Kafka consumer started")
}

export async function stopConsumer(): Promise<void> {
  if (consumer !== null) {
    await consumer.stop()
    await consumer.disconnect()
  }
}