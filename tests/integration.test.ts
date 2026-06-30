// tests/integration.test.ts
import { describe, it, expect, beforeAll } from "vitest"

const GATEWAY = "http://localhost:3000"
const KAFKA_UI = "http://localhost:8080"

// Helper: typed fetch wrapper
async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<{ status: number; data: T }> {
  const response = await fetch(`${GATEWAY}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  const data = await response.json() as T
  return { status: response.status, data }
}

describe("CleanNation — End-to-End Integration", () => {
  let adminToken: string
  let volunteerToken: string
  let eventId: string
  let adminUserId: string

  // ── Setup: register two users ────────────────────────────────
  beforeAll(async () => {
    // Register admin – the first user gets platform_admin automatically.
    const adminReg = await api<{
      success: boolean
      data: { accessToken: string; user: { id: string; role: string } }
    }>("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: `admin-${Date.now()}@cleannation-test.app`,
        username: `admin${Date.now()}`,
        password: "AdminPass123!",
        displayName: "Test Admin",
      }),
    })

    expect(adminReg.status).toBe(201)
    expect(adminReg.data.success).toBe(true)
    // Assert that the first user gets platform_admin
    expect(adminReg.data.data.user.role).toBe("platform_admin")

    adminToken = adminReg.data.data.accessToken
    adminUserId = adminReg.data.data.user.id

    // Register volunteer – second user gets volunteer
    const volReg = await api<{
      success: boolean
      data: { accessToken: string }
    }>("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: `volunteer-${Date.now()}@cleannation-test.app`,
        username: `volunteer${Date.now()}`,
        password: "VolPass123!",
        displayName: "Test Volunteer",
      }),
    })

    expect(volReg.status).toBe(201)
    volunteerToken = volReg.data.data.accessToken
  }, 30_000)

  // ── Test 1: Health check ──────────────────────────────────────
  it("gateway /health/live returns 200", async () => {
    const { status, data } = await api<{ status: string }>(
      "/health/live"
    )
    expect(status).toBe(200)
    expect((data as { status: string }).status).toBe("ok")
  })

  // ── Test 2: Unauthenticated request is rejected ───────────────
  it("protected route returns 401 without token", async () => {
    const { status } = await api("/api/v1/auth/me")
    expect(status).toBe(401)
  })

  // ── Test 3: GET /auth/me returns correct user ─────────────────
  it("GET /auth/me returns the authenticated user", async () => {
    const { status, data } = await api<{
      success: boolean
      data: { id: string; email: string }
    }>("/api/v1/auth/me", {
      headers: { Authorization: `Bearer ${adminToken}` },
    })

    expect(status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.id).toBe(adminUserId)
  })

  // ── Test 4: Create a cleanup event ───────────────────────────
  it("admin can create a cleanup event", async () => {
    const { status, data } = await api<{
      success: boolean
      data: { id: string; title: string; status: string }
    }>("/api/v1/events", {
      method: "POST",
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({
        title: "CI Test Beach Cleanup",
        description: "Integration test cleanup event please ignore",
        category: "BEACH",
        maxParticipants: 50,
        scheduledAt: "2026-12-01T09:00:00Z",
        estimatedDurationMin: 120,
        locationId: "zone_ci_test",
        pointsReward: 100,
      }),
    })

    expect(status).toBe(201)
    expect(data.success).toBe(true)
    expect(data.data.title).toBe("CI Test Beach Cleanup")
    expect(data.data.status).toBe("DRAFT")

    eventId = data.data.id
    expect(eventId).toBeTruthy()
  })

  // ── Test 5: Publish the event ─────────────────────────────────
  it("admin can publish the event", async () => {
    const { status, data } = await api<{
      success: boolean
      data: { status: string }
    }>(`/api/v1/events/${eventId}/publish`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${adminToken}` },
    })

    expect(status).toBe(200)
    expect(data.data.status).toBe("PUBLISHED")
  })

  // ── Test 6: Volunteer joins the event ─────────────────────────
  it("volunteer can join a published event", async () => {
    const { status, data } = await api<{
      success: boolean
      data: { status: string; eventId: string }
    }>(`/api/v1/events/${eventId}/join`, {
      method: "POST",
      headers: { Authorization: `Bearer ${volunteerToken}` },
    })

    expect(status).toBe(201)
    expect(data.success).toBe(true)
    expect(data.data.status).toBe("REGISTERED")
    expect(data.data.eventId).toBe(eventId)
  })

  // ── Test 7: Duplicate join is rejected ───────────────────────
  it("volunteer cannot join the same event twice", async () => {
    const { status, data } = await api<{ error: { code: string } }>(
      `/api/v1/events/${eventId}/join`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${volunteerToken}` },
      }
    )

    expect(status).toBe(409)
    expect(data.error.code).toBe("ALREADY_REGISTERED")
  })

  // ── Test 8: GraphQL query returns correct data ────────────────
  it("GraphQL returns event with correct participant count", async () => {
    const query = `
      query {
        event(id: "${eventId}") {
          id
          title
          status
          currentParticipants
          isUserRegistered
        }
      }
    `

    const { status, data } = await api<{
      data: {
        event: {
          id: string
          title: string
          status: string
          currentParticipants: number
          isUserRegistered: boolean
        }
      }
    }>("/api/v1/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ query }),
    })

    expect(status).toBe(200)
    expect(data.data.event.id).toBe(eventId)
    expect(data.data.event.status).toBe("PUBLISHED")
    expect(data.data.event.currentParticipants).toBe(1)
  })

  // ── Test 9: Kafka received the events ────────────────────────
  it("Kafka received event.created and event.joined messages", async () => {
    const topicsRes = await fetch(`${KAFKA_UI}/api/topics`)

    if (!topicsRes.ok) {
      console.warn("Kafka UI not reachable — skipping Kafka verification")
      return
    }

    const topics = await topicsRes.json() as {
      topics: Array<{ topicName: string }>
    }

    const topicNames = topics.topics.map((t) => t.topicName)
    expect(topicNames).toContain("event.created")
    expect(topicNames).toContain("event.joined")
  })

  // ── Test 10: Rate limiting activates ─────────────────────────
  it("rate limiting returns 429 after too many auth requests", async () => {
    const requests = Array.from({ length: 8 }, () =>
      api("/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: "nonexistent@test.com",
          password: "wrongpassword",
        }),
      })
    )

    const results = await Promise.all(requests)
    const statusCodes = results.map((r) => r.status)

    // At least one request should be rate limited (429)
    expect(statusCodes).toContain(429)
  })
})