# CleanNation 🌍

![CI](https://github.com/darunbjork/cleannation/actions/workflows/ci.yml/badge.svg)

> Organize. Coordinate. Verify. Clean the whole country.

CleanNation is a civic SaaS platform for coordinating nationwide community cleanup events. The system is built as a modular microservices architecture and is designed for local development with an open-source stack and zero infrastructure cost for local use.

## Overview

CleanNation brings together event coordination, volunteer tracking, media uploads, gamification, and notifications into a unified platform. The architecture is organized around independent services communicating through REST, GraphQL, WebSocket, gRPC, and Kafka.

## Architecture

The platform currently consists of the following services:

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

## Getting Started

### Prerequisites

- Docker Desktop
- Bun
- Node.js

### Quick Start

```bash
cp .env.example .env
docker compose up -d
```

### Development Verification

Run the workspace type-check before submitting changes:

```bash
bun run type-check
```

## Project Goals

- Simplify volunteer event coordination
- Provide realtime participation tracking
- Support media and evidence submission
- Encourage engagement through gamification
- Enable reliable event and notification workflows

## Cost Model

Local development is designed to run at $0.00/month infrastructure cost. See the architecture documentation for production cost estimates.


