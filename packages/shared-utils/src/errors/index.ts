export * from "./AppError"

export function isAppError(error: unknown): error is import("./AppError").AppError {
  return (
    error instanceof Error &&
    "code" in error &&
    "statusCode" in error
  )
}
