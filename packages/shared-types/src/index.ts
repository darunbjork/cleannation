// packages/shared-types/src/index.ts
// Single entry point — services import from "@cleannation/shared-types"
// Never import directly from subpaths in service code.

// Auth & RBAC
export * from "./auth/rbac.types"

// Domain entities
export * from "./domain/user.types"
export * from "./domain/event.types"
export * from "./domain/location.types"
export * from "./domain/media.types"
export * from "./domain/gamification.types"
export * from "./domain/payment.types"

// API contracts
export * from "./api/response.types"
export * from "./api/pagination.types"

// Errors
export * from "./errors/error.types"

// Kafka events
export * from "./events/kafka.types"

// gRPC mirrors
export * from "./grpc/media.types"
