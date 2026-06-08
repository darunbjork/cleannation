export interface Coordinates {
  lat: number
  lng: number
}

export interface CleanupZone {
  id: string
  name: string
  description: string
  center: Coordinates
  radiusMeters: number
  boundary: GeoJsonPolygon | null
  country: string
  region: string
  city: string
  createdAt: string
}

export interface GeoJsonPolygon {
  type: "Polygon"
  coordinates: number[][][]
}

export interface GeoJsonPoint {
  type: "Point"
  coordinates: [number, number]
}

export interface ParticipantPosition {
  userId: string
  eventId: string
  coordinates: Coordinates
  accuracy: number
  timestamp: string
  isActive: boolean
}

export type LocationWsMessage =
  | { type: "position_update"; payload: ParticipantPosition }
  | { type: "participant_joined"; payload: { userId: string; eventId: string } }
  | { type: "participant_left"; payload: { userId: string; eventId: string } }
  | { type: "event_zone_alert"; payload: { userId: string; message: string } }
