// services/event-service/src/services/tier.service.ts
// Subscription tier enforcement.
//
// The subscription tier is passed via the x-user-role header
// from the gateway (derived from JWT). For org-level features,
// we would call the payment-service via gRPC to get the
// organization's current tier.
//
// For this step: tier comes from the JWT role.
// Platform organizers get pro_organizer features.
// The payment-service integration is added in Step 9.

import {
  SubscriptionRequiredError,
  TierLimitReachedError,
} from "@cleannation/shared-utils"
import type { SubscriptionTier } from "@cleannation/shared-types"
import { config } from "../config/index"
import { EventRepository } from "../repositories/event.repository"

export class TierService {
  private readonly eventRepo = new EventRepository()

  // Maps user role to effective subscription tier
  // In Step 9, this will call payment-service for org tier
  roleTotier(role: string): SubscriptionTier {
    const map: Record<string, SubscriptionTier> = {
      volunteer: "free",
      organizer: "organizer",
      org_admin: "pro_organizer",
      platform_admin: "municipality",
    }
    return map[role] ?? "free"
  }

  async assertCanCreateEvent(
    userId: string,
    role: string
  ): Promise<void> {
    const tier = this.roleTotier(role)
    const limits = config.tierLimits[tier]

    // Free tier cannot create events at all
    if (limits.maxEventsPerMonth === 0) {
      throw new SubscriptionRequiredError("organizer")
    }

    // Unlimited tier (-1) — skip count check
    if (limits.maxEventsPerMonth === -1) {
      return
    }

    // Count events this month for this organizer
    const countThisMonth =
      await this.eventRepo.countByOrganizerThisMonth(userId)

    if (countThisMonth >= limits.maxEventsPerMonth) {
      throw new TierLimitReachedError(
        "events per month",
        limits.maxEventsPerMonth
      )
    }
  }
}
