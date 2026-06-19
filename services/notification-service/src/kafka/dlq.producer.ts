import {
  Kafka,
  type Producer,
  CompressionTypes,
} from "kafkajs"
import { createLogger } from "@cleannation/shared-utils"
import { config } from "../config/index"

const DLQ_TOPIC = "notifications.dead-letter"

const logger = createLogger("notification-service")

const kafka = new Kafka({
  clientId: `${config.kafka.clientId}-dlq`,
  brokers: config.kafka.brokers,
})

let dlqProducer: Producer | null = null

export async function connectDlqProducer(): Promise<void> {
  dlqProducer = kafka.producer({
    allowAutoTopicCreation: true,
  })
  await dlqProducer.connect()
  logger.info("DLQ producer connected")
}

export async function disconnectDlqProducer(): Promise<void> {
  if (dlqProducer !== null) {
    await dlqProducer.disconnect()
  }
}

export interface DlqMessage {
  originalTopic: string
  originalEventId: string
  originalPayload: unknown
  errorMessage: string
  attemptCount: number
  failedAt: string
}

export async function publishToDlq(
  message: DlqMessage
): Promise<void> {
  if (dlqProducer === null) {
    logger.warn("DLQ producer not connected — failed message lost")
    return
  }

  try {
    await dlqProducer.send({
      topic: DLQ_TOPIC,
      compression: CompressionTypes.GZIP,
      messages: [
        {
          // Partition key = originalEventId ensures DLQ messages
          // for the same event land on the same partition (ordering)
          key: message.originalEventId,
          value: JSON.stringify(message),
          headers: {
            "dlq-original-topic": message.originalTopic,
            "dlq-failed-at": message.failedAt,
          },
        },
      ],
    })

    logger.warn(
      {
        originalTopic: message.originalTopic,
        originalEventId: message.originalEventId,
        attemptCount: message.attemptCount,
        errorMessage: message.errorMessage,
      },
      "Message moved to DLQ"
    )
  } catch (error: unknown) {
    // DLQ publish failed — this is a critical failure
    // In production: alert on-call, write to a fallback store (S3/filesystem)
    logger.error(
      {
        originalEventId: message.originalEventId,
        error: error instanceof Error ? error.message : "unknown",
      },
      "CRITICAL: Failed to publish to DLQ — message may be lost"
    )
  }
}