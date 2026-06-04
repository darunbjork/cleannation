// packages/shared-types/src/auth/rbac.types.ts
// Role hierarchy for CleanNation.
// Every JWT payload contains one of these roles.
// The API Gateway checks this before routing to any service.

export type UserRole =
  | "volunteer"      // can join events, earn points
  | "organizer"      // can create events, view attendees
  | "org_admin"      // manages an organization's team + billing
  | "platform_admin" // CleanNation staff — full access

// Permissions are checked server-side only.
// Frontend role checks are UX convenience, never security.
export type Permission =
  | "event:create"
  | "event:delete"
  | "event:update"
  | "event:read"
  | "media:verify"
  | "org:manage"
  | "payment:manage"
  | "platform:admin"
  | "user:ban"

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
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
} as const
