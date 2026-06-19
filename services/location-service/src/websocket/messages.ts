// services/location-service/src/websocket/messages.ts
// Typed WebSocket message contracts.

// ── INBOUND (client → server) ──────────────────────────────────────────

export type InboundMessage =
  | JoinRoomMessage
  | LeaveRoomMessage
  | PositionUpdateMessage
  | PingMessage

export interface JoinRoomMessage {
  type: "join_room"
  eventId: string
}

export interface LeaveRoomMessage {
  type: "leave_room"
  eventId: string
}

export interface PositionUpdateMessage {
  type: "position_update"
  eventId: string
  lat: number
  lng: number
  accuracy: number    // GPS accuracy in metres
}

export interface PingMessage {
  type: "ping"
}

// ── OUTBOUND (server → client) ─────────────────────────────────────────

export type OutboundMessage =
  | RoomJoinedMessage
  | ParticipantJoinedMessage
  | ParticipantLeftMessage
  | PositionBroadcastMessage
  | ZoneAlertMessage
  | ErrorMessage
  | PongMessage

export interface RoomJoinedMessage {
  type: "room_joined"
  eventId: string
  participantCount: number
  currentPositions: ParticipantPosition[]
}

export interface ParticipantJoinedMessage {
  type: "participant_joined"
  eventId: string
  userId: string
  participantCount: number
}

export interface ParticipantLeftMessage {
  type: "participant_left"
  eventId: string
  userId: string
  participantCount: number
}

export interface PositionBroadcastMessage {
  type: "position_broadcast"
  eventId: string
  userId: string
  lat: number
  lng: number
  accuracy: number
  timestamp: string
}

export interface ZoneAlertMessage {
  type: "zone_alert"
  eventId: string
  message: string
}

export interface ErrorMessage {
  type: "error"
  code: string
  message: string
}

export interface PongMessage {
  type: "pong"
  timestamp: string
}

export interface ParticipantPosition {
  userId: string
  lat: number
  lng: number
  accuracy: number
  timestamp: string
}

// ── RUNTIME PARSER ─────────────────────────────────────────────────────

export function parseInboundMessage(
  raw: string
): InboundMessage | null {
  try {
    const parsed: unknown = JSON.parse(raw)

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("type" in parsed) ||
      typeof (parsed as Record<string, unknown>)["type"] !== "string"
    ) {
      return null
    }

    const msg = parsed as Record<string, unknown>

    switch (msg["type"]) {
      case "join_room":
        if (typeof msg["eventId"] !== "string") return null
        return { type: "join_room", eventId: msg["eventId"] }

      case "leave_room":
        if (typeof msg["eventId"] !== "string") return null
        return { type: "leave_room", eventId: msg["eventId"] }

      case "position_update":
        if (
          typeof msg["eventId"] !== "string" ||
          typeof msg["lat"] !== "number" ||
          typeof msg["lng"] !== "number" ||
          typeof msg["accuracy"] !== "number"
        ) {
          return null
        }
        if (
          msg["lat"] < -90 || msg["lat"] > 90 ||
          msg["lng"] < -180 || msg["lng"] > 180
        ) {
          return null
        }
        return {
          type: "position_update",
          eventId: msg["eventId"],
          lat: msg["lat"],
          lng: msg["lng"],
          accuracy: msg["accuracy"],
        }

      case "ping":
        return { type: "ping" }

      default:
        return null
    }
  } catch {
    return null
  }
}

export function serializeOutboundMessage(
  msg: OutboundMessage
): string {
  return JSON.stringify(msg)
}
