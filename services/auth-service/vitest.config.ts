// services/auth-service/vitest.config.ts
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    testTimeout: 60_000,
    hookTimeout: 10_000,
    include: ["src/__tests__/**/*.test.ts"],
    env: {
      AUTH_DATABASE_URL: "postgresql://dummy",
      REDIS_URL: "redis://dummy",
      JWT_PRIVATE_KEY: "dummy",
      JWT_PUBLIC_KEY: "dummy",
      JWT_ACCESS_EXPIRY: "15m",
      JWT_REFRESH_EXPIRY: "7d",
    },
  },
})