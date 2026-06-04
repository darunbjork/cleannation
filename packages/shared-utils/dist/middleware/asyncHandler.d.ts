import type { FastifyRequest, FastifyReply } from "fastify";
type AsyncRouteHandler<TRequest extends FastifyRequest = FastifyRequest, TReply extends FastifyReply = FastifyReply> = (request: TRequest, reply: TReply) => Promise<void>;
export declare function asyncHandler<TRequest extends FastifyRequest = FastifyRequest, TReply extends FastifyReply = FastifyReply>(handler: AsyncRouteHandler<TRequest, TReply>): AsyncRouteHandler<TRequest, TReply>;
export {};
//# sourceMappingURL=asyncHandler.d.ts.map