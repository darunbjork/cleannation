import pino, { type Logger, type LoggerOptions } from "pino"

export interface LogContext {
  correlationId?: string
  userId?: string
  orgId?: string
  eventId?: string
  mediaId?: string
  sessionId?: string
  service?: string
  durationMs?: number
  statusCode?: number
  method?: string
  path?: string
  kafkaTopic?: string
  kafkaPartition?: number
  grpcMethod?: string
  [key: string]: string | number | boolean | undefined
}

export function createLogger(serviceName: string): Logger {
  const isDev = process.env["NODE_ENV"] !== "production"

  const options: LoggerOptions = {
    level: process.env["LOG_LEVEL"] ?? "info",
    base: {
      service: serviceName,
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
      paths: [
        "password",
        "passwordHash",
        "accessToken",
        "refreshToken",
        "stripeSecretKey",
        "*.password",
        "*.passwordHash",
        "*.accessToken",
      ],
      censor: "[REDACTED]",
    },
  }

  if (isDev) {
    return pino(
      options,
      pino.transport({
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss",
          ignore: "pid,hostname",
          messageFormat: "[{service}] {msg}",
        },
      })
    )
  }

  return pino(options)
}

export function createChildLogger(
  logger: Logger,
  context: LogContext
): Logger {
  return logger.child(context)
}

export function logRequest(
  logger: Logger,
  context: LogContext & {
    method: string
    path: string
    statusCode: number
    durationMs: number
  }
): void {
  logger.info(context, "HTTP request")
}

export function logKafkaEvent(
  logger: Logger,
  context: LogContext & {
    kafkaTopic: string
    action: "produced" | "consumed" | "failed"
    durationMs?: number
  }
): void {
  logger.info(context, `Kafka event ${context.action}`)
}

export function logGrpcCall(
  logger: Logger,
  context: LogContext & {
    grpcMethod: string
    action: "sent" | "received" | "failed"
    durationMs?: number
  }
): void {
  logger.info(context, `gRPC call ${context.action}`)
}

export function logServiceError(
  logger: Logger,
  error: unknown,
  context: LogContext = {}
): void {
  const errorMessage =
    error instanceof Error ? error.message : "Unknown error"
  const errorStack =
    error instanceof Error ? error.stack : undefined

  const isDev = process.env["NODE_ENV"] !== "production"

  logger.error(
    {
      ...context,
      error: errorMessage,
      ...(isDev && errorStack !== undefined ? { stack: errorStack } : {}),
    },
    "Service error"
  )
}
