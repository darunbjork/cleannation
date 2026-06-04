// packages/shared-types/src/domain/user.types.ts
// The User entity as it appears across all services.
// auth-service owns the full record.
// Other services receive the PublicUser shape — never password hashes.

import type { UserRole } from "../auth/rbac.types"

export interface User {
  id: string
  email: string
  username: string
  displayName: string
  avatarUrl: string | null
  role: UserRole
  organizationId: string | null
  isVerified: boolean
  createdAt: string   // ISO 8601 — always strings over the wire, never Date objects
  updatedAt: string
}

// Shape returned to other services and the frontend.
// Never includes passwordHash or internal fields.
export type PublicUser = Omit<User, never> & {
  readonly _brand: "PublicUser"  // nominal typing — prevents accidental assignment
}

// Shape embedded in JWT payload.
// Keep small — JWTs are sent on every request.
export interface JwtPayload {
  sub: string          // userId
  email: string
  role: UserRole
  orgId: string | null
  iat: number
  exp: number
}

// Validated registration input
export interface RegisterInput {
  email: string
  username: string
  password: string      // plaintext input — hashed before storage, never logged
  displayName: string
}

// Validated login input
export interface LoginInput {
  email: string
  password: string
}

// Auth service response after successful login or register
export interface AuthTokens {
  accessToken: string   // 15min expiry, RS256 signed
  refreshToken: string  // 7day expiry, stored as HttpOnly cookie
  user: PublicUser
}
