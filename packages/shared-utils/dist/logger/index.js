import pino from "pino";
export function createLogger(serviceName) {
    const isDev = process.env["NODE_ENV"] !== "production";
    const options = {
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
    };
    if (isDev) {
        return pino(options, pino.transport({
            target: "pino-pretty",
            options: {
                colorize: true,
                translateTime: "HH:MM:ss",
                ignore: "pid,hostname",
                messageFormat: "[{service}] {msg}",
            },
        }));
    }
    return pino(options);
}
export function createChildLogger(logger, context) {
    return logger.child(context);
}
export function logRequest(logger, context) {
    logger.info(context, "HTTP request");
}
export function logKafkaEvent(logger, context) {
    logger.info(context, `Kafka event ${context.action}`);
}
export function logGrpcCall(logger, context) {
    logger.info(context, `gRPC call ${context.action}`);
}
export function logServiceError(logger, error, context = {}) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    const isDev = process.env["NODE_ENV"] !== "production";
    logger.error({
        ...context,
        error: errorMessage,
        ...(isDev && errorStack !== undefined ? { stack: errorStack } : {}),
    }, "Service error");
}
//# sourceMappingURL=index.js.map