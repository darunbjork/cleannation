import type { UserRole } from "../auth/rbac.types";
export interface User {
    id: string;
    email: string;
    username: string;
    displayName: string;
    avatarUrl: string | null;
    role: UserRole;
    organizationId: string | null;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}
export type PublicUser = Omit<User, never> & {
    readonly _brand: "PublicUser";
};
export interface JwtPayload {
    sub: string;
    email: string;
    role: UserRole;
    orgId: string | null;
    iat: number;
    exp: number;
}
export interface RegisterInput {
    email: string;
    username: string;
    password: string;
    displayName: string;
}
export interface LoginInput {
    email: string;
    password: string;
}
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    user: PublicUser;
}
//# sourceMappingURL=user.types.d.ts.map