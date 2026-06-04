import type { Logger } from "pino"

export interface HealthCheckResult {
  status: "ok" | "degraded" | "down"
  service: string
  timestamp: string
  dependencies: Record<string, DependencyHealth>
}

export interface DependencyHealth {
  status: "ok" | "down"
  latencyMs?: number
  error?: string
}

type HealthProbe = () => Promise<void>

export class ServiceHealthChecker {
  private readonly probes = new Map<string, HealthProbe>()

  constructor(
    private readonly serviceName: string,
    private readonly logger: Logger
  ) {}

  register(name: string, probe: HealthProbe): void {
    this.probes.set(name, probe)
  }

  liveness(): HealthCheckResult {
    return {
      status: "ok",
      service: this.serviceName,
      timestamp: new Date().toISOString(),
      dependencies: {},
    }
  }

  async readiness(): Promise<HealthCheckResult> {
    const results: Record<string, DependencyHealth> = {}
    let overallStatus: "ok" | "degraded" | "down" = "ok"

    await Promise.all(
      Array.from(this.probes.entries()).map(async ([name, probe]) => {
        const start = Date.now()
        try {
          await probe()
          results[name] = {
            status: "ok",
            latencyMs: Date.now() - start,
          }
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error"

          results[name] = {
            status: "down",
            latencyMs: Date.now() - start,
            error: errorMessage,
          }

          this.logger.warn(
            { dependency: name, error: errorMessage },
            "Health probe failed"
          )

          overallStatus = "degraded"
        }
      })
    )

    return {
      status: overallStatus,
      service: this.serviceName,
      timestamp: new Date().toISOString(),
      dependencies: results,
    }
  }
}
