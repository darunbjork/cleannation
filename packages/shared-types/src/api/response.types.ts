export interface ApiResponse<TData> {
  success: boolean
  data: TData | null
  error: ApiError | null
  meta: ResponseMeta
}

export interface ResponseMeta {
  requestId: string
  timestamp: string
  service: string
  durationMs?: number
}

export interface ApiError {
  code: string // Using string to allow ErrorCode enum
  message: string
  details: unknown | null
}

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
  code: string,
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
