// services/location-service/src/websocket/room.manager.ts
// In-memory room management for WebSocket tracking sessions.

import type { WebSocket } from "ws"
import type {
  ParticipantPosition,
  OutboundMessage,
} from "./messages"
import { serializeOutboundMessage } from "./messages"
import { createLogger } from "@cleannation/shared-utils"
import { config } from "../config/index"

const logger = createLogger("location-service")

interface ConnectionState {
  socket: WebSocket
  userId: string
  connectedAt: Date
  updateTimestamps: number[]
}

export class RoomManager {
  // rooms: eventId → Map of userId → ConnectionState
  private readonly rooms = new Map<string, Map<string, ConnectionState>>()

  // positions: userId → last known position
  private readonly positions = new Map<string, ParticipantPosition>()

  // Add a participant to a room
  join(
    eventId: string,
    userId: string,
    socket: WebSocket
  ): { success: boolean; reason?: string } {
    let room = this.rooms.get(eventId)

    if (room === undefined) {
      room = new Map()
      this.rooms.set(eventId, room)
    }

    if (room.size >= config.websocket.maxRoomSize) {
      return {
        success: false,
        reason: `Room is at capacity (${config.websocket.maxRoomSize} participants)`,
      }
    }

    if (room.has(userId)) {
      this.leave(eventId, userId)
    }

    room.set(userId, {
      socket,
      userId,
      connectedAt: new Date(),
      updateTimestamps: [],
    })

    logger.info(
      { eventId, userId, roomSize: room.size },
      "Participant joined tracking room"
    )

    return { success: true }
  }

  // Remove a participant from a room
  leave(eventId: string, userId: string): void {
    const room = this.rooms.get(eventId)
    if (room === undefined) return

    room.delete(userId)
    this.positions.delete(userId)

    if (room.size === 0) {
      this.rooms.delete(eventId)
      logger.info({ eventId }, "Tracking room closed (empty)")
    }

    logger.info({ eventId, userId }, "Participant left tracking room")
  }

  // Remove a participant from ALL rooms they are in
  leaveAll(userId: string): string[] {
    const leftRooms: string[] = []

    for (const [eventId, room] of this.rooms.entries()) {
      if (room.has(userId)) {
        this.leave(eventId, userId)
        leftRooms.push(eventId)
      }
    }

    return leftRooms
  }

  // Update position and broadcast to room
  updatePosition(
    eventId: string,
    userId: string,
    lat: number,
    lng: number,
    accuracy: number
  ): boolean {
    const room = this.rooms.get(eventId)
    if (room === undefined) return false

    const connection = room.get(userId)
    if (connection === undefined) return false

    const now = Date.now()
    connection.updateTimestamps = connection.updateTimestamps.filter(
      (ts) => now - ts < 1000
    )

    if (
      connection.updateTimestamps.length >=
      config.websocket.maxUpdatesPerSecond
    ) {
      return false
    }

    connection.updateTimestamps.push(now)

    const position: ParticipantPosition = {
      userId,
      lat,
      lng,
      accuracy,
      timestamp: new Date().toISOString(),
    }
    this.positions.set(userId, position)

    const broadcastMsg: OutboundMessage = {
      type: "position_broadcast",
      eventId,
      userId,
      lat,
      lng,
      accuracy,
      timestamp: position.timestamp,
    }

    this.broadcastToRoom(eventId, broadcastMsg, userId)

    return true
  }

  // Get current positions of all participants in a room
  getRoomPositions(eventId: string): ParticipantPosition[] {
    const room = this.rooms.get(eventId)
    if (room === undefined) return []

    return Array.from(room.keys())
      .map((userId) => this.positions.get(userId))
      .filter((pos): pos is ParticipantPosition => pos !== undefined)
  }

  getRoomSize(eventId: string): number {
    return this.rooms.get(eventId)?.size ?? 0
  }

  // Broadcast a message to all participants in a room
  broadcastToRoom(
    eventId: string,
    message: OutboundMessage,
    excludeUserId?: string
  ): void {
    const room = this.rooms.get(eventId)
    if (room === undefined) return

    const serialized = serializeOutboundMessage(message)
    let sent = 0
    let failed = 0

    for (const [userId, connection] of room.entries()) {
      if (userId === excludeUserId) continue

      if (connection.socket.readyState === 1) { // 1 = OPEN
        connection.socket.send(serialized)
        sent++
      } else {
        room.delete(userId)
        this.positions.delete(userId)
        failed++
      }
    }

    if (failed > 0) {
      logger.warn(
        { eventId, sent, failed },
        "Stale connections cleaned during broadcast"
      )
    }
  }

  getStats(): {
    totalRooms: number
    totalConnections: number
    roomSizes: Record<string, number>
  } {
    const roomSizes: Record<string, number> = {}
    let totalConnections = 0

    for (const [eventId, room] of this.rooms.entries()) {
      roomSizes[eventId] = room.size
      totalConnections += room.size
    }

    return {
      totalRooms: this.rooms.size,
      totalConnections,
      roomSizes,
    }
  }
}

export const roomManager = new RoomManager()
