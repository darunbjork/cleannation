// packages/shared-types/src/domain/location.types.ts
// Geographic types for location-service.
// Uses GeoJSON conventions — compatible with PostGIS and Leaflet.

export interface Coordinates {
  lat: number   // latitude: -90 to 90
  lng: number   // longitude: -180 to 180
}

export interface CleanupZone {
  id: string
  name: string
  description: string
  center: Coordinates
  radiusMeters: number
  // GeoJSON polygon for complex zone boundaries
  boundary: GeoJsonPolygon | null
  country: string   // ISO 3166-1 alpha-2, e.g. "SE", "US"
  region: string
  city: string
  createdAt: string
}

// GeoJSON types — standard geographic interchange format
export interface GeoJsonPolygon {
  type: "Polygon"
  coordinates: number[][][]  // [[[lng, lat], [lng, lat], ...]]
}

export interface GeoJsonPoint {
  type: "Point"
  coordinates: [number, number]  // [lng, lat] — GeoJSON is lng first
}

// Real-time participant position — sent over WebSocket
export interface ParticipantPosition {
  userId: string
  eventId: string
  coordinates: Coordinates
  accuracy: number      // GPS accuracy in meters
  timestamp: string     // ISO 8601
  isActive: boolean
}

// WebSocket message shapes for location-service
export type LocationWsMessage =
  | { type: "position_update"; payload: ParticipantPosition }
  | { type: "participant_joined"; payload: { userId: string; eventId: string } }
  | { type: "participant_left"; payload: { userId: string; eventId: string } }
  | { type: "event_zone_alert"; payload: { userId: string; message: string } }
