import { v4 as uuidv4 } from "uuid"

export function createCorrelationId(): string {
  return `cn_${uuidv4()}`
}

export function resolveCorrelationId(
  headers: Record<string, string | string[] | undefined>
): string {
  const fromHeader =
    headers["x-correlation-id"] ?? headers["x-request-id"]

  if (typeof fromHeader === "string" && fromHeader.length > 0) {
    return fromHeader
  }

  return createCorrelationId()
}

export function buildPropagationHeaders(
  correlationId: string
): Record<string, string> {
  return {
    "x-correlation-id": correlationId,
  }
}
