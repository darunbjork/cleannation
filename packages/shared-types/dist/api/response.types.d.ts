import { ErrorCode } from "../errors/error.types";
export interface ApiResponse<TData> {
    success: boolean;
    data: TData | null;
    error: ApiError | null;
    meta: ResponseMeta;
}
export interface ResponseMeta {
    requestId: string;
    timestamp: string;
    service: string;
    durationMs?: number;
}
export interface ApiError {
    code: ErrorCode;
    message: string;
    details: unknown | null;
}
export declare function ok<TData>(data: TData, meta: Omit<ResponseMeta, "timestamp">): ApiResponse<TData>;
export declare function fail(code: ErrorCode, message: string, meta: Omit<ResponseMeta, "timestamp">, details?: unknown): ApiResponse<null>;
//# sourceMappingURL=response.types.d.ts.map