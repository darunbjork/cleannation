import fp from "fastify-plugin"
import type { FastifyInstance, FastifyError } from "fastify"
import {
  isAppError,
  logServiceError,
  createLogger,
} from "@cleannation/shared-utils"
import { ErrorCode, fail } from "@cleannation/shared-types"

const logger = createLogger("gateway")

export default fp(async function errorHandlerPlugin(
  fastify: FastifyInstance
) {
  fastify.setErrorHandler(function handleError(error, request, reply) {
    const correlationId =
      (request.headers["x-correlation-id"] as string) ?? "unknown"
    const meta = {
      requestId: correlationId,
      service: "gateway",
    }

    if (isAppError(error)) {
      if (error.statusCode < 500) {
        logger.warn(
          { correlationId, code: error.code, statusCode: error.statusCode },
          error.message
        )
      } else {
        logServiceError(logger, error, { correlationId })
      }

      return reply
        .status(error.statusCode)
        .send(fail(error.code, error.message, meta, error.details))
    }

    const fastifyError = error as FastifyError
    if (fastifyError.validation !== undefined) {
      logger.warn(
        { correlationId, validation: fastifyError.validation },
        "Request validation failed"
      )

      return reply.status(400).send(
        fail(
          ErrorCode.VALIDATION_ERROR,
          "Request validation failed",
          meta,
          fastifyError.validation
        )
      )
    }

    logServiceError(logger, error, {
      correlationId,
      method: request.method,
      path: request.url,
    })

    return reply
      .status(500)
      .send(fail(ErrorCode.INTERNAL, "An unexpected error occurred", meta))
  })
})
