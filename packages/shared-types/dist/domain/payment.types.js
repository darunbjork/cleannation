// packages/shared-types/src/domain/payment.types.ts
// Subscription and payment types.
// payment-service owns these records.
// Tier feature flags — checked by other services via JWT claim
export const TIER_FEATURES = {
    free: {
        maxEventsPerMonth: 0, // cannot create events
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
        maxEventsPerMonth: -1, // -1 = unlimited
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
        soapApiAccess: true, // SOAP required for gov procurement systems
        slaGuarantee: true,
    },
};
//# sourceMappingURL=payment.types.js.map