import type { RouteHandlerMethod } from "fastify"

export function asyncHandler(handler: RouteHandlerMethod): RouteHandlerMethod {
  return async function wrappedHandler(
    this: any,
    request: any,
    reply: any
  ) {
    try {
      return await handler.call(this, request, reply)
    } catch (error: unknown) {
      return reply.send(error)
    }
  }
}
