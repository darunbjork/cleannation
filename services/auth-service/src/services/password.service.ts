// services/auth-service/src/services/password.service.ts
// Argon2id password hashing.
//
// This service has exactly one job: hash and verify passwords.
// Isolated so the algorithm can be swapped without touching auth logic.
//
// ARGON2ID vs ARGON2I vs ARGON2D:
// argon2i: side-channel resistant — good for password hashing
// argon2d: GPU resistant — good for crypto
// argon2id: hybrid of both — OWASP recommendation for passwords
// We use argon2id. Always.

import argon2 from "argon2"
import { config } from "../config/index"
import { createLogger } from "@cleannation/shared-utils"

const logger = createLogger("auth-service")

export class PasswordService {

  async hash(plaintext: string): Promise<string> {
    const start = Date.now()

    const hash = await argon2.hash(plaintext, {
      type: argon2.argon2id,
      memoryCost: config.argon2.memoryCost,
      timeCost: config.argon2.timeCost,
      parallelism: config.argon2.parallelism,
    })

    logger.info(
      { durationMs: Date.now() - start },
      "Password hashed"
    )

    return hash
  }

  async verify(hash: string, plaintext: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, plaintext)
    } catch (error: unknown) {
      logger.error(
        { error: error instanceof Error ? error.message : "unknown" },
        "Password verification error"
      )
      // Return false on error — never throw from a verify call
      // Throwing would leak timing information about hash format
      return false
    }
  }

  // Checks if an existing hash needs rehashing with updated parameters.
  // If we increase memoryCost in the future, existing hashes
  // are automatically upgraded on the user's next login.
  needsRehash(hash: string): boolean {
    return argon2.needsRehash(hash, {
      memoryCost: config.argon2.memoryCost,
      timeCost: config.argon2.timeCost,
    })
  }
}
