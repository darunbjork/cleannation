import { FastifyRequest, FastifyReply } from 'fastify';

export function asyncHandler(handler: any): any {
  return async function (this: any, request: FastifyRequest, reply: FastifyReply) {
    try {
      return await handler.call(this, request, reply);
    } catch (error: unknown) {
      return reply.send(error);
    }
  };
}
