export type UserRole = "volunteer" | "organizer" | "org_admin" | "platform_admin";
export type Permission = "event:create" | "event:delete" | "event:update" | "event:read" | "media:verify" | "org:manage" | "payment:manage" | "platform:admin" | "user:ban";
export declare const ROLE_PERMISSIONS: Record<UserRole, Permission[]>;
//# sourceMappingURL=rbac.types.d.ts.map