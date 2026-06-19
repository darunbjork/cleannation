# CleanNation 🌍

> Organize. Coordinate. Verify. Clean the whole country.

A civic SaaS platform for nationwide community cleanup events.
Microservice architecture. 100% open-source stack. $0.00/month infrastructure locally.

## Status
🚧 Step 1 of N — Architecture blueprint complete

## Architecture
7 microservices + API Gateway + Kafka event bus

| Service | Protocol | Port |
|---|---|---|
| API Gateway | REST | 3000 |
| auth-service | REST | 3001 |
| event-service | REST + GraphQL | 3002 |
| location-service | REST + WebSocket | 3003 |
| media-service | REST + gRPC | 3004 |
| gamification-service | GraphQL + WebSocket | 3005 |
| notification-service | Kafka consumer | 3006 |
| payment-service | REST + SOAP | 3007 |

## Quick Start
```bash
cp .env.example .env
docker compose up -d
```

## Monthly Cost
$0.00 local development. See ARCHITECTURE.md for production cost estimate.

## Development Steps
- Staged and committed A Mustafa's initial uncommitted changes.<br>
- Stopped conflicting PostgreSQL containers from another project and started CleanNation Docker Compose databases (PostgreSQL, Redis, Kafka) successfully.<br>
- Created `.env` file for `event-service` with correct local ports (database port 5433, Kafka port 19092).<br>
- Created `.env` file for `location-service` with correct local ports (database port 5434, Kafka port 19092).<br>
- Created `.env` file for `gateway` with correct local microservice routing URLs and JWT public key.<br>
- Created `.env` files for the remaining services (`gamification-service`, `media-service`, `notification-service`, `payment-service`) mapping databases and event bus ports correctly.<br>






