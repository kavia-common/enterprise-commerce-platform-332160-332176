/**
 * API Client Service
 *
 * Centralized HTTP client for communicating with the Enterprise Commerce
 * Platform backend API. Handles request/response formatting, authentication
 * headers, error normalization, and base URL configuration.
 *
 * All API calls in the application should go through this client to ensure
 * consistent behavior (auth headers, error handling, base URL).
 *
 * Environment:
 *   - NEXT_PUBLIC_API_BASE_URL: Backend API base URL (defaults to relative /api)
 */

// PUBLIC_INTERFACE
/**
 * The base URL for all API requests.
 * Reads from NEXT_PUBLIC_API_BASE_URL environment variable.
 * Falls back to '/api' for same-origin proxied requests during development.
 */
const API_BASE_URL =
  typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_BASE_URL
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : "/api";

/**
 * Default request timeout in milliseconds.
 */
const DEFAULT_TIMEOUT = 30000;

/**
 * Retrieves the stored authentication token from localStorage.
 * Returns null if no token is stored or if localStorage is unavailable.
 *
 * @returns {string|null} The JWT auth token, or null.
 */
function getAuthToken() {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("auth_token");
  } catch {
    return null;
  }
}

/**
 * Builds the full request URL by combining the base URL with the given path.
 *
 * @param {string} path - The API endpoint path (e.g., '/auth/login').
 * @returns {string} The full URL.
 */
function buildUrl(path) {
  // If path already starts with http(s), use as-is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  // Ensure no double slashes
  const base = API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

/**
 * Normalizes API errors into a consistent Error object.
 * Extracts the most useful message from various backend response formats.
 *
 * @param {Response} response - The fetch Response object.
 * @param {object|null} body - The parsed response body, if available.
 * @returns {Error} A normalized Error with a user-friendly message.
 */
function normalizeError(response, body) {
  const message =
    body?.message ||
    body?.error ||
    body?.errors?.[0]?.message ||
    `Request failed with status ${response.status}`;

  const error = new Error(message);
  error.status = response.status;
  error.statusText = response.statusText;
  error.body = body;
  return error;
}

// PUBLIC_INTERFACE
/**
 * Makes an HTTP request to the backend API.
 *
 * Automatically includes:
 *   - Content-Type: application/json header
 *   - Authorization: Bearer <token> header (if a token is stored)
 *   - Configurable timeout via AbortController
 *
 * @param {string} path - The API endpoint path (e.g., '/auth/login').
 * @param {object} [options={}] - Fetch options override.
 * @param {string} [options.method='GET'] - HTTP method.
 * @param {object} [options.body] - Request body (will be JSON-stringified).
 * @param {object} [options.headers] - Additional headers to merge.
 * @param {number} [options.timeout] - Request timeout in ms (default 30000).
 * @param {object} [options.params] - URL query parameters as key-value pairs.
 * @returns {Promise<object>} The parsed JSON response body.
 * @throws {Error} Normalized error with status, statusText, and body properties.
 */
async function apiRequest(path, options = {}) {
  const {
    method = "GET",
    body,
    headers = {},
    timeout = DEFAULT_TIMEOUT,
    params,
    ...restOptions
  } = options;

  // Build URL with optional query parameters
  let url = buildUrl(path);
  if (params && typeof params === "object") {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `${url.includes("?") ? "&" : "?"}${queryString}`;
    }
  }

  // Build headers
  const requestHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...headers,
  };

  // Attach auth token if available
  const token = getAuthToken();
  if (token) {
    requestHeaders["Authorization"] = `Bearer ${token}`;
  }

  // Setup abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      ...restOptions,
    });

    clearTimeout(timeoutId);

    // Attempt to parse JSON response body
    let responseBody = null;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      try {
        responseBody = await response.json();
      } catch {
        responseBody = null;
      }
    }

    // Handle non-2xx responses
    if (!response.ok) {
      throw normalizeError(response, responseBody);
    }

    return responseBody;
  } catch (err) {
    clearTimeout(timeoutId);

    // Handle abort/timeout
    if (err.name === "AbortError") {
      const timeoutError = new Error(
        "Request timed out. Please check your connection and try again."
      );
      timeoutError.status = 0;
      timeoutError.statusText = "Timeout";
      throw timeoutError;
    }

    // Handle network errors
    if (err instanceof TypeError && err.message === "Failed to fetch") {
      const networkError = new Error(
        "Unable to connect to the server. Please check your internet connection."
      );
      networkError.status = 0;
      networkError.statusText = "Network Error";
      throw networkError;
    }

    throw err;
  }
}

// PUBLIC_INTERFACE
/**
 * Convenience method for GET requests.
 *
 * @param {string} path - The API endpoint path.
 * @param {object} [params] - URL query parameters.
 * @param {object} [options] - Additional fetch options.
 * @returns {Promise<object>} The parsed JSON response.
 */
function get(path, params, options = {}) {
  return apiRequest(path, { method: "GET", params, ...options });
}

// PUBLIC_INTERFACE
/**
 * Convenience method for POST requests.
 *
 * @param {string} path - The API endpoint path.
 * @param {object} [body] - The request body.
 * @param {object} [options] - Additional fetch options.
 * @returns {Promise<object>} The parsed JSON response.
 */
function post(path, body, options = {}) {
  return apiRequest(path, { method: "POST", body, ...options });
}

// PUBLIC_INTERFACE
/**
 * Convenience method for PUT requests.
 *
 * @param {string} path - The API endpoint path.
 * @param {object} [body] - The request body.
 * @param {object} [options] - Additional fetch options.
 * @returns {Promise<object>} The parsed JSON response.
 */
function put(path, body, options = {}) {
  return apiRequest(path, { method: "PUT", body, ...options });
}

// PUBLIC_INTERFACE
/**
 * Convenience method for DELETE requests.
 *
 * @param {string} path - The API endpoint path.
 * @param {object} [options] - Additional fetch options.
 * @returns {Promise<object>} The parsed JSON response.
 */
function del(path, options = {}) {
  return apiRequest(path, { method: "DELETE", ...options });
}

// PUBLIC_INTERFACE
/**
 * Convenience method for PATCH requests.
 *
 * @param {string} path - The API endpoint path.
 * @param {object} [body] - The request body.
 * @param {object} [options] - Additional fetch options.
 * @returns {Promise<object>} The parsed JSON response.
 */
function patch(path, body, options = {}) {
  return apiRequest(path, { method: "PATCH", body, ...options });
}

export {
  API_BASE_URL,
  apiRequest,
  get,
  post,
  put,
  del,
  patch,
  getAuthToken,
  buildUrl,
};

const apiClient = {
  request: apiRequest,
  get,
  post,
  put,
  delete: del,
  patch,
  getAuthToken,
  buildUrl,
  API_BASE_URL,
};

export default apiClient;
