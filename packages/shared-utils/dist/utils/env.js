export function requireEnv(key) {
    const value = process.env[key];
    if (value === undefined || value === "") {
        console.error(`[FATAL] Missing required environment variable: ${key}`);
        console.error(`[FATAL] Check your .env file against .env.example`);
        process.exit(1);
    }
    return value;
}
export function requireEnvInt(key, defaultValue) {
    const raw = process.env[key];
    if (raw === undefined || raw === "") {
        if (defaultValue !== undefined)
            return defaultValue;
        console.error(`[FATAL] Missing required env var: ${key}`);
        process.exit(1);
    }
    const parsed = parseInt(raw, 10);
    if (isNaN(parsed)) {
        console.error(`[FATAL] Env var ${key} must be an integer, got: "${raw}"`);
        process.exit(1);
    }
    return parsed;
}
export function requireEnvBool(key, defaultValue) {
    const raw = process.env[key];
    if (raw === undefined || raw === "") {
        if (defaultValue !== undefined)
            return defaultValue;
        console.error(`[FATAL] Missing required env var: ${key}`);
        process.exit(1);
    }
    if (raw !== "true" && raw !== "false") {
        console.error(`[FATAL] Env var ${key} must be "true" or "false", got: "${raw}"`);
        process.exit(1);
    }
    return raw === "true";
}
export function validateRequiredEnv(keys) {
    const missing = keys.filter((key) => process.env[key] === undefined || process.env[key] === "");
    if (missing.length > 0) {
        console.error("[FATAL] Missing required environment variables:");
        missing.forEach((key) => console.error(`  - ${key}`));
        console.error("[FATAL] Check .env.example for required variables");
        process.exit(1);
    }
}
//# sourceMappingURL=env.js.map