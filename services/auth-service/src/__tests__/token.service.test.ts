// services/auth-service/src/__tests__/token.service.test.ts
import { describe, it, expect, beforeAll } from "vitest"
import { execSync } from "child_process"

// Generate test RSA keys inline — self-contained test
function generateTestKeys(): { privateKey: string; publicKey: string } {
  try {
    execSync("openssl genrsa -out /tmp/test-private.pem 2048 2>/dev/null")
    execSync(
      "openssl rsa -in /tmp/test-private.pem -pubout -out /tmp/test-public.pem 2>/dev/null"
    )
    const privateKey = execSync(
      "cat /tmp/test-private.pem"
    ).toString()
    const publicKey = execSync("cat /tmp/test-public.pem").toString()
    // Clean up temporary files
    try {
      execSync("rm /tmp/test-private.pem /tmp/test-public.pem 2>/dev/null")
    } catch {
      // ignore
    }
    return { privateKey, publicKey }
  } catch {
    // Fallback: skip token tests if openssl not available
    return { privateKey: "", publicKey: "" }
  }
}

describe("TokenService", () => {
  let TokenService: typeof import("../services/token.service").TokenService
  let keys: { privateKey: string; publicKey: string }

  beforeAll(async () => {
    keys = generateTestKeys()

    if (keys.privateKey === "") {
      console.warn("openssl not available — skipping token tests")
      return
    }

    // Override the dummy keys (from vitest.config) with real ones for signing
    process.env["JWT_PRIVATE_KEY"] = keys.privateKey
    process.env["JWT_PUBLIC_KEY"] = keys.publicKey

    const mod = await import("../services/token.service")
    TokenService = mod.TokenService
  })

  describe("issueAccessToken", () => {
    it("returns a non-empty JWT string", () => {
      if (keys.privateKey === "") return

      const service = new TokenService()
      const token = service.issueAccessToken({
        sub: "usr_test123",
        email: "test@test.com",
        role: "volunteer",
        orgId: null,
      })

      expect(typeof token).toBe("string")
      expect(token.length).toBeGreaterThan(50)
      const parts = token.split(".")
      expect(parts.length).toBe(3)
    })

    it("encodes the correct userId in the payload", () => {
      if (keys.privateKey === "") return

      const service = new TokenService()
      const token = service.issueAccessToken({
        sub: "usr_specific_id",
        email: "user@test.com",
        role: "organizer",
        orgId: "org_123",
      })

      const payloadB64 = token.split(".")[1] ?? ""
      const payload = JSON.parse(
        Buffer.from(payloadB64, "base64url").toString("utf-8")
      ) as Record<string, unknown>

      expect(payload["sub"]).toBe("usr_specific_id")
      expect(payload["email"]).toBe("user@test.com")
      expect(payload["role"]).toBe("organizer")
      expect(payload["orgId"]).toBe("org_123")
      expect(typeof payload["exp"]).toBe("number")
      expect(payload["exp"] as number).toBeGreaterThan(Date.now() / 1000)
    })
  })

  describe("generateRefreshToken", () => {
    it("returns plaintext, hash, and jti", () => {
      if (keys.privateKey === "") return

      const service = new TokenService()
      const result = service.generateRefreshToken()

      expect(typeof result.plaintext).toBe("string")
      expect(typeof result.hash).toBe("string")
      expect(typeof result.jti).toBe("string")
      expect(result.plaintext.length).toBe(128)
      expect(result.hash.length).toBe(64)
    })

    it("generates unique tokens every call", () => {
      if (keys.privateKey === "") return

      const service = new TokenService()
      const t1 = service.generateRefreshToken()
      const t2 = service.generateRefreshToken()

      expect(t1.plaintext).not.toBe(t2.plaintext)
      expect(t1.hash).not.toBe(t2.hash)
      expect(t1.jti).not.toBe(t2.jti)
    })

    it("same plaintext always produces same hash", () => {
      if (keys.privateKey === "") return

      const service = new TokenService()
      const { plaintext } = service.generateRefreshToken()
      const hash1 = service.hashRefreshToken(plaintext)
      const hash2 = service.hashRefreshToken(plaintext)
      expect(hash1).toBe(hash2)
    })
  })
})