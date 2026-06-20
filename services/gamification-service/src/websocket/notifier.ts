// services/gamification-service/src/websocket/notifier.ts
// WebSocket notification registry.
// Maintains a map of userId → WebSocket connection.
// Used by points.service and badge.service to push live updates.
//
// NOTE: Single-instance in-memory map.
// Horizontal scaling requires Redis Pub/Sub — same evolution
// path as location-service WebSocket rooms.

import type { WebSocket } from "ws"
import { createLogger } from "@cleannation/shared-utils"

const logger = createLogger("gamification-service")

// Active WebSocket connections: userId → socket
const connections = new Map<string, WebSocket>()

export function registerConnection(
  userId: string,
  socket: WebSocket
): void {
  // Remove existing connection if user reconnects (tab refresh)
  const existing = connections.get(userId)
  if (existing !== undefined && existing.readyState === 1) {
    existing.close(1000, "Replaced by new connection")
  }
  connections.set(userId, socket)
  logger.info({ userId, totalConnections: connections.size }, "WS registered")
}

export function removeConnection(userId: string): void {
  connections.delete(userId)
  logger.info({ userId, totalConnections: connections.size }, "WS removed")
}

// Send a notification to a specific user's WebSocket
// Returns true if sent, false if user is not connected
export function notifyUser(
  userId: string,
  message: {
    type: "points_awarded" | "badge_earned" | "rank_changed"
    payload: Record<string, unknown>
  }
): boolean {
  const socket = connections.get(userId)

  if (socket === undefined || socket.readyState !== 1) {
    // User not connected — this is normal, not an error
    return false
  }

  try {
    socket.send(
      JSON.stringify({
        ...message,
        timestamp: new Date().toISOString(),
      })
    )
    return true
  } catch (error: unknown) {
    logger.error(
      {
        userId,
        error: error instanceof Error ? error.message : "unknown",
      },
      "Failed to send WebSocket notification"
    )
    connections.delete(userId)
    return false
  }
}

export function getConnectionCount(): number {
  return connections.size
}