import { describe, it, expect, vi, beforeEach } from "vitest"
import { EventService } from "../services/event.service"
import { EventRepository } from "../repositories/event.repository"
import { publishEvent } from "../kafka/producer"
import type { EventCategory } from "@prisma/client"

// Helper to create a full mock event object
const createMockEvent = (overrides = {}): any => ({
  id: "evt_test_123",
  title: "Test Event",
  description: "Test description",
  category: "BEACH" as EventCategory,
  organizerId: "usr_123",
  organizationId: null,
  maxParticipants: 50,
  currentParticipants: 0,
  scheduledAt: new Date("2026-12-01T09:00:00Z"),
  estimatedDurationMin: 120,
  locationId: "zone_123",
  pointsReward: 100,
  status: "DRAFT",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  ...overrides,
})

// ✅ Use regular function for mock constructor
vi.mock("../repositories/event.repository", () => ({
  EventRepository: vi.fn().mockImplementation(function() {
    return {
      findById: vi.fn(),
      findMany: vi.fn().mockResolvedValue({ events: [], total: 0 }),
      create: vi.fn(),
      update: vi.fn(),
      softDelete: vi.fn(),
      incrementParticipantCount: vi.fn(),
      decrementParticipantCount: vi.fn(),
      countByOrganizerThisMonth: vi.fn().mockResolvedValue(0),
    }
  }),
}))

vi.mock("../repositories/registration.repository", () => ({
  RegistrationRepository: vi.fn().mockImplementation(function() {
    return {
      findByEventAndUser: vi.fn().mockResolvedValue(null),
      findByUser: vi.fn().mockResolvedValue([]),
      create: vi.fn(),
      updateStatus: vi.fn(),
      countByEvent: vi.fn().mockResolvedValue(0),
    }
  }),
}))

vi.mock("../kafka/producer", () => ({
  publishEvent: vi.fn().mockResolvedValue(undefined),
}))

vi.mock("../services/tier.service", () => ({
  TierService: vi.fn().mockImplementation(function() {
    return {
      assertCanCreateEvent: vi.fn().mockResolvedValue(undefined),
      roleTotier: vi.fn().mockReturnValue("organizer"),
    }
  }),
}))

describe("EventService", () => {
  let service: EventService
  let mockRepo: any

  beforeEach(() => {
    vi.clearAllMocks()
    mockRepo = new EventRepository()
    // ✅ Use regular function, not arrow function
    vi.mocked(EventRepository).mockImplementation(function() { return mockRepo })
    service = new EventService()
  })

  describe("create", () => {
    it("throws ValidationError when scheduledAt is in the past", async () => {
      await expect(
        service.create(
          {
            title: "Beach Cleanup",
            description: "Clean the beach with us join today",
            category: "BEACH" as EventCategory,
            maxParticipants: 50,
            scheduledAt: "2020-01-01T09:00:00Z",
            estimatedDurationMin: 120,
            locationId: "zone_123",
            pointsReward: 100,
          },
          { userId: "usr_123", role: "organizer", orgId: null }
        )
      ).rejects.toThrow("Validation failed")
    })

    it("publishes event.created to Kafka after successful creation", async () => {
      const mockEvent = createMockEvent({ id: "evt_new_123" })

      mockRepo.create.mockResolvedValue(mockEvent)
      mockRepo.countByOrganizerThisMonth.mockResolvedValue(0)

      await service.create(
        {
          title: "Beach Cleanup",
          description: "Clean the beach with us join today",
          category: "BEACH" as EventCategory,
          maxParticipants: 50,
          scheduledAt: "2026-12-01T09:00:00Z",
          estimatedDurationMin: 120,
          locationId: "zone_123",
          pointsReward: 100,
        },
        { userId: "usr_123", role: "organizer", orgId: null }
      )

      expect(publishEvent).toHaveBeenCalledTimes(1)
      expect(publishEvent).toHaveBeenCalledWith(
        "event.created",
        expect.objectContaining({ eventId: "evt_new_123" }),
        "evt_new_123"
      )
    })
  })

  describe("join", () => {
    it("throws EventFullError when event is at capacity", async () => {
      mockRepo.findById.mockResolvedValue(
        createMockEvent({
          id: "evt_full",
          status: "PUBLISHED",
          maxParticipants: 10,
          currentParticipants: 10,
        })
      )
      mockRepo.incrementParticipantCount.mockResolvedValue(null)

      await expect(
        service.join("evt_full", { userId: "usr_volunteer" })
      ).rejects.toThrow("capacity")
    })

    it("throws EventNotActiveError for DRAFT events", async () => {
      mockRepo.findById.mockResolvedValue(
        createMockEvent({
          id: "evt_draft",
          status: "DRAFT",
          maxParticipants: 50,
          currentParticipants: 0,
        })
      )

      await expect(
        service.join("evt_draft", { userId: "usr_volunteer" })
      ).rejects.toThrow()
    })
  })
})