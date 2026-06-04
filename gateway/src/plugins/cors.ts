import fp from "fastify-plugin"
import cors from "@fastify/cors"
import type { FastifyInstance } from "fastify"
import { config } from "../config/index"

export default fp(async function corsPlugin(fastify: FastifyInstance) {
  await fastify.register(cors, {
    origin: config.cors.origin.split(",").map((o) => o.trim()),
    credentials: config.cors.credentials,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Correlation-Id",
      "X-Request-Id",
    ],
    exposedHeaders: ["X-Correlation-Id"],
    maxAge: 86400,
  })
})
