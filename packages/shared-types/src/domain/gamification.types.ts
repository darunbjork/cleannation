// packages/shared-types/src/domain/gamification.types.ts
// Points, badges, and leaderboard types.
// gamification-service owns these records.

export type BadgeCategory =
  | "first_cleanup"
  | "events_10"
  | "events_50"
  | "events_100"
  | "streak_7day"
  | "streak_30day"
  | "region_champion"
  | "national_champion"
  | "ton_collected"       // 1000kg of waste across events
  | "organizer_100"       // organized events with 100+ participants

export interface Badge {
  id: string
  category: BadgeCategory
  name: string
  description: string
  iconUrl: string
  pointsBonus: number     // extra points awarded when badge is earned
  rarity: "common" | "rare" | "epic" | "legendary"
}

export interface UserStats {
  userId: string
  totalPoints: number
  eventsJoined: number
  eventsCompleted: number
  currentStreakDays: number
  longestStreakDays: number
  kgWasteEstimated: number  // estimated from event reports
  badgesEarned: BadgeCategory[]
  globalRank: number | null    // null if not enough data
  regionRank: number | null
  updatedAt: string
}

export interface LeaderboardEntry {
  rank: number
  userId: string
  displayName: string
  avatarUrl: string | null
  totalPoints: number
  eventsCompleted: number
  badgeCount: number
}

export type LeaderboardScope = "global" | "national" | "regional" | "city"

export interface Leaderboard {
  scope: LeaderboardScope
  scopeId: string | null    // null for global, countryCode/regionId/cityId otherwise
  period: "all_time" | "this_month" | "this_week"
  entries: LeaderboardEntry[]
  generatedAt: string
}

// WebSocket message for live point updates during active events
export type GamificationWsMessage =
  | { type: "points_awarded"; payload: { userId: string; points: number; reason: string } }
  | { type: "badge_earned"; payload: { userId: string; badge: Badge } }
  | { type: "rank_changed"; payload: { userId: string; oldRank: number; newRank: number } }
