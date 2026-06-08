// services/auth-service/src/services/token.service.ts
// JWT access token and refresh token lifecycle.
//
// ACCESS TOKEN:
//   - Signed with RS256 private key
//   - Expires in 15 minutes
//   - Carries userId, email, role, orgId
//   - Stateless — no DB lookup needed to verify
//   - Verified by gateway using public key
//
// REFRESH TOKEN:
//   - Random 64-byte hex string (not a JWT)
//   - Expires in 7 days
//   - Hashed before storage (SHA-256)
//   - Stored in DB with userId, jti, expiry
//   - Sent as HttpOnly cookie to client
//   - On use: old token revoked, new pair issued (rotation)
//   - On logout: jti added to Redis blocklist
//
// WHY refresh tokens are NOT JWTs:
// If a refresh token were a JWT, a compromised private key would
// allow an attacker to forge both access AND refresh tokens.
// A random opaque token has no crypto — its only validity is its
// presence in the database. DB records can be instantly revoked.

import crypto from "node:crypto"
import { createSigner, createVerifier } from "fast-jwt"
import { config } from "../config/index"
import { redis } from "../db/redis"
import type { JwtPayload, UserRole } from "@cleannation/shared-types"

// fast-jwt: faster than jsonwebtoken, same security guarantees
// We use it directly here rather than through @fastify/jwt
// because token service is called outside of Fastify's request context

export class TokenService {
  private readonly signSync: ReturnType<typeof createSigner>

  constructor() {
    this.signSync = createSigner({
      algorithm: config.jwt.algorithm,
      key: config.jwt.privateKey,
      expiresIn: config.jwt.accessTokenExpiry,
    })
  }

  // Issues a new RS256-signed access token
  issueAccessToken(payload: {
    sub: string
    email: string
    role: UserRole
    orgId: string | null
  }): string {
    const jwtPayload: Omit<JwtPayload, "iat" | "exp"> = {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
      orgId: payload.orgId,
    }

    // signSync is safe here — fast-jwt's RS256 is CPU-bound but fast
    return this.signSync(jwtPayload) as string
  }

  // Generates a cryptographically random refresh token
  // Returns both plaintext (sent to client) and hash (stored in DB)
  generateRefreshToken(): {
    plaintext: string
    hash: string
    jti: string
  } {
    // 64 bytes = 128 hex chars — cryptographically unguessable
    const plaintext = crypto.randomBytes(64).toString("hex")

    // SHA-256 hash stored in DB — not Argon2 because:
    // 1. Refresh tokens are already random (no dictionary attack surface)
    // 2. SHA-256 is fast enough for verification without being crackable
    //    from a random 64-byte value regardless of speed
    const hash = crypto
      .createHash("sha256")
      .update(plaintext)
      .digest("hex")

    // Unique token ID — used for Redis blocklist lookup
    const jti = crypto.randomUUID()

    return { plaintext, hash, jti }
  }

  // Hashes a plaintext refresh token for DB lookup
  hashRefreshToken(plaintext: string): string {
    return crypto
      .createHash("sha256")
      .update(plaintext)
      .digest("hex")
  }

  // Adds a jti to the Redis blocklist
  // Called on logout — makes the token immediately invalid
  async blockToken(
    jti: string,
    remainingTtlSec: number
  ): Promise<void> {
    // SETEX: set key with TTL — auto-expires when token would have expired anyway
    // Keeps the blocklist small — no manual cleanup needed
    await redis.setex(
      `blocklist:${jti}`,
      remainingTtlSec,
      "1"
    )
  }

  // Checks if a jti is in the Redis blocklist
  async isBlocked(jti: string): Promise<boolean> {
    const result = await redis.get(`blocklist:${jti}`)
    return result !== null
  }
}