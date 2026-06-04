// packages/shared-types/src/domain/payment.types.ts
// Subscription and payment types.
// payment-service owns these records.

export type SubscriptionTier =
  | "free"
  | "organizer"        // $19/mo
  | "pro_organizer"    // $49/mo
  | "enterprise"       // $299/mo
  | "municipality"     // custom pricing

export type SubscriptionStatus =
  | "active"
  | "past_due"
  | "cancelled"
  | "trialing"
  | "paused"

export interface Subscription {
  id: string
  organizationId: string
  tier: SubscriptionTier
  status: SubscriptionStatus
  currentPeriodStart: string
  currentPeriodEnd: string
  stripeSubscriptionId: string | null   // null for municipality (invoiced)
  cancelAtPeriodEnd: boolean
  createdAt: string
  updatedAt: string
}

// Tier feature flags — checked by other services via JWT claim
export const TIER_FEATURES: Record<SubscriptionTier, TierFeatures> = {
  free: {
    maxEventsPerMonth: 0,        // cannot create events
    maxParticipantsPerEvent: 0,
    aiPhotoVerification: false,
    analyticsExport: false,
    whiteLabel: false,
    soapApiAccess: false,
    slaGuarantee: false,
  },
  organizer: {
    maxEventsPerMonth: 4,
    maxParticipantsPerEvent: 50,
    aiPhotoVerification: false,
    analyticsExport: false,
    whiteLabel: false,
    soapApiAccess: false,
    slaGuarantee: false,
  },
  pro_organizer: {
    maxEventsPerMonth: -1,       // -1 = unlimited
    maxParticipantsPerEvent: -1,
    aiPhotoVerification: true,
    analyticsExport: true,
    whiteLabel: false,
    soapApiAccess: false,
    slaGuarantee: false,
  },
  enterprise: {
    maxEventsPerMonth: -1,
    maxParticipantsPerEvent: -1,
    aiPhotoVerification: true,
    analyticsExport: true,
    whiteLabel: true,
    soapApiAccess: true,
    slaGuarantee: false,
  },
  municipality: {
    maxEventsPerMonth: -1,
    maxParticipantsPerEvent: -1,
    aiPhotoVerification: true,
    analyticsExport: true,
    whiteLabel: true,
    soapApiAccess: true,   // SOAP required for gov procurement systems
    slaGuarantee: true,
  },
}

export interface TierFeatures {
  maxEventsPerMonth: number
  maxParticipantsPerEvent: number
  aiPhotoVerification: boolean
  analyticsExport: boolean
  whiteLabel: boolean
  soapApiAccess: boolean
  slaGuarantee: boolean
}
