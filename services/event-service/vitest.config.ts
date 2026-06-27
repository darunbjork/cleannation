import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    testTimeout: 10_000,
    hookTimeout: 10_000,
    include: ["src/__tests__/**/*.test.ts"],
    environment: "node",
    env: {
      EVENT_DATABASE_URL: "postgresql://dummy",
      KAFKA_BROKERS: "dummy",
    },
  },
})