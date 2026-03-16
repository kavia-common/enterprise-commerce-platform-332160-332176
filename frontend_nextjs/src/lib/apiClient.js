/**
 * Backward-compatible re-export.
 *
 * Prefer importing from: "@/services/apiClient" or "src/services/apiClient"
 * This file exists to prevent breakage if older code references "src/lib/apiClient".
 */

export * from "../services/apiClient";
