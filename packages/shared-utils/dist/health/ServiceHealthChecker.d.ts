import type { Logger } from "pino";
export interface HealthCheckResult {
    status: "ok" | "degraded" | "down";
    service: string;
    timestamp: string;
    dependencies: Record<string, DependencyHealth>;
}
export interface DependencyHealth {
    status: "ok" | "down";
    latencyMs?: number;
    error?: string;
}
type HealthProbe = () => Promise<void>;
export declare class ServiceHealthChecker {
    private readonly serviceName;
    private readonly logger;
    private readonly probes;
    constructor(serviceName: string, logger: Logger);
    register(name: string, probe: HealthProbe): void;
    liveness(): HealthCheckResult;
    readiness(): Promise<HealthCheckResult>;
}
export {};
//# sourceMappingURL=ServiceHealthChecker.d.ts.map