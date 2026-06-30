// gateway/src/routes/proxy.ts
import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { buildPropagationHeaders } from "@cleannation/shared-utils";
import { config } from "../config/index";
import { AuthenticatedRequest } from "../types/auth";

export default async function proxyRoutes(fastify: FastifyInstance): Promise<void> {
  async function forward(
    request: FastifyRequest,
    reply: FastifyReply,
    upstream: string,
    rewritePrefix: string,
    extraHeaders: Record<string, string> = {}
  ) {
    const wildcard = (request.params as any)["*"] || "";
    const servicePath = wildcard.replace(/^\/api\/v1\//, "");
    const targetPath = servicePath ? `${rewritePrefix}/${servicePath}`.replace(/\/+/g, "/") : rewritePrefix;
    const targetUrl = `${upstream}${targetPath}`;

    const headers: Record<string, string> = {};
    for (const [key, value] of Object.entries(request.headers)) {
      if (typeof value === "string" && key.toLowerCase() !== "host") {
        headers[key.toLowerCase()] = value;
      }
    }
    Object.assign(headers, extraHeaders);

    const hasBody = request.body !== undefined && request.body !== null;
    const isJsonBody = hasBody && request.method !== "GET" && request.method !== "HEAD";

    if (isJsonBody) {
      if (!headers["content-type"]) {
        headers["content-type"] = "application/json";
      }
    } else if (!hasBody) {
      delete headers["content-type"];
    }

    const fetchHeaders = new Headers();
    for (const [key, value] of Object.entries(headers)) {
      fetchHeaders.set(key, value);
    }

    const fetchOptions: RequestInit = {
      method: request.method,
      headers: fetchHeaders,
    };
    if (isJsonBody) {
      fetchOptions.body = JSON.stringify(request.body);
    }

    try {
      const response = await fetch(targetUrl, fetchOptions);
      const data = await response.json();
      return reply.status(response.status).send(data);
    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: "Internal proxy error" });
    }
  }

  function registerProxy(
    basePath: string,
    upstream: string,
    rewritePrefix: string,
    needsAuth: boolean,
    authRole?: string[],
    extraHeadersFactory?: (req: FastifyRequest) => Record<string, string>
  ) {
    const handler = async (request: FastifyRequest, reply: FastifyReply) => {
      let headers: Record<string, string> = {};
      if (extraHeadersFactory) {
        headers = extraHeadersFactory(request);
      } else {
        headers = buildPropagationHeaders(request.correlationId);
      }
      return forward(request, reply, upstream, rewritePrefix, headers);
    };

    const preHandler: any[] = [];
    if (needsAuth) preHandler.push(fastify.authenticate);
    if (authRole && authRole.length) preHandler.push(fastify.authorize(authRole as any));

    fastify.all(basePath, { preHandler }, handler);
    fastify.all(`${basePath}/*`, { preHandler }, handler);
  }

  fastify.get("/api/v1/auth/me", { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const authReq = request as AuthenticatedRequest;
    const headers = {
      ...buildPropagationHeaders(authReq.correlationId),
      "x-user-id": authReq.user.sub,
      "x-user-role": authReq.user.role,
      "x-org-id": authReq.user.orgId ?? "",
    };
    return forward(request, reply, config.services.auth, "/auth/me", headers);
  });

  fastify.all("/api/v1/auth/*", async (request, reply) => {
    const headers = buildPropagationHeaders(request.correlationId);
    return forward(request, reply, config.services.auth, "/auth", headers);
  });

  registerProxy("/api/v1/events", config.services.event, "/events", true, undefined, (req) => {
    const a = req as AuthenticatedRequest;
    return {
      ...buildPropagationHeaders(a.correlationId),
      "x-user-id": a.user.sub,
      "x-user-role": a.user.role,
      "x-org-id": a.user.orgId ?? "",
    };
  });

  registerProxy("/api/v1/graphql", config.services.event, "/graphql", true, undefined, (req) => {
    const a = req as AuthenticatedRequest;
    return {
      ...buildPropagationHeaders(a.correlationId),
      "x-user-id": a.user.sub,
      "x-user-role": a.user.role,
    };
  });

  registerProxy("/api/v1/locations", config.services.location, "/locations", true);
  registerProxy("/api/v1/media", config.services.media, "/media", true);
  registerProxy("/api/v1/gamification", config.services.gamification, "/gamification", true);
  registerProxy("/api/v1/payments", config.services.payment, "/payments", true, ["org_admin", "platform_admin"]);
  registerProxy("/api/v1/webhooks", config.services.payment, "/webhooks", false);
}