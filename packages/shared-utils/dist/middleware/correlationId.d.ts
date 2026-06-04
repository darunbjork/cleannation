export declare function createCorrelationId(): string;
export declare function resolveCorrelationId(headers: Record<string, string | string[] | undefined>): string;
export declare function buildPropagationHeaders(correlationId: string): Record<string, string>;
//# sourceMappingURL=correlationId.d.ts.map