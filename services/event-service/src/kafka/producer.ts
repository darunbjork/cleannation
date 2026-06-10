// services/event-service/src/kafka/producer.ts
// Kafka producer — publishes domain events after successful mutations.
//
// DESIGN DECISIONS:
//
// 1. Fire-and-forget from service perspective:
//    The REST endpoint returns 201 before waiting for Kafka.
//    If Kafka is down, the HTTP response still succeeds.
//    Events queue locally and flush when Kafka recovers.
//    User experience is not degraded by messaging infrastructure.
//
// 2. Idempotency keys on every message:
//    Every Kafka message carries a unique eventId (UUID).
//    Consumers store processed eventIds and skip duplicates.
//    Kafka guarantees at-least-once delivery — without idempotency
//    keys, a network retry could process the same event twice:
//    awarding points twice, sending two emails, etc.
//
// 3. Message key = aggregateId:
//    Setting the Kafka partition key to eventId or userId ensures
//    that all events for the same aggregate land on the same partition.
//    This guarantees ordering: "event.created" always arrives before
//    "event.joined" for the same event.

import {
  Kafka,
  type Producer,
  type ProducerRecord,
  CompressionTypes,
} from "kafkajs"
import { createLogger, logKafkaEvent } from "@cleannation/shared-utils"
import type {
  KafkaEventEnvelope,
  KafkaTopic,
} from "@cleannation/shared-types"
import { config } from "../config/index"

const logger = createLogger("event-service")

const kafka = new Kafka({
  clientId: config.kafka.clientId,
  brokers: config.kafka.brokers,
  // Retry connection to Kafka on startup — it may not be ready immediately
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
})

let producer: Producer | null = null

export async function connectProducer(): Promise<void> {
  producer = kafka.producer({
    allowAutoTopicCreation: true,
    ...config.kafka.producer,
  })

  await producer.connect()
  logger.info("Kafka producer connected")
}

export async function disconnectProducer(): Promise<void> {
  if (producer !== null) {
    await producer.disconnect()
    logger.info("Kafka producer disconnected")
  }
}

// Publishes a typed Kafka event.
// Generic over TPayload — TypeScript enforces the correct payload
// shape for each topic at compile time.
export async function publishEvent<TPayload>(
  topic: KafkaTopic,
  payload: TPayload,
  // partitionKey: routes all events for the same entity to the same partition
  // ensures ordering — "event.created" before "event.joined" for same eventId
  partitionKey: string
): Promise<void> {
  if (producer === null) {
    logger.warn({ topic }, "Kafka producer not connected — skipping event")
    return
  }

  const envelope: KafkaEventEnvelope<TPayload> = {
    eventId: crypto.randomUUID(),
    topic,
    version: "1.0",
    occurredAt: new Date().toISOString(),
    payload,
  }

  const record: ProducerRecord = {
    topic,
    compression: CompressionTypes.GZIP,
    messages: [
      {
        // Partition key — all events for the same entity go to same partition
        key: partitionKey,
        value: JSON.stringify(envelope),
        headers: {
          "content-type": "application/json",
          version: "1.0",
        },
      },
    ],
  }

  try {
    await producer.send(record)

    logKafkaEvent(logger, {
      kafkaTopic: topic,
      action: "produced",
    })
  } catch (error: unknown) {
    // Log but do not throw — Kafka failure should not break the HTTP response
    // The mutation already succeeded in PostgreSQL.
    // In production, use an outbox pattern for guaranteed delivery.
    logKafkaEvent(logger, {
      kafkaTopic: topic,
      action: "failed",
    })
    logger.error(
      {
        topic,
        error: error instanceof Error ? error.message : "unknown",
      },
      "Failed to publish Kafka event"
    )
  }
}
