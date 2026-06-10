// services/event-service/src/graphql/context.ts
// GraphQL context — available in every resolver.
// Populated from the incoming HTTP request headers
// (correlation ID, user ID injected by the gateway).

export interface GraphQLContext {
  userId: string | null
  userRole: string | null
  correlationId: string
}

export function buildContext(headers: Record<string, string | string[] | undefined>): GraphQLContext {
  const userId = headers["x-user-id"]
  const userRole = headers["x-user-role"]
  const correlationId = headers["x-correlation-id"]

  return {
    userId: typeof userId === "string" ? userId : null,
    userRole: typeof userRole === "string" ? userRole : null,
    correlationId: typeof correlationId === "string"
      ? correlationId
      : "unknown",
  }
}
