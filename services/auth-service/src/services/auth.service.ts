// services/auth-service/src/services/auth.service.ts
// Core authentication business logic.
// This service ONLY throws AppError subclasses — never plain Errors.
// The global error handler maps AppError → HTTP response automatically.

import type { UserRole } from "@cleannation/shared-types"
import {
  EmailAlreadyExistsError,
  UsernameAlreadyExistsError,
  InvalidCredentialsError,
  UnauthorizedError,
  createLogger,
  logServiceError,
} from "@cleannation/shared-utils"
import { config } from "../config/index"
import { UserRepository } from "../repositories/user.repository"
import { RefreshTokenRepository } from "../repositories/refreshToken.repository"
import { PasswordService } from "./password.service"
import { TokenService } from "./token.service"

const logger = createLogger("auth-service")

// Maps Prisma enum to shared-types role string
function mapRole(
  prismaRole: "VOLUNTEER" | "ORGANIZER" | "ORG_ADMIN" | "PLATFORM_ADMIN"
): UserRole {
  const map: Record<typeof prismaRole, UserRole> = {
    VOLUNTEER: "volunteer",
    ORGANIZER: "organizer",
    ORG_ADMIN: "org_admin",
    PLATFORM_ADMIN: "platform_admin",
  }
  return map[prismaRole]
}

export class AuthService {
  private readonly userRepo = new UserRepository()
  private readonly tokenRepo = new RefreshTokenRepository()
  private readonly passwordService = new PasswordService()
  private readonly tokenService = new TokenService()

  async register(input: {
    email: string
    username: string
    password: string
    displayName: string
    userAgent?: string
    ipAddress?: string
  }) {
    // Check for duplicate email
    const existingEmail = await this.userRepo.findByEmail(input.email)
    if (existingEmail !== null) {
      throw new EmailAlreadyExistsError()
    }

    // Check for duplicate username
    const existingUsername = await this.userRepo.findByUsername(
      input.username
    )
    if (existingUsername !== null) {
      throw new UsernameAlreadyExistsError()
    }

    // Hash password BEFORE any other DB operations.
    // Argon2id is ~300ms — do this first so we do not hold
    // a DB transaction open during the slow hashing operation.
    const passwordHash = await this.passwordService.hash(input.password)

    // First registered user becomes platform_admin automatically.
    // This is checked atomically — count then create in sequence.
    // Race condition: two simultaneous first-user registrations could
    // both get count=0 and both become admins. Acceptable for our
    // use case — platform launch scenario with one operator.
    const userCount = await this.userRepo.countAll()
    const role: "VOLUNTEER" | "PLATFORM_ADMIN" =
      userCount === 0 ? "PLATFORM_ADMIN" : "VOLUNTEER"

    const user = await this.userRepo.create({
      email: input.email,
      username: input.username,
      displayName: input.displayName,
      passwordHash,
      role,
    })

    logger.info(
      { userId: user.id, role, isFirstUser: userCount === 0 },
      "User registered"
    )

    // Issue token pair immediately after registration
    return this.issueTokenPair(user, {
      userAgent: input.userAgent,
      ipAddress: input.ipAddress,
    })
  }

  async login(input: {
    email: string
    password: string
    userAgent?: string
    ipAddress?: string
  }) {
    // Find user — always run password verification even if user not found.
    // This prevents timing attacks that detect valid email addresses.
    const user = await this.userRepo.findByEmail(input.email)

    // Dummy hash to verify against when user not found.
    // Without this, login for non-existent users returns ~0ms
    // (no hash needed) vs ~300ms for real users (Argon2id).
    // An attacker can detect valid emails via response time.
    const DUMMY_HASH =
      "$argon2id$v=19$m=65536,t=3,p=4$dGVzdHNhbHQ$c2VjcmV0aGFzaA"

    const isValid = await this.passwordService.verify(
      user?.passwordHash ?? DUMMY_HASH,
      input.password
    )

    // Unified error — never reveal whether email or password was wrong
    if (user === null || !isValid) {
      throw new InvalidCredentialsError()
    }

    if (user.isBanned) {
      // Use UnauthorizedError not ForbiddenError — do not confirm the email exists
      throw new UnauthorizedError("Account suspended")
    }

    logger.info({ userId: user.id }, "User logged in")

    // Check if hash needs upgrade (parameter changes over time)
    // Rehash transparently on login — user never notices
    if (this.passwordService.needsRehash(user.passwordHash)) {
      const newHash = await this.passwordService.hash(input.password)
      await this.userRepo.updatePasswordHash(user.id, newHash)
      logger.info({ userId: user.id }, "Password hash upgraded")
    }

    return this.issueTokenPair(user, {
      userAgent: input.userAgent,
      ipAddress: input.ipAddress,
    })
  }

  async refresh(input: {
    refreshTokenPlaintext: string
    userAgent?: string
    ipAddress?: string
  }) {
    const tokenHash = this.tokenService.hashRefreshToken(
      input.refreshTokenPlaintext
    )

    const storedToken = await this.tokenRepo.findByTokenHash(tokenHash)

    // Token not found
    if (storedToken === null) {
      throw new UnauthorizedError("Invalid refresh token")
    }

    // Token already revoked — possible token reuse attack
    if (storedToken.revokedAt !== null) {
      // SECURITY: revoke ALL tokens for this user immediately.
      // A revoked token being reused means either:
      // 1. A legitimate client has a bug (reusing old tokens)
      // 2. An attacker has stolen and used a token, then the
      //    legitimate client tried to refresh with the same token.
      // In both cases, forcing full re-auth is the safe response.
      await this.tokenRepo.revokeAllForUser(storedToken.userId)
      logger.warn(
        { userId: storedToken.userId, jti: storedToken.jti },
        "Refresh token reuse detected — all tokens revoked"
      )
      throw new UnauthorizedError("Token reuse detected. Please log in again.")
    }

    // Token expired
    if (storedToken.expiresAt < new Date()) {
      throw new UnauthorizedError("Refresh token expired")
    }

    // Check Redis blocklist
    const isBlocked = await this.tokenService.isBlocked(storedToken.jti)
    if (isBlocked) {
      throw new UnauthorizedError("Token has been revoked")
    }

    // Load user
    const user = await this.userRepo.findById(storedToken.userId)
    if (user === null || user.isBanned) {
      throw new UnauthorizedError("Account not found or suspended")
    }

    // ROTATION: revoke old token, issue new pair
    // This is the key security property — each refresh token is single-use
    await this.tokenRepo.revoke(storedToken.id)

    logger.info({ userId: user.id }, "Token refreshed")

    return this.issueTokenPair(user, {
      userAgent: input.userAgent,
      ipAddress: input.ipAddress,
    })
  }

  async logout(input: { refreshTokenPlaintext: string }): Promise<void> {
    const tokenHash = this.tokenService.hashRefreshToken(
      input.refreshTokenPlaintext
    )

    const storedToken = await this.tokenRepo.findByTokenHash(tokenHash)

    if (storedToken === null || storedToken.revokedAt !== null) {
      // Already logged out — idempotent, return success
      return
    }

    // Revoke in DB
    await this.tokenRepo.revoke(storedToken.id)

    // Add to Redis blocklist for instant invalidation
    const remainingMs =
      storedToken.expiresAt.getTime() - Date.now()
    const remainingSec = Math.max(
      0,
      Math.floor(remainingMs / 1000)
    )

    if (remainingSec > 0) {
      await this.tokenService.blockToken(storedToken.jti, remainingSec)
    }

    logger.info(
      { userId: storedToken.userId },
      "User logged out"
    )
  }

  // Private helper — issues access + refresh token pair
  // Called by register, login, and refresh
  private async issueTokenPair(
    user: {
      id: string
      email: string
      role: "VOLUNTEER" | "ORGANIZER" | "ORG_ADMIN" | "PLATFORM_ADMIN"
      organizationId: string | null
      displayName: string
      username: string
      avatarUrl: string | null
      isVerified: boolean
      createdAt: Date
      updatedAt: Date
    },
    meta: { userAgent?: string; ipAddress?: string }
  ) {
    const role = mapRole(user.role)

    const accessToken = this.tokenService.issueAccessToken({
      sub: user.id,
      email: user.email,
      role,
      orgId: user.organizationId,
    })

    const {
      plaintext: refreshTokenPlaintext,
      hash: refreshTokenHash,
      jti,
    } = this.tokenService.generateRefreshToken()

    const expiresAt = new Date(
      Date.now() + config.jwt.refreshTokenExpiryMs
    )

    await this.tokenRepo.create({
      userId: user.id,
      tokenHash: refreshTokenHash,
      jti,
      expiresAt,
      userAgent: meta.userAgent,
      ipAddress: meta.ipAddress,
    })

    return {
      accessToken,
      refreshToken: refreshTokenPlaintext,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        role,
        organizationId: user.organizationId,
        isVerified: user.isVerified,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
    }
  }
}