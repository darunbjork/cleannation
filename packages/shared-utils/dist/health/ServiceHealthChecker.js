export class ServiceHealthChecker {
    serviceName;
    logger;
    probes = new Map();
    constructor(serviceName, logger) {
        this.serviceName = serviceName;
        this.logger = logger;
    }
    register(name, probe) {
        this.probes.set(name, probe);
    }
    liveness() {
        return {
            status: "ok",
            service: this.serviceName,
            timestamp: new Date().toISOString(),
            dependencies: {},
        };
    }
    async readiness() {
        const results = {};
        let overallStatus = "ok";
        await Promise.all(Array.from(this.probes.entries()).map(async ([name, probe]) => {
            const start = Date.now();
            try {
                await probe();
                results[name] = {
                    status: "ok",
                    latencyMs: Date.now() - start,
                };
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unknown error";
                results[name] = {
                    status: "down",
                    latencyMs: Date.now() - start,
                    error: errorMessage,
                };
                this.logger.warn({ dependency: name, error: errorMessage }, "Health probe failed");
                overallStatus = "degraded";
            }
        }));
        return {
            status: overallStatus,
            service: this.serviceName,
            timestamp: new Date().toISOString(),
            dependencies: results,
        };
    }
}
//# sourceMappingURL=ServiceHealthChecker.js.map