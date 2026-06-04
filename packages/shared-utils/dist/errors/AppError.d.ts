import { ErrorCode } from "@cleannation/shared-types";
export declare class AppError extends Error {
    readonly code: ErrorCode;
    readonly statusCode: number;
    readonly details: unknown;
    constructor(code: ErrorCode, message: string, details?: unknown);
}
export declare class UnauthorizedError extends AppError {
    constructor(message?: string);
}
export declare class ForbiddenError extends AppError {
    constructor(message?: string);
}
export declare class TokenExpiredError extends AppError {
    constructor();
}
export declare class TokenInvalidError extends AppError {
    constructor();
}
export declare class InvalidCredentialsError extends AppError {
    constructor();
}
export declare class EmailAlreadyExistsError extends AppError {
    constructor();
}
export declare class UsernameAlreadyExistsError extends AppError {
    constructor();
}
export declare class NotFoundError extends AppError {
    constructor(resource: string);
}
export declare class AlreadyExistsError extends AppError {
    constructor(resource: string);
}
export declare class ValidationError extends AppError {
    constructor(details: unknown);
}
export declare class EventFullError extends AppError {
    constructor();
}
export declare class EventNotActiveError extends AppError {
    constructor();
}
export declare class AlreadyRegisteredError extends AppError {
    constructor();
}
export declare class EventAlreadyCompletedError extends AppError {
    constructor();
}
export declare class FileTooLargeError extends AppError {
    constructor(maxMb: number);
}
export declare class InvalidFileTypeError extends AppError {
    constructor(allowed: string[]);
}
export declare class SubscriptionRequiredError extends AppError {
    constructor(requiredTier: string);
}
export declare class TierLimitReachedError extends AppError {
    constructor(resource: string, limit: number);
}
export declare class RateLimitedError extends AppError {
    constructor(retryAfterSec: number);
}
export declare class ServiceUnavailableError extends AppError {
    constructor(serviceName: string);
}
export declare class ExternalApiError extends AppError {
    constructor(provider: string, details?: string);
}
//# sourceMappingURL=AppError.d.ts.map