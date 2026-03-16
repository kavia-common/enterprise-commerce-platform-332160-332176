/**
 * API Client (canonical module)
 *
 * This module provides a small, consistent fetch-based client for calling the backend REST API.
 * It is designed to be imported by UI/services code throughout the Next.js app.
 *
 * Contract:
 * - Inputs:
 *   - path: string, must start with "/" (e.g. "/auth/login")
 *   - options: optional object:
 *       - method: HTTP verb (default "GET")
 *       - body: any JSON-serializable value (optional)
 *       - headers: object of additional headers (optional)
 *       - query: object of query params (optional)
 *       - token: string bearer token override (optional)
 * - Outputs:
 *   - Resolves with parsed JSON when response is JSON, otherwise resolves with text.
 * - Errors:
 *   - Throws ApiError on non-2xx responses, including status, payload, and request context.
 * - Side effects:
 *   - Performs network calls via fetch.
 *
 * Observability/debuggability:
 * - All thrown errors contain operation context: method, url, status, and response payload (when available).
 */

// PUBLIC_INTERFACE
export class ApiError extends Error {
  /**
   * Create an ApiError.
   * @param {string} message Human-readable message
   * @param {object} details Additional error context
   */
  constructor(message, details) {
    super(message);
    this.name = "ApiError";
    this.details = details;
  }
}

function getBaseUrl() {
  // NOTE: Next.js convention is NEXT_PUBLIC_* for browser-exposed env vars.
  // If not set, default to same-origin (useful when Next.js proxies or serves API).
  return (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");
}

function buildUrl(path, query) {
  if (typeof path !== "string" || path.length === 0) {
    throw new ApiError("apiClient: 'path' must be a non-empty string", { path });
  }
  if (!path.startsWith("/")) {
    throw new ApiError("apiClient: 'path' must start with '/'", { path });
  }

  const base = getBaseUrl();
  const url = new URL((base ? base : "") + path, base ? undefined : "http://localhost");

  // If base is empty, URL() needs an origin; we used localhost. Strip it back to relative later.
  if (query && typeof query === "object") {
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null) continue;
      url.searchParams.set(k, String(v));
    }
  }

  // Return relative URL if base url is empty
  if (!base) {
    return url.pathname + url.search;
  }
  return url.toString();
}

async function parseResponsePayload(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    // If body is empty, response.json() can throw; handle gracefully.
    const text = await response.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }
  return await response.text();
}

/**
 * Low-level request helper used by all exported convenience methods.
 */
// PUBLIC_INTERFACE
export async function apiRequest(path, options = {}) {
  /** @type {{method?: string, body?: any, headers?: Record<string,string>, query?: Record<string, any>, token?: string}} */
  const { method = "GET", body, headers = {}, query, token } = options;

  const url = buildUrl(path, query);

  const finalHeaders = {
    Accept: "application/json",
    ...headers,
  };

  let finalBody = undefined;
  if (body !== undefined) {
    finalHeaders["Content-Type"] = finalHeaders["Content-Type"] || "application/json";
    finalBody = finalHeaders["Content-Type"].includes("application/json")
      ? JSON.stringify(body)
      : body;
  }

  if (token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(url, {
      method,
      headers: finalHeaders,
      body: finalBody,
    });
  } catch (err) {
    throw new ApiError("apiClient: network error while calling backend", {
      method,
      url,
      originalError: err instanceof Error ? err.message : String(err),
    });
  }

  const payload = await parseResponsePayload(response);

  if (!response.ok) {
    throw new ApiError("apiClient: backend responded with an error", {
      method,
      url,
      status: response.status,
      statusText: response.statusText,
      payload,
    });
  }

  return payload;
}

/**
 * Convenience methods (common use-case: JSON REST).
 */
// PUBLIC_INTERFACE
export function apiGet(path, options = {}) {
  /** GET request. */
  return apiRequest(path, { ...options, method: "GET" });
}

// PUBLIC_INTERFACE
export function apiPost(path, body, options = {}) {
  /** POST request with JSON body. */
  return apiRequest(path, { ...options, method: "POST", body });
}

// PUBLIC_INTERFACE
export function apiPut(path, body, options = {}) {
  /** PUT request with JSON body. */
  return apiRequest(path, { ...options, method: "PUT", body });
}

// PUBLIC_INTERFACE
export function apiPatch(path, body, options = {}) {
  /** PATCH request with JSON body. */
  return apiRequest(path, { ...options, method: "PATCH", body });
}

// PUBLIC_INTERFACE
export function apiDelete(path, options = {}) {
  /** DELETE request. */
  return apiRequest(path, { ...options, method: "DELETE" });
}
