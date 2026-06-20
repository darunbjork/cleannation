// services/gamification-service/src/graphql/context.ts

export interface GraphQLContext {
  userId: string | null
  correlationId: string
}

export function buildContext(
  headers: Record<string, string | string[] | undefined>
): GraphQLContext {
  const userId = headers["x-user-id"]
  const correlationId = headers["x-correlation-id"]

  return {
    userId: typeof userId === "string" ? userId : null,
    correlationId:
      typeof correlationId === "string" ? correlationId : "unknown",
  }
}