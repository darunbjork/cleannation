// services/event-service/src/graphql/schema/event.graphql.ts
// GraphQL SDL (Schema Definition Language) as a TypeScript string.
//
// WHY GraphQL for reads:
// The event detail page needs event + organizer + participants + zone.
// With REST: 4 separate requests, client coordinates them.
// With GraphQL: 1 request, server resolves all relations.
//
// WHAT GraphQL does NOT expose:
// Mutations — those stay as REST endpoints.
// The GraphQL schema is READ-ONLY by design.
// This avoids the "GraphQL mutations return 200 for errors" problem.

export const typeDefs = `#graphql
  type Query {
    event(id: ID!): Event
    events(
      status: EventStatus
      category: EventCategory
      organizerId: ID
      page: Int
      limit: Int
    ): EventConnection!
    myEvents: [Event!]!
    myRegistrations: [Registration!]!
  }

  type Event {
    id: ID!
    title: String!
    description: String!
    category: EventCategory!
    status: EventStatus!
    organizerId: ID!
    maxParticipants: Int!
    currentParticipants: Int!
    scheduledAt: String!
    estimatedDurationMin: Int!
    locationId: ID!
    pointsReward: Int!
    createdAt: String!
    updatedAt: String!

    # Resolved by fetching from respective services
    registrations: [Registration!]!
    registrationCount: Int!
    isUserRegistered: Boolean!
  }

  type Registration {
    id: ID!
    eventId: ID!
    userId: ID!
    status: RegistrationStatus!
    registeredAt: String!
    checkedInAt: String
    checkedOutAt: String
  }

  type EventConnection {
    items: [Event!]!
    pagination: PaginationMeta!
  }

  type PaginationMeta {
    page: Int!
    limit: Int!
    total: Int!
    pages: Int!
    hasNext: Boolean!
    hasPrev: Boolean!
  }

  enum EventStatus {
    DRAFT
    PUBLISHED
    ACTIVE
    COMPLETED
    VERIFIED
    CANCELLED
  }

  enum EventCategory {
    BEACH
    PARK
    URBAN_STREET
    FOREST
    RIVER
    HIGHWAY
    NEIGHBORHOOD
    OTHER
  }

  enum RegistrationStatus {
    REGISTERED
    CHECKED_IN
    COMPLETED
    NO_SHOW
    CANCELLED
  }
`
