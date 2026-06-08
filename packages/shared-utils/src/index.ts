export {
  createLogger,
  createChildLogger,
  logRequest,
  logKafkaEvent,
  logGrpcCall,
  logServiceError,
} from "./logger/index"
export type { LogContext } from "./logger/index"

export {
  AppError,
  UnauthorizedError,
  ForbiddenError,
  TokenExpiredError,
  TokenInvalidError,
  InvalidCredentialsError,
  EmailAlreadyExistsError,
  UsernameAlreadyExistsError,
  NotFoundError,
  AlreadyExistsError,
  ValidationError,
  EventFullError,
  EventNotActiveError,
  AlreadyRegisteredError,
  EventAlreadyCompletedError,
  FileTooLargeError,
  InvalidFileTypeError,
  SubscriptionRequiredError,
  TierLimitReachedError,
  RateLimitedError,
  ServiceUnavailableError,
  ExternalApiError,
  isAppError,
} from "./errors/index"

export { asyncHandler } from "./middleware/asyncHandler"
export {
  createCorrelationId,
  resolveCorrelationId,
  buildPropagationHeaders,
} from "./middleware/correlationId"

export { ServiceHealthChecker } from "./health/ServiceHealthChecker"
export type { HealthCheckResult, DependencyHealth } from "./health/ServiceHealthChecker"

export {
  requireEnv,
  requireEnvInt,
  requireEnvBool,
  validateRequiredEnv,
} from "./utils/env"
