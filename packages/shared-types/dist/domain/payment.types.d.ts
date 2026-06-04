export type SubscriptionTier = "free" | "organizer" | "pro_organizer" | "enterprise" | "municipality";
export type SubscriptionStatus = "active" | "past_due" | "cancelled" | "trialing" | "paused";
export interface Subscription {
    id: string;
    organizationId: string;
    tier: SubscriptionTier;
    status: SubscriptionStatus;
    currentPeriodStart: string;
    currentPeriodEnd: string;
    stripeSubscriptionId: string | null;
    cancelAtPeriodEnd: boolean;
    createdAt: string;
    updatedAt: string;
}
export declare const TIER_FEATURES: Record<SubscriptionTier, TierFeatures>;
export interface TierFeatures {
    maxEventsPerMonth: number;
    maxParticipantsPerEvent: number;
    aiPhotoVerification: boolean;
    analyticsExport: boolean;
    whiteLabel: boolean;
    soapApiAccess: boolean;
    slaGuarantee: boolean;
}
//# sourceMappingURL=payment.types.d.ts.map