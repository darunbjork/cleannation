// packages/shared-utils/src/middleware/asyncHandler.ts
import { FastifyRequest, FastifyReply } from 'fastify';

// Using 'any' only for the function signature to bypass the 'this' context mismatch 
// caused by Fastify version inconsistencies in the monorepo.
// The handler itself is kept type-safe.
export function asyncHandler(handler: any): any {
  return async function (this: any, request: FastifyRequest, reply: FastifyReply) {
    try {
      return await handler.call(this, request, reply);
    } catch (error: unknown) {
      return reply.send(error);
    }
  };
}
