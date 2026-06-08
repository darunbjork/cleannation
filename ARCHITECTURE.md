# CleanNation — Architecture Decision Record

## What We Are Building
A civic SaaS platform enabling nationwide community cleanup coordination.
Organizers create events. Volunteers join and track participation.
AI verifies before/after photos. Gamification drives retention.
Enterprise orgs pay for white-label deployment.

---

## The Problem Space

### Core User Journeys

**Journey 1 — Volunteer**
Browse nearby events → Join event → GPS check-in on event day
→ Upload before photo → Clean area → Upload after photo
→ Earn points + badge → See leaderboard rank

**Journey 2 — Organizer**
Create cleanup zone on map → Set date/capacity → Invite community
→ Monitor real-time attendance → Download verified impact report
→ Share stats on social

**Journey 3 — Enterprise / Municipality**
Subscribe to org plan → White-label the platform → View
city-wide dashboard → Export data for grant applications
→ Pay via invoice (SOAP/EDI for government procurement)

---

## Bounded Domains (Why These 7 Services)

Each service owns its data. No service reads another's database directly.
Cross-service communication is either:
- Synchronous: REST (user-facing CRUD) or gRPC (internal, latency-sensitive)
- Asynchronous: Kafka events (fire-and-forget, fan-out)

### auth-service
- Owns: User identity, sessions, roles, OAuth providers
- Protocol: REST (standard HTTP auth flows, cookie semantics)
- Why REST not gRPC: OAuth2 callbacks require HTTP redirects.
  gRPC cannot handle browser redirects natively.
- Database: PostgreSQL (relational — users have roles, orgs, permissions)

### event-service
- Owns: Cleanup events, registrations, event status
- Protocol: REST (mutations) + GraphQL (reads — nested event+attendees+location in one query)
- Why GraphQL for reads: the event detail page needs event data +
  organizer profile + registered volunteers + location zone —
  4 REST calls vs 1 GraphQL query
- Database: PostgreSQL

### location-service
- Owns: GPS coordinates, cleanup zones, real-time tracking
- Protocol: REST (zone CRUD) + WebSocket (live participant tracking)
- Why WebSocket: GPS updates every 3–5 seconds per participant.
  100 participants = 20–33 HTTP requests/second if polling.
  WebSocket: 1 persistent connection per participant. Zero polling overhead.
- Database: PostGIS (PostgreSQL with geographic extensions)

### media-service
- Owns: Photo uploads, AI verification pipeline, before/after comparison
- Protocol: REST (upload endpoints) + gRPC (internal: event-service
  calls media-service to check verification status — binary, typed, fast)
- Why gRPC internally: verification status is checked on every event
  page load. REST JSON overhead at 10k concurrent users = measurable
  latency. gRPC Protobuf: ~77% smaller payload, HTTP/2 multiplexing.
- Database: PostgreSQL (metadata) + S3-compatible storage (Cloudflare R2)

### gamification-service
- Owns: Points, badges, streaks, leaderboards
- Protocol: GraphQL (leaderboard reads — complex nested queries)
  + WebSocket (live point updates during active events)
- Why GraphQL: "Top 10 volunteers this month in my region with their
  badge count and streak" is a single query. 6 REST calls otherwise.
- Database: PostgreSQL + Redis (leaderboard sorted sets — O(log n) rank lookup)

### notification-service
- Owns: Email, push notifications, SMS
- Protocol: Async Kafka consumer only — no direct API
- Why async: notifications are fire-and-forget. event-service should
  not wait for an email to send before returning "event created: 200 OK".
  Kafka decouples the send from the trigger. If email provider is down,
  messages queue — zero data loss.
- Database: PostgreSQL (notification log, preferences)

### payment-service
- Owns: Subscriptions, donations, invoices
- Protocol: REST (Stripe webhooks, standard checkout)
  + SOAP (government/enterprise procurement — many municipalities
  require EDI/SOAP for their accounting systems. Rejecting SOAP
  means losing the enterprise tier entirely.)
- Why SOAP here specifically: This is the one legitimate modern use
  case for SOAP. Government procurement systems (SAP, Oracle Financials)
  still speak SOAP/XML. We expose a SOAP endpoint for B2G sales only.
- Database: PostgreSQL

---

## API Gateway
Single entry point. Routes to services. Handles:
- JWT validation (so services don't each implement auth)
- Rate limiting (calibrated per endpoint type)
- Request logging with correlation IDs
- SSL termination

Tool: Kong (open source) or custom Fastify gateway

Rate limits:
- Auth endpoints: 5 req/min (brute-force protection)
- Event CRUD: 60 req/min
- Location WebSocket: 1 persistent connection/user
- Media upload: 10 req/min (storage cost protection)
- Gamification reads: 300 req/min (cached at Redis layer)
- Payment: 20 req/min

---

## Async Event Bus (Kafka Topics)

| Topic | Producer | Consumer(s) | Payload |
|---|---|---|---|
| user.registered | auth-service | notification-service, gamification-service | userId, email |
| event.created | event-service | notification-service, location-service | eventId, zoneId |
| event.joined | event-service | notification-service, gamification-service | eventId, userId |
| event.completed | event-service | gamification-service, notification-service | eventId, stats |
| media.verified | media-service | event-service, gamification-service | mediaId, eventId, userId |
| payment.completed | payment-service | auth-service, notification-service | orgId, plan, amount |

Every consumer is idempotent — duplicate Kafka delivery handled with
deduplication keys. Assume at-least-once delivery always.

---

## Data Architecture

### CAP Theorem Position
We choose Availability + Partition Tolerance over strict Consistency.
Rationale: a volunteer seeing stale leaderboard data for 2 seconds is
acceptable. A volunteer being unable to check in to an event because
the leaderboard service is down is NOT acceptable. Services are
independent. Eventual consistency is sufficient for all features except
payment (which uses synchronous Stripe API — strong consistency required).

### Database Per Service (Non-Negotiable)
No service reads another service's database.
Cross-service data needs = Kafka event or gRPC call.
This is the microservices contract. Violating it creates
a distributed monolith — the worst of both worlds.

---

## Security Model

- mTLS between all internal services (zero-trust network)
- JWT (RS256, 15min access / 7day refresh) for user sessions
- API keys for org-to-org integrations
- Argon2id password hashing
- RBAC: volunteer | organizer | org_admin | platform_admin
- PCI-DSS scope limited to payment-service only
- GDPR: location data deleted after 90 days, photo data after 1 year

---

## Monetization Tiers

| Tier | Price | Features |
|---|---|---|
| Free | $0 | Join events, basic gamification |
| Organizer | $19/mo | Create events, 50 participants, basic analytics |
| Pro Organizer | $49/mo | Unlimited participants, AI photo verification, export |
| Enterprise | $299/mo | White-label, SOAP API, city dashboard, SLA |
| Municipality | Custom | Full data sovereignty, on-prem option |

---

## Tech Stack Decision

| Layer | Technology | Reason |
|---|---|---|
| Runtime | Bun | Native TypeScript, faster than Node |
| Framework | Fastify | 2-3x faster than Express, typed schemas |
| ORM | Prisma | Type-safe, migrations as code |
| Message broker | Kafka (Redpanda local) | Durable, replayable events |
| Cache | Redis | Leaderboards, session store, rate limits |
| Object storage | Cloudflare R2 | S3-compatible, zero egress fees |
| Container | Docker + Compose | Reproducible local environment |
| Orchestration | Kubernetes (prod) | Per-service scaling |
| CI/CD | GitHub Actions | Free tier, industry standard |
| Monitoring | Prometheus + Grafana + Sentry | Full observability stack |
| Maps | Leaflet + OpenStreetMap | 100% free, no API key billing |

---

## Monorepo Structure

services/
  auth-service/         REST — JWT, OAuth, RBAC
  event-service/        REST + GraphQL — event CRUD
  location-service/     REST + WebSocket — GPS + zones
  media-service/        REST + gRPC — photos + AI verify
  gamification-service/ GraphQL + WebSocket — points + leaderboard
  notification-service/ Kafka consumer — email + push
  payment-service/      REST + SOAP — subscriptions

gateway/                API Gateway — routing + auth + rate limit
packages/
  shared-types/         TypeScript interfaces shared across services
  shared-utils/         logger, correlation IDs, error classes
  proto/                Protobuf definitions for gRPC calls
infrastructure/
  docker/               Dockerfiles per service
  k8s/                  Kubernetes manifests
  nginx/                Reverse proxy config
