// services/location-service/src/kafka/consumer.ts
// Kafka consumer — listens for event.created to auto-create
// a tracking zone when an organizer creates a cleanup event.

import { Kafka, type Consumer } from "kafkajs"
import { createLogger, logKafkaEvent } from "@cleannation/shared-utils"
import {
  KAFKA_TOPICS,
  type KafkaEventEnvelope,
  type EventCreatedPayload,
} from "@cleannation/shared-types"
import { config } from "../config/index"
import { ZoneService } from "../services/zone.service"

const logger = createLogger("location-service")
const zoneService = new ZoneService()

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
    topics: [KAFKA_TOPICS.EVENT_CREATED],
    fromBeginning: false,
  })

  await consumer.run({
    // eachMessage: processes one message at a time.
    // For location-service, ordering matters — process sequentially.
    eachMessage: async ({ topic, message }: { topic: string, message: any }) => {
      if (message.value === null) return

      try {
        const envelope = JSON.parse(
          message.value.toString()
        ) as KafkaEventEnvelope<EventCreatedPayload>

        logKafkaEvent(logger, {
          kafkaTopic: topic,
          action: "consumed",
        })

        if (topic === KAFKA_TOPICS.EVENT_CREATED) {
          await handleEventCreated(envelope.payload)
        }
      } catch (error: unknown) {
        logger.error(
          {
            topic,
            error: error instanceof Error ? error.message : "unknown",
          },
          "Failed to process Kafka message"
        )
      }
    },
  })

  logger.info("Location service Kafka consumer started")
}

export async function stopConsumer(): Promise<void> {
  if (consumer !== null) {
    await consumer.disconnect()
  }
}

async function handleEventCreated(
  payload: EventCreatedPayload
): Promise<void> {
  logger.info(
    { eventId: payload.eventId, locationId: payload.locationId },
    "Processing event.created — verifying zone"
  )

  try {
    await zoneService.getById(payload.locationId)
    logger.info(
      { eventId: payload.eventId, locationId: payload.locationId },
      "Zone verified for event"
    )
  } catch {
    logger.warn(
      { eventId: payload.eventId, locationId: payload.locationId },
      "Zone not found for event — organizer must create zone first"
    )
  }
}
