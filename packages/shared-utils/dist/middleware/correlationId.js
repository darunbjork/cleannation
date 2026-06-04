import { v4 as uuidv4 } from "uuid";
export function createCorrelationId() {
    return `cn_${uuidv4()}`;
}
export function resolveCorrelationId(headers) {
    const fromHeader = headers["x-correlation-id"] ?? headers["x-request-id"];
    if (typeof fromHeader === "string" && fromHeader.length > 0) {
        return fromHeader;
    }
    return createCorrelationId();
}
export function buildPropagationHeaders(correlationId) {
    return {
        "x-correlation-id": correlationId,
    };
}
//# sourceMappingURL=correlationId.js.map