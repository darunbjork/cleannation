import { describe, it, expect, vi, beforeEach } from "vitest"
import { EventRepository } from "../repositories/event.repository"
import { TierService } from "../services/tier.service"

vi.mock("../repositories/event.repository", () => ({
  EventRepository: vi.fn().mockImplementation(function() {
    return {
      countByOrganizerThisMonth: vi.fn().mockResolvedValue(0),
    }
  }),
}))

describe("TierService", () => {
  let service: TierService
  let mockRepo: any

  beforeEach(() => {
    vi.clearAllMocks()
    mockRepo = new EventRepository()
    // ✅ Use regular function
    vi.mocked(EventRepository).mockImplementation(function() { return mockRepo })
    service = new TierService()
  })

  describe("roleTotier", () => {
    it("maps volunteer to free tier", () => {
      expect(service.roleTotier("volunteer")).toBe("free")
    })

    it("maps organizer to organizer tier", () => {
      expect(service.roleTotier("organizer")).toBe("organizer")
    })

    it("maps org_admin to pro_organizer tier", () => {
      expect(service.roleTotier("org_admin")).toBe("pro_organizer")
    })

    it("maps platform_admin to municipality tier", () => {
      expect(service.roleTotier("platform_admin")).toBe("municipality")
    })

    it("returns free for unknown role", () => {
      expect(service.roleTotier("unknown_role")).toBe("free")
    })
  })

  describe("assertCanCreateEvent", () => {
    it("throws SubscriptionRequiredError for volunteer (free tier)", async () => {
      await expect(
        service.assertCanCreateEvent("usr_123", "volunteer")
      ).rejects.toThrow("organizer")
    })

    it("allows platform_admin to create unlimited events", async () => {
      await expect(
        service.assertCanCreateEvent("usr_admin", "platform_admin")
      ).resolves.toBeUndefined()
    })

    it("allows organizer when under monthly limit", async () => {
      mockRepo.countByOrganizerThisMonth.mockResolvedValue(2)

      await expect(
        service.assertCanCreateEvent("usr_organizer", "organizer")
      ).resolves.toBeUndefined()
    })

    it("throws TierLimitReachedError when organizer hits monthly limit", async () => {
      mockRepo.countByOrganizerThisMonth.mockResolvedValue(4)

      await expect(
        service.assertCanCreateEvent("usr_organizer", "organizer")
      ).rejects.toThrow("events per month")
    })
  })
})