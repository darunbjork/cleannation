// services/location-service/src/repositories/zone.repository.ts
// PostGIS spatial queries — raw SQL required.

import { prisma } from "../db/prisma"
import { createLogger } from "@cleannation/shared-utils"

const logger = createLogger("location-service")

export interface ZoneRow {
  id: string
  name: string
  description: string
  radiusMeters: number
  country: string
  region: string
  city: string
  eventId: string | null
  createdAt: Date
  updatedAt: Date
  distanceMeters?: number
  centerLat?: number
  centerLng?: number
}

export class ZoneRepository {

  async findById(id: string): Promise<ZoneRow | null> {
    const results = await prisma.$queryRaw<ZoneRow[]>`
      SELECT
        id, name, description, "radiusMeters",
        country, region, city, "eventId",
        "createdAt", "updatedAt",
        ST_Y(center::geometry) AS "centerLat",
        ST_X(center::geometry) AS "centerLng"
      FROM "CleanupZone"
      WHERE id = ${id}
      LIMIT 1
    `
    return results[0] ?? null
  }

  async findNearby(
    lat: number,
    lng: number,
    radiusMeters: number,
    limit = 20
  ): Promise<ZoneRow[]> {
    return prisma.$queryRaw<ZoneRow[]>`
      SELECT
        id, name, description, "radiusMeters",
        country, region, city, "eventId",
        "createdAt", "updatedAt",
        ST_Distance(
          center,
          ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography
        ) AS "distanceMeters",
        ST_Y(center::geometry) AS "centerLat",
        ST_X(center::geometry) AS "centerLng"
      FROM "CleanupZone"
      WHERE ST_DWithin(
        center,
        ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography,
        ${radiusMeters}
      )
      ORDER BY "distanceMeters" ASC
      LIMIT ${limit}
    `
  }

  async isPointInZone(
    zoneId: string,
    lat: number,
    lng: number
  ): Promise<boolean> {
    const results = await prisma.$queryRaw<[{ inside: boolean }]>`
      SELECT ST_DWithin(
        center,
        ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography,
        "radiusMeters"
      ) AS inside
      FROM "CleanupZone"
      WHERE id = ${zoneId}
    `
    return results[0]?.inside ?? false
  }

  async create(data: {
    name: string
    description: string
    lat: number
    lng: number
    radiusMeters: number
    country: string
    region: string
    city: string
    eventId?: string
  }): Promise<ZoneRow> {
    const results = await prisma.$queryRaw<ZoneRow[]>`
      INSERT INTO "CleanupZone" (
        id, name, description, center, "radiusMeters",
        country, region, city, "eventId", "createdAt", "updatedAt"
      ) VALUES (
        gen_random_uuid()::text,
        ${data.name},
        ${data.description},
        ST_SetSRID(ST_MakePoint(${data.lng}, ${data.lat}), 4326)::geography,
        ${data.radiusMeters},
        ${data.country},
        ${data.region},
        ${data.city},
        ${data.eventId ?? null},
        NOW(),
        NOW()
      )
      RETURNING
        id, name, description, "radiusMeters",
        country, region, city, "eventId",
        "createdAt", "updatedAt",
        ST_Y(center::geometry) AS "centerLat",
        ST_X(center::geometry) AS "centerLng"
    `

    const result = results[0]
    if (result === undefined) {
      throw new Error("Zone creation returned no result")
    }

    logger.info({ zoneId: result.id }, "Zone created")
    return result
  }

  async findAll(filters: {
    country?: string
    region?: string
    page: number
    limit: number
  }): Promise<{ zones: ZoneRow[]; total: number }> {
    const conditions: string[] = []
    if (filters.country !== undefined) {
      conditions.push(`country = '${filters.country}'`)
    }
    if (filters.region !== undefined) {
      conditions.push(`region = '${filters.region}'`)
    }

    const whereClause =
      conditions.length > 0
        ? `WHERE ${conditions.join(" AND ")}`
        : ""

    const offset = (filters.page - 1) * filters.limit

    const [zones, countResult] = await Promise.all([
      prisma.$queryRawUnsafe<ZoneRow[]>(`
        SELECT
          id, name, description, "radiusMeters",
          country, region, city, "eventId",
          "createdAt", "updatedAt",
          ST_Y(center::geometry) AS "centerLat",
          ST_X(center::geometry) AS "centerLng"
        FROM "CleanupZone"
        ${whereClause}
        ORDER BY "createdAt" DESC
        LIMIT ${filters.limit} OFFSET ${offset}
      `),
      prisma.$queryRawUnsafe<[{ count: bigint }]>(
        `SELECT COUNT(*) as count FROM "CleanupZone" ${whereClause}`
      ),
    ])

    return {
      zones,
      total: Number(countResult[0]?.count ?? 0),
    }
  }
}
