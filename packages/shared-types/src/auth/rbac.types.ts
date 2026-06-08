export type UserRole =
  | "volunteer"
  | "organizer"
  | "org_admin"
  | "platform_admin"

export type Permission =
  | "event:create"
  | "event:delete"
  | "event:update"
  | "event:read"
  | "media:verify"
  | "org:manage"
  | "platform:admin"
  | "payment:manage"
  | "user:ban"

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  volunteer: ["event:read"],
  organizer: ["event:read", "event:create", "event:update", "event:delete"],
  org_admin: ["event:read", "event:create", "event:update", "event:delete", "org:manage", "payment:manage"],
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
