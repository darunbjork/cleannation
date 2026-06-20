// services/gamification-service/src/graphql/schema/index.ts
// GraphQL schema — leaderboard and stats queries.
// Read-only by design. All mutations come from Kafka events.

export const typeDefs = `#graphql

  type Query {
    # Global leaderboard — served from Redis (O(log n))
    leaderboard(
      period: LeaderboardPeriod
      page: Int
      limit: Int
    ): LeaderboardPage!

    # Your own stats and rank
    myStats: UserStats

    # All available badges
    badges: [Badge!]!

    # Badges a specific user has earned
    userBadges(userId: ID!): [UserBadge!]!
  }

  type LeaderboardPage {
    scope: String!
    period: String!
    entries: [LeaderboardEntry!]!
    totalCount: Int!
    # Rank of the requesting user (null if not on leaderboard)
    userRank: Int
    pagination: PaginationMeta!
  }

  type LeaderboardEntry {
    rank: Int!
    userId: ID!
    totalPoints: Int!
  }

  type UserStats {
    userId: ID!
    totalPoints: Int!
    eventsJoined: Int!
    eventsCompleted: Int!
    currentStreakDays: Int!
    longestStreakDays: Int!
    globalRank: Int
    monthlyRank: Int
    badges: [UserBadge!]!
  }

  type Badge {
    id: ID!
    category: BadgeCategory!
    name: String!
    description: String!
    iconUrl: String!
    pointsBonus: Int!
    rarity: BadgeRarity!
  }

  type UserBadge {
    id: ID!
    badge: Badge!
    earnedAt: String!
  }

  type PaginationMeta {
    page: Int!
    limit: Int!
    total: Int!
    hasNext: Boolean!
    hasPrev: Boolean!
  }

  enum LeaderboardPeriod {
    ALL_TIME
    THIS_MONTH
  }

  enum BadgeCategory {
    FIRST_CLEANUP
    EVENTS_10
    EVENTS_50
    EVENTS_100
    STREAK_7DAY
    STREAK_30DAY
    REGION_CHAMPION
    NATIONAL_CHAMPION
    TON_COLLECTED
    ORGANIZER_100
  }

  enum BadgeRarity {
    COMMON
    RARE
    EPIC
    LEGENDARY
  }
`