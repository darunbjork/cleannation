export type SubscriptionTier =
  | "free"
  | "organizer"
  | "pro_organizer"
  | "enterprise"
  | "municipality"

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
  stripeSubscriptionId: string | null
  cancelAtPeriodEnd: boolean
  createdAt: string
  updatedAt: string
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

export const TIER_FEATURES: Record<SubscriptionTier, TierFeatures> = {
  free: {
    maxEventsPerMonth: 0,
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
    maxEventsPerMonth: -1,
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
    soapApiAccess: true,
    slaGuarantee: true,
  },
}
