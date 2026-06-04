import { type Logger } from "pino";
export interface LogContext {
    correlationId?: string;
    userId?: string;
    orgId?: string;
    eventId?: string;
    mediaId?: string;
    sessionId?: string;
    service?: string;
    durationMs?: number;
    statusCode?: number;
    method?: string;
    path?: string;
    kafkaTopic?: string;
    kafkaPartition?: number;
    grpcMethod?: string;
    [key: string]: string | number | boolean | undefined;
}
export declare function createLogger(serviceName: string): Logger;
export declare function createChildLogger(logger: Logger, context: LogContext): Logger;
export declare function logRequest(logger: Logger, context: LogContext & {
    method: string;
    path: string;
    statusCode: number;
    durationMs: number;
}): void;
export declare function logKafkaEvent(logger: Logger, context: LogContext & {
    kafkaTopic: string;
    action: "produced" | "consumed" | "failed";
    durationMs?: number;
}): void;
export declare function logGrpcCall(logger: Logger, context: LogContext & {
    grpcMethod: string;
    action: "sent" | "received" | "failed";
    durationMs?: number;
}): void;
export declare function logServiceError(logger: Logger, error: unknown, context?: LogContext): void;
//# sourceMappingURL=index.d.ts.map