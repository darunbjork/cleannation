export * from "./AppError";
export function isAppError(error) {
    return (error instanceof Error &&
        "code" in error &&
        "statusCode" in error);
}
//# sourceMappingURL=index.js.map