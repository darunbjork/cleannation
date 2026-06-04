// Helper factories — use these in every controller
export function ok(data, meta) {
    return {
        success: true,
        data,
        error: null,
        meta: { ...meta, timestamp: new Date().toISOString() },
    };
}
export function fail(code, message, meta, details = null) {
    return {
        success: false,
        data: null,
        error: { code, message, details },
        meta: { ...meta, timestamp: new Date().toISOString() },
    };
}
//# sourceMappingURL=response.types.js.map