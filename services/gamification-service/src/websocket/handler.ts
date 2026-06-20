import type { WebSocket } from "ws"
import type { FastifyRequest } from "fastify"
import { createLogger } from "@cleannation/shared-utils"
import { registerConnection, removeConnection } from "./notifier"

const logger = createLogger("gamification-service")

export function handleGamificationWebSocket(
  socket: WebSocket,
  request: FastifyRequest
): void {
  const userId = request.headers["x-user-id"]

  if (typeof userId !== "string" || userId === "") {
    socket.send(
      JSON.stringify({
        type: "error",
        code: "UNAUTHORIZED",
        message: "Missing user identity",
      })
    )
    socket.close(4001, "Unauthorized")
    return
  }

  registerConnection(userId, socket)

  // Send connection acknowledgement
  socket.send(
    JSON.stringify({
      type: "connected",
      userId,
      message: "Live updates active. Points and badges will push here.",
    })
  )

  // Keepalive ping
  const pingInterval = setInterval(() => {
    if (socket.readyState === 1) {
      socket.ping()
    } else {
      clearInterval(pingInterval)
    }
  }, 30_000)

  socket.on("message", (data: Buffer | string) => {
    const raw = typeof data === "string" ? data : data.toString("utf-8")
    try {
      const msg = JSON.parse(raw) as { type?: string }
      if (msg.type === "ping") {
        socket.send(
          JSON.stringify({ type: "pong", timestamp: new Date().toISOString() })
        )
      }
    } catch {
      // Ignore malformed messages
    }
  })

  socket.on("close", () => {
    clearInterval(pingInterval)
    removeConnection(userId)
    logger.info({ userId }, "Gamification WS closed")
  })

  socket.on("error", (err: Error) => {
    logger.error({ userId, error: err.message }, "Gamification WS error")
  })
}