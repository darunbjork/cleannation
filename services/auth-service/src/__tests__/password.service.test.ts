// services/auth-service/src/__tests__/password.service.test.ts
import { describe, it, expect, beforeAll } from "vitest"
import { PasswordService } from "../services/password.service"

describe("PasswordService", () => {
  let service: PasswordService

  beforeAll(() => {
    service = new PasswordService()
  })

  describe("hash", () => {
    it("returns a string that is not the original password", async () => {
      const hash = await service.hash("mypassword123")
      expect(hash).not.toBe("mypassword123")
      expect(typeof hash).toBe("string")
      expect(hash.length).toBeGreaterThan(20)
    })

    it("produces different hashes for the same password (salt)", async () => {
      const hash1 = await service.hash("samepassword")
      const hash2 = await service.hash("samepassword")
      expect(hash1).not.toBe(hash2)
    })

    it("hash contains argon2id identifier", async () => {
      const hash = await service.hash("testpassword")
      expect(hash.startsWith("$argon2id$")).toBe(true)
    })
  })

  describe("verify", () => {
    it("returns true for correct password", async () => {
      const hash = await service.hash("correctpassword")
      const result = await service.verify(hash, "correctpassword")
      expect(result).toBe(true)
    })

    it("returns false for wrong password", async () => {
      const hash = await service.hash("correctpassword")
      const result = await service.verify(hash, "wrongpassword")
      expect(result).toBe(false)
    })

    it("returns false for empty password", async () => {
      const hash = await service.hash("somepassword")
      const result = await service.verify(hash, "")
      expect(result).toBe(false)
    })

    it("returns false for malformed hash without throwing", async () => {
      const result = await service.verify("not-a-valid-hash", "password")
      expect(result).toBe(false)
    })
  })

  describe("needsRehash", () => {
    it("returns false for a freshly generated hash", async () => {
      const hash = await service.hash("password123")
      const needs = service.needsRehash(hash)
      expect(needs).toBe(false)
    })
  })
})