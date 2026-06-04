// packages/shared-types/src/api/pagination.types.ts
// Standard pagination shape for all list endpoints.
// Consistent across all 7 services — frontend writes one paginator.

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  pages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface PaginatedResponse<TItem> {
  items: TItem[]
  pagination: PaginationMeta
}

export interface PaginationInput {
  page?: number    // default: 1
  limit?: number   // default: 20, max: 100
}

// Cursor-based pagination for real-time feeds (leaderboards, event feeds)
// More efficient than offset pagination at large page numbers
export interface CursorPaginationInput {
  cursor?: string  // opaque cursor — base64-encoded last item ID + timestamp
  limit?: number
}

export interface CursorPaginatedResponse<TItem> {
  items: TItem[]
  nextCursor: string | null  // null = no more pages
  hasMore: boolean
}
