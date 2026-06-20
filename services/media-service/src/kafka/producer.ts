// services/media-service/src/kafka/producer.ts
// Publishes media.verified and media.rejected events
// after the verification pipeline completes.

import { Kafka, type Producer, CompressionTypes } from "kafkajs"
import { createLogger } from "@cleannation/shared-utils"
import {
  KAFKA_TOPICS,
  type KafkaEventEnvelope,
  type MediaVerifiedPayload,
} from "@cleannation/shared-types"
import { config } from "../config/index"

const logger = createLogger("media-service")
const kafka = new Kafka({
  clientId: config.kafka.clientId,
  brokers: config.kafka.brokers,
})

let producer: Producer | null = null

export async function connectProducer(): Promise<void> {
  producer = kafka.producer({ allowAutoTopicCreation: true })
  await producer.connect()
  logger.info("Kafka producer connected")
}

export async function disconnectProducer(): Promise<void> {
  if (producer !== null) await producer.disconnect()
}

export async function publishMediaVerified(
  data: MediaVerifiedPayload
): Promise<void> {
  if (producer === null) return

  const envelope: KafkaEventEnvelope<MediaVerifiedPayload> = {
    eventId: crypto.randomUUID(),
    topic: KAFKA_TOPICS.MEDIA_VERIFIED,
    version: "1.0",
    occurredAt: new Date().toISOString(),
    payload: data,
  }

  await producer.send({
    topic: KAFKA_TOPICS.MEDIA_VERIFIED,
    compression: CompressionTypes.GZIP,
    messages: [
      {
        key: data.eventId,
        value: JSON.stringify(envelope),
      },
    ],
  })

  logger.info(
    { mediaId: data.mediaId, eventId: data.eventId },
    "Published media.verified"
  )
}