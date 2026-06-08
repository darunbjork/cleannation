import "fastify";
import "@fastify/cookie";
import "@fastify/jwt";
import { JwtPayload } from "@cleannation/shared-types";
import type { FastifyRequest, FastifyReply } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
    authorize: (
      roles: import("@cleannation/shared-types").UserRole[]
    ) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    // Explicitly add jwt to FastifyInstance
    jwt: {
      verify: <T>(token: string) => T;
    };
  }

  interface FastifyRequest {
    correlationId: string;
    user: JwtPayload;
    // Add cookies property explicitly
    cookies: Record<string, string>;
  }
}
