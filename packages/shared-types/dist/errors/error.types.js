// packages/shared-types/src/errors/error.types.ts
// Every error in the platform has a typed code.
// Frontend and consumers switch on ErrorCode — never parse message strings.
export var ErrorCode;
(function (ErrorCode) {
    // Auth errors
    ErrorCode["UNAUTHORIZED"] = "UNAUTHORIZED";
    ErrorCode["FORBIDDEN"] = "FORBIDDEN";
    ErrorCode["TOKEN_EXPIRED"] = "TOKEN_EXPIRED";
    ErrorCode["TOKEN_INVALID"] = "TOKEN_INVALID";
    ErrorCode["INVALID_CREDENTIALS"] = "INVALID_CREDENTIALS";
    ErrorCode["EMAIL_ALREADY_EXISTS"] = "EMAIL_ALREADY_EXISTS";
    ErrorCode["USERNAME_ALREADY_EXISTS"] = "USERNAME_ALREADY_EXISTS";
    // Resource errors
    ErrorCode["NOT_FOUND"] = "NOT_FOUND";
    ErrorCode["ALREADY_EXISTS"] = "ALREADY_EXISTS";
    // Validation
    ErrorCode["VALIDATION_ERROR"] = "VALIDATION_ERROR";
    ErrorCode["INVALID_INPUT"] = "INVALID_INPUT";
    // Event errors
    ErrorCode["EVENT_FULL"] = "EVENT_FULL";
    ErrorCode["EVENT_NOT_ACTIVE"] = "EVENT_NOT_ACTIVE";
    ErrorCode["ALREADY_REGISTERED"] = "ALREADY_REGISTERED";
    ErrorCode["NOT_REGISTERED"] = "NOT_REGISTERED";
    ErrorCode["EVENT_ALREADY_COMPLETED"] = "EVENT_ALREADY_COMPLETED";
    // Media errors
    ErrorCode["UPLOAD_FAILED"] = "UPLOAD_FAILED";
    ErrorCode["FILE_TOO_LARGE"] = "FILE_TOO_LARGE";
    ErrorCode["INVALID_FILE_TYPE"] = "INVALID_FILE_TYPE";
    ErrorCode["VERIFICATION_FAILED"] = "VERIFICATION_FAILED";
    // Payment / subscription errors
    ErrorCode["SUBSCRIPTION_REQUIRED"] = "SUBSCRIPTION_REQUIRED";
    ErrorCode["TIER_LIMIT_REACHED"] = "TIER_LIMIT_REACHED";
    ErrorCode["PAYMENT_FAILED"] = "PAYMENT_FAILED";
    ErrorCode["SUBSCRIPTION_CANCELLED"] = "SUBSCRIPTION_CANCELLED";
    // Infrastructure
    ErrorCode["RATE_LIMITED"] = "RATE_LIMITED";
    ErrorCode["SERVICE_UNAVAILABLE"] = "SERVICE_UNAVAILABLE";
    ErrorCode["INTERNAL"] = "INTERNAL";
    // External services
    ErrorCode["EXTERNAL_API_ERROR"] = "EXTERNAL_API_ERROR";
})(ErrorCode || (ErrorCode = {}));
// HTTP status code mapping — used by the global error handler
export const ERROR_STATUS_MAP = {
    [ErrorCode.UNAUTHORIZED]: 401,
    [ErrorCode.FORBIDDEN]: 403,
    [ErrorCode.TOKEN_EXPIRED]: 401,
    [ErrorCode.TOKEN_INVALID]: 401,
    [ErrorCode.INVALID_CREDENTIALS]: 401,
    [ErrorCode.EMAIL_ALREADY_EXISTS]: 409,
    [ErrorCode.USERNAME_ALREADY_EXISTS]: 409,
    [ErrorCode.NOT_FOUND]: 404,
    [ErrorCode.ALREADY_EXISTS]: 409,
    [ErrorCode.VALIDATION_ERROR]: 400,
    [ErrorCode.INVALID_INPUT]: 400,
    [ErrorCode.EVENT_FULL]: 409,
    [ErrorCode.EVENT_NOT_ACTIVE]: 400,
    [ErrorCode.ALREADY_REGISTERED]: 409,
    [ErrorCode.NOT_REGISTERED]: 400,
    [ErrorCode.EVENT_ALREADY_COMPLETED]: 400,
    [ErrorCode.UPLOAD_FAILED]: 500,
    [ErrorCode.FILE_TOO_LARGE]: 413,
    [ErrorCode.INVALID_FILE_TYPE]: 415,
    [ErrorCode.VERIFICATION_FAILED]: 422,
    [ErrorCode.SUBSCRIPTION_REQUIRED]: 402,
    [ErrorCode.TIER_LIMIT_REACHED]: 402,
    [ErrorCode.PAYMENT_FAILED]: 402,
    [ErrorCode.SUBSCRIPTION_CANCELLED]: 402,
    [ErrorCode.RATE_LIMITED]: 429,
    [ErrorCode.SERVICE_UNAVAILABLE]: 503,
    [ErrorCode.INTERNAL]: 500,
    [ErrorCode.EXTERNAL_API_ERROR]: 502,
};
//# sourceMappingURL=error.types.js.map