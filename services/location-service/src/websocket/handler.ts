// services/location-service/src/websocket/handler.ts
// WebSocket connection handler.

import type { WebSocket } from "ws"
import type { FastifyRequest } from "fastify"
import { createLogger } from "@cleannation/shared-utils"
import { roomManager } from "./room.manager"
import {
  parseInboundMessage,
  serializeOutboundMessage,
  type OutboundMessage,
} from "./messages"
import { config } from "../config/index"

const logger = createLogger("location-service")

// Track which rooms each socket has joined
// Needed for cleanup on disconnect
const socketRooms = new WeakMap<WebSocket, Set<string>>()

export function handleWebSocketConnection(
  socket: WebSocket,
  request: FastifyRequest
): void {
  // Extract userId from request headers (injected by gateway)
  const userId = request.headers["x-user-id"]

  if (typeof userId !== "string" || userId === "") {
    socket.send(
      serializeOutboundMessage({
        type: "error",
        code: "UNAUTHORIZED",
        message: "Missing user identity. Reconnect with a valid token.",
      })
    )
    socket.close(4001, "Unauthorized")
    return
  }

  const correlationId = request.headers["x-correlation-id"]
  const connId = typeof correlationId === "string"
    ? correlationId
    : crypto.randomUUID()

  logger.info({ userId, connId }, "WebSocket connection established")

  // Track joined rooms for this socket
  const joinedRooms = new Set<string>()
  socketRooms.set(socket, joinedRooms)

  // ── PING/PONG KEEPALIVE ──────────────────────────────────────────────
  let pongTimeout: ReturnType<typeof setTimeout> | null = null

  const pingInterval = setInterval(() => {
    if (socket.readyState !== 1) { // 1 = OPEN
      clearInterval(pingInterval)
      return
    }

    socket.ping()

    pongTimeout = setTimeout(() => {
      logger.warn({ userId }, "WebSocket pong timeout — closing dead connection")
      socket.terminate()
    }, config.websocket.pongTimeoutMs)
  }, config.websocket.pingIntervalMs)

  socket.on("pong", () => {
    if (pongTimeout !== null) {
      clearTimeout(pongTimeout)
      pongTimeout = null
    }
  })

  // ── MESSAGE HANDLER ──────────────────────────────────────────────────
  socket.on("message", (data: Buffer | string) => {
    const raw = typeof data === "string" ? data : data.toString("utf-8")
    const message = parseInboundMessage(raw)

    if (message === null) {
      logger.warn(
        { userId, raw: raw.slice(0, 100) },
        "Invalid WebSocket message — dropped"
      )
      return
    }

    switch (message.type) {
      case "ping": {
        const pong: OutboundMessage = {
          type: "pong",
          timestamp: new Date().toISOString(),
        }
        socket.send(serializeOutboundMessage(pong))
        break
      }

      case "join_room": {
        const { eventId } = message

        const result = roomManager.join(eventId, userId, socket)

        if (!result.success) {
          socket.send(
            serializeOutboundMessage({
              type: "error",
              code: "ROOM_FULL",
              message: result.reason ?? "Could not join room",
            })
          )
          return
        }

        joinedRooms.add(eventId)

        // Send current positions to the new participant
        const currentPositions = roomManager.getRoomPositions(eventId)
        const roomSize = roomManager.getRoomSize(eventId)

        socket.send(
          serializeOutboundMessage({
            type: "room_joined",
            eventId,
            participantCount: roomSize,
            currentPositions,
          })
        )

        // Broadcast to other participants that someone joined
        roomManager.broadcastToRoom(
          eventId,
          {
            type: "participant_joined",
            eventId,
            userId,
            participantCount: roomSize,
          },
          userId  // exclude sender
        )

        logger.info(
          { userId, eventId, roomSize },
          "Participant joined tracking room"
        )
        break
      }

      case "leave_room": {
        const { eventId } = message

        roomManager.leave(eventId, userId)
        joinedRooms.delete(eventId)

        const roomSize = roomManager.getRoomSize(eventId)

        roomManager.broadcastToRoom(eventId, {
          type: "participant_left",
          eventId,
          userId,
          participantCount: roomSize,
        })

        logger.info({ userId, eventId }, "Participant left tracking room")
        break
      }

      case "position_update": {
        const { eventId, lat, lng, accuracy } = message

        // Drop low-accuracy readings
        if (accuracy > 50) {
          logger.info(
            { userId, eventId, accuracy },
            "Position update dropped — low accuracy"
          )
          return
        }

        roomManager.updatePosition(eventId, userId, lat, lng, accuracy)
        break
      }
    }
  })

  // ── DISCONNECT HANDLER ───────────────────────────────────────────────
  socket.on("close", (code, reason) => {
    clearInterval(pingInterval)
    if (pongTimeout !== null) clearTimeout(pongTimeout)

    // Leave all rooms this socket was in
    for (const eventId of joinedRooms) {
      roomManager.leave(eventId, userId)
      const roomSize = roomManager.getRoomSize(eventId)

      roomManager.broadcastToRoom(eventId, {
        type: "participant_left",
        eventId,
        userId,
        participantCount: roomSize,
      })
    }

    logger.info(
      { userId, code, reason: reason.toString() },
      "WebSocket connection closed"
    )
  })

  socket.on("error", (error: Error) => {
    logger.error({ userId, error: error.message }, "WebSocket error")
  })
}
