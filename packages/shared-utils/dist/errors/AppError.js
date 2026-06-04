import { ErrorCode, ERROR_STATUS_MAP } from "@cleannation/shared-types";
export class AppError extends Error {
    code;
    statusCode;
    details;
    constructor(code, message, details = null) {
        super(message);
        this.name = "AppError";
        this.code = code;
        this.statusCode = ERROR_STATUS_MAP[code];
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
export class UnauthorizedError extends AppError {
    constructor(message = "Authentication required") {
        super(ErrorCode.UNAUTHORIZED, message);
    }
}
export class ForbiddenError extends AppError {
    constructor(message = "Insufficient permissions") {
        super(ErrorCode.FORBIDDEN, message);
    }
}
export class TokenExpiredError extends AppError {
    constructor() {
        super(ErrorCode.TOKEN_EXPIRED, "Access token has expired");
    }
}
export class TokenInvalidError extends AppError {
    constructor() {
        super(ErrorCode.TOKEN_INVALID, "Access token is invalid");
    }
}
export class InvalidCredentialsError extends AppError {
    constructor() {
        super(ErrorCode.INVALID_CREDENTIALS, "Invalid email or password");
    }
}
export class EmailAlreadyExistsError extends AppError {
    constructor() {
        super(ErrorCode.EMAIL_ALREADY_EXISTS, "An account with this email already exists");
    }
}
export class UsernameAlreadyExistsError extends AppError {
    constructor() {
        super(ErrorCode.USERNAME_ALREADY_EXISTS, "This username is already taken");
    }
}
export class NotFoundError extends AppError {
    constructor(resource) {
        super(ErrorCode.NOT_FOUND, `${resource} not found`);
    }
}
export class AlreadyExistsError extends AppError {
    constructor(resource) {
        super(ErrorCode.ALREADY_EXISTS, `${resource} already exists`);
    }
}
export class ValidationError extends AppError {
    constructor(details) {
        super(ErrorCode.VALIDATION_ERROR, "Validation failed", details);
    }
}
export class EventFullError extends AppError {
    constructor() {
        super(ErrorCode.EVENT_FULL, "Event has reached maximum capacity");
    }
}
export class EventNotActiveError extends AppError {
    constructor() {
        super(ErrorCode.EVENT_NOT_ACTIVE, "Event is not currently active");
    }
}
export class AlreadyRegisteredError extends AppError {
    constructor() {
        super(ErrorCode.ALREADY_REGISTERED, "Already registered for this event");
    }
}
export class EventAlreadyCompletedError extends AppError {
    constructor() {
        super(ErrorCode.EVENT_ALREADY_COMPLETED, "Event has already been completed");
    }
}
export class FileTooLargeError extends AppError {
    constructor(maxMb) {
        super(ErrorCode.FILE_TOO_LARGE, `File exceeds maximum size of ${maxMb}MB`);
    }
}
export class InvalidFileTypeError extends AppError {
    constructor(allowed) {
        super(ErrorCode.INVALID_FILE_TYPE, `Invalid file type. Allowed: ${allowed.join(", ")}`);
    }
}
export class SubscriptionRequiredError extends AppError {
    constructor(requiredTier) {
        super(ErrorCode.SUBSCRIPTION_REQUIRED, `This feature requires the ${requiredTier} plan`);
    }
}
export class TierLimitReachedError extends AppError {
    constructor(resource, limit) {
        super(ErrorCode.TIER_LIMIT_REACHED, `${resource} limit of ${limit} reached for your current plan`);
    }
}
export class RateLimitedError extends AppError {
    constructor(retryAfterSec) {
        super(ErrorCode.RATE_LIMITED, `Rate limit exceeded. Retry after ${retryAfterSec} seconds`);
    }
}
export class ServiceUnavailableError extends AppError {
    constructor(serviceName) {
        super(ErrorCode.SERVICE_UNAVAILABLE, `${serviceName} is temporarily unavailable`);
    }
}
export class ExternalApiError extends AppError {
    constructor(provider, details) {
        super(ErrorCode.EXTERNAL_API_ERROR, `External API error from ${provider}${details !== undefined ? `: ${details}` : ""}`);
    }
}
//# sourceMappingURL=AppError.js.map