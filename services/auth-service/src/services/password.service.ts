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
      return false
    }
  }

  needsRehash(hash: string): boolean {
    return argon2.needsRehash(hash, {
      memoryCost: config.argon2.memoryCost,
      timeCost: config.argon2.timeCost,
    })
  }
}
