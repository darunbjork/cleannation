// services/event-service/src/graphql/resolvers/event.resolver.ts
// GraphQL resolvers — READ operations only.
// Mutations are handled by REST controllers.

import type { GraphQLContext } from "../context"
import { EventRepository } from "../../repositories/event.repository"
import { RegistrationRepository } from "../../repositories/registration.repository"
import { createLogger } from "@cleannation/shared-utils"

const logger = createLogger("event-service")
const eventRepo = new EventRepository()
const registrationRepo = new RegistrationRepository()

export const eventResolvers = {
  Query: {
    event: async (
      _: unknown,
      args: { id: string },
      context: GraphQLContext
    ) => {
      logger.info(
        { eventId: args.id, correlationId: context.correlationId },
        "GraphQL: event query"
      )
      return eventRepo.findById(args.id)
    },

    events: async (
      _: unknown,
      args: {
        status?: string
        category?: string
        organizerId?: string
        page?: number
        limit?: number
      },
      _context: GraphQLContext
    ) => {
      const page = args.page ?? 1
      const limit = Math.min(args.limit ?? 20, 100)

      const { events, total } = await eventRepo.findMany({
        status: args.status as never,
        category: args.category as never,
        organizerId: args.organizerId,
        page,
        limit,
      })

      const pages = Math.ceil(total / limit)

      return {
        items: events,
        pagination: {
          page,
          limit,
          total,
          pages,
          hasNext: page < pages,
          hasPrev: page > 1,
        },
      }
    },

    myEvents: async (
      _: unknown,
      __: unknown,
      context: GraphQLContext
    ) => {
      if (context.userId === null) return []

      const { events } = await eventRepo.findMany({
        organizerId: context.userId,
        page: 1,
        limit: 100,
      })

      return events
    },

    myRegistrations: async (
      _: unknown,
      __: unknown,
      context: GraphQLContext
    ) => {
      if (context.userId === null) return []
      return registrationRepo.findByUser(context.userId)
    },
  },

  // Field resolvers — called when the parent query requests these fields
  Event: {
    registrations: async (parent: { id: string }) => {
      return registrationRepo.findByEvent(parent.id)
    },

    registrationCount: async (parent: { id: string }) => {
      return registrationRepo.countByEvent(parent.id)
    },

    // Returns whether the current user is registered for this event
    // context.userId is null for unauthenticated GraphQL requests
    isUserRegistered: async (
      parent: { id: string },
      _: unknown,
      context: GraphQLContext
    ) => {
      if (context.userId === null) return false

      const registration = await registrationRepo.findByEventAndUser(
        parent.id,
        context.userId
      )

      return (
        registration !== null &&
        registration.status !== "CANCELLED"
      )
    },
  },
}
