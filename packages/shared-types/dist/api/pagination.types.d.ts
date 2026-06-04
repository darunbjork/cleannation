export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
}
export interface PaginatedResponse<TItem> {
    items: TItem[];
    pagination: PaginationMeta;
}
export interface PaginationInput {
    page?: number;
    limit?: number;
}
export interface CursorPaginationInput {
    cursor?: string;
    limit?: number;
}
export interface CursorPaginatedResponse<TItem> {
    items: TItem[];
    nextCursor: string | null;
    hasMore: boolean;
}
//# sourceMappingURL=pagination.types.d.ts.map