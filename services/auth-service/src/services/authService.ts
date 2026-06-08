import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import Redis from 'ioredis';

const prisma = new PrismaClient();
const redis = new Redis();

export async function registerUser(email: string, password: string) {
  const hashedPassword = await argon2.hash(password);
  
  // First user becomes platform_admin
  const userCount = await prisma.user.count();
  const role = userCount === 0 ? 'platform_admin' : 'user';

  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
    },
  });
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await argon2.verify(user.password, password))) {
    throw new Error('Invalid credentials');
  }
  
  const privateKey = process.env.JWT_PRIVATE_KEY || ''; // Should be loaded securely
  
  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    privateKey,
    { algorithm: 'RS256', expiresIn: '15m' }
  );

  const refreshToken = await createRefreshToken(user.id);
  return { accessToken, refreshToken: refreshToken.token, user };
}

export async function createRefreshToken(userId: string) {
  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

  return await prisma.refreshToken.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });
}

export async function refreshAccessToken(oldToken: string) {
  // Check Redis
  const isRevoked = await redis.get(`revoked:${oldToken}`);
  if (isRevoked) {
    throw new Error('Token revoked');
  }

  const refreshToken = await prisma.refreshToken.findUnique({
    where: { token: oldToken },
    include: { user: true },
  });

  if (!refreshToken || refreshToken.expiresAt < new Date()) {
    throw new Error('Invalid or expired refresh token');
  }

  // Rotate token: delete old, create new
  await prisma.refreshToken.delete({ where: { id: refreshToken.id } });
  const newToken = await createRefreshToken(refreshToken.userId);

  const privateKey = process.env.JWT_PRIVATE_KEY || ''; 
  const accessToken = jwt.sign(
    { userId: refreshToken.userId, role: refreshToken.user.role },
    privateKey,
    { algorithm: 'RS256', expiresIn: '15m' }
  );

  return { accessToken, refreshToken: newToken.token };
}

export async function logoutUser(token: string) {
  // Add to redis blocklist
  await redis.set(`revoked:${token}`, 'true', 'EX', 7 * 24 * 60 * 60); // TTL 7 days
  await prisma.refreshToken.delete({ where: { token } });
}
