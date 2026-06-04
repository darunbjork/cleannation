// packages/shared-types/src/auth/rbac.types.ts
// Role hierarchy for CleanNation.
// Every JWT payload contains one of these roles.
// The API Gateway checks this before routing to any service.
export const ROLE_PERMISSIONS = {
    volunteer: [
        "event:read",
    ],
    organizer: [
        "event:read",
        "event:create",
        "event:update",
        "event:delete",
    ],
    org_admin: [
        "event:read",
        "event:create",
        "event:update",
        "event:delete",
        "org:manage",
        "payment:manage",
    ],
    platform_admin: [
        "event:read",
        "event:create",
        "event:update",
        "event:delete",
        "org:manage",
        "payment:manage",
        "media:verify",
        "platform:admin",
        "user:ban",
    ],
};
//# sourceMappingURL=rbac.types.js.map