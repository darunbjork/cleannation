import { NotFoundError, createLogger } from "@cleannation/shared-utils"
import { ZoneRepository } from "../repositories/zone.repository"

const logger = createLogger("location-service")

export class ZoneService {
  private readonly zoneRepo = new ZoneRepository()

  async getById(id: string) {
    const zone = await this.zoneRepo.findById(id)
    if (zone === null) throw new NotFoundError("Zone")
    return zone
  }

  async findNearby(lat: number, lng: number, radiusMeters: number) {
    // Cap radius at 50km — prevents abuse / excessive query load
    const cappedRadius = Math.min(radiusMeters, 50_000)

    return this.zoneRepo.findNearby(lat, lng, cappedRadius)
  }

  async list(filters: {
    country?: string
    region?: string
    page: number
    limit: number
  }) {
    return this.zoneRepo.findAll({
      ...filters,
      limit: Math.min(filters.limit, 100),
    })
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
  }) {
    const zone = await this.zoneRepo.create(data)

    logger.info(
      { zoneId: zone.id, lat: data.lat, lng: data.lng },
      "Zone created"
    )

    return zone
  }

  async isPointInZone(
    zoneId: string,
    lat: number,
    lng: number
  ): Promise<boolean> {
    return this.zoneRepo.isPointInZone(zoneId, lat, lng)
  }
}