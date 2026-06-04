import { ErrorCode } from "../errors/error.types"

// packages/shared-types/src/api/response.types.ts
// The envelope for EVERY API response across all services.
// One shape. No exceptions. Frontend writes one error handler.

export interface ApiResponse<TData> {
  success: boolean
  data: TData | null
  error: ApiError | null
  meta: ResponseMeta
}

export interface ResponseMeta {
  requestId: string       // correlation ID — present on every response
  timestamp: string       // ISO 8601
  service: string         // which microservice responded
  durationMs?: number     // optional — included in dev mode
}

export interface ApiError {
  code: ErrorCode
  message: string         // human-readable — shown in UI
  details: unknown | null // validation errors, field-level messages
}

// Helper factories — use these in every controller
export function ok<TData>(
  data: TData,
  meta: Omit<ResponseMeta, "timestamp">
): ApiResponse<TData> {
  return {
    success: true,
    data,
    error: null,
    meta: { ...meta, timestamp: new Date().toISOString() },
  }
}

export function fail(
  code: ErrorCode,
  message: string,
  meta: Omit<ResponseMeta, "timestamp">,
  details: unknown = null
): ApiResponse<null> {
  return {
    success: false,
    data: null,
    error: { code, message, details },
    meta: { ...meta, timestamp: new Date().toISOString() },
  }
}
