import type { FastifyRequest, FastifyReply } from "fastify"

type AsyncRouteHandler<
  TRequest extends FastifyRequest = FastifyRequest,
  TReply extends FastifyReply = FastifyReply
> = (request: TRequest, reply: TReply) => Promise<void>

export function asyncHandler<
  TRequest extends FastifyRequest = FastifyRequest,
  TReply extends FastifyReply = FastifyReply
>(handler: AsyncRouteHandler<TRequest, TReply>): AsyncRouteHandler<TRequest, TReply> {
  return async function wrappedHandler(
    request: TRequest,
    reply: TReply
  ): Promise<void> {
    try {
      await handler(request, reply)
    } catch (error: unknown) {
      reply.send(error)
    }
  }
}
