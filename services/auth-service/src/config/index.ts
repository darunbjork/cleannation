// services/auth-service/src/config/index.ts

import {
  requireEnv,
  requireEnvInt,
  validateRequiredEnv,
} from "@cleannation/shared-utils"

validateRequiredEnv([
  "AUTH_DATABASE_URL",
  "REDIS_URL",
  "JWT_PRIVATE_KEY",
  "JWT_PUBLIC_KEY",
])

export const config = {
  port: requireEnvInt("AUTH_SERVICE_PORT", 3001),
  host: "0.0.0.0",
  nodeEnv: process.env["NODE_ENV"] ?? "development",

  db: {
    url: requireEnv("AUTH_DATABASE_URL"),
  },

  redis: {
    url: requireEnv("REDIS_URL"),
  },

  jwt: {
    // Private key — used ONLY for signing new tokens.
    // Never logged, never forwarded, never leaves this service.
    privateKey: requireEnv("JWT_PRIVATE_KEY").replace(/\\n/g, "\n"),
    // Public key — shared with gateway for verification.
    publicKey: requireEnv("JWT_PUBLIC_KEY").replace(/\\n/g, "\n"),
    algorithm: "RS256" as const,
    accessTokenExpiry: "15m",
    refreshTokenExpiry: "7d",
    refreshTokenExpiryMs: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  },

  // Argon2id parameters — OWASP recommended minimums for 2024:
  // memoryCost: 64MB — makes GPU attacks memory-bandwidth limited
  // timeCost: 3 — iterations over the memory
  // parallelism: 4 — threads (match to your server CPU count)
  // Combined: ~300ms per hash on a modern server — acceptable for login,
  // completely impractical for bulk GPU cracking attempts
  argon2: {
    memoryCost: 65536,  // 64MB in KB
    timeCost: 3,
    parallelism: 4,
  },

  // Refresh token blocklist TTL in Redis.
  // Set to match refreshTokenExpiry so Redis auto-expires entries.
  refreshTokenBlocklistTtlSec: 7 * 24 * 60 * 60,

  cors: {
    origin: process.env["CORS_ORIGIN"] ?? "http://localhost:5173",
  },
} as const