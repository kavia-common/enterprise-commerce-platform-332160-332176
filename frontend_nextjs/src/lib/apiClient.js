/* eslint-disable no-console */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

/**
 * PUBLIC_INTERFACE
 * apiFetch - minimal fetch wrapper with JSON parsing and auth support.
 *
 * Contract:
 * - Inputs: path, { method, token, body, query }
 * - Output: parsed JSON
 * - Errors: throws Error with message including status and server error code when possible
 */
export async function apiFetch(path, { method = 'GET', token, body, query } = {}) {
  if (!API_BASE) {
    throw new Error('NEXT_PUBLIC_API_BASE is required');
  }

  const url = new URL(`${API_BASE}${path}`);
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v === undefined || v === null || v === '') return;
      url.searchParams.set(k, String(v));
    });
  }

  const res = await fetch(url.toString(), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store'
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const code = data?.error?.code;
    const message = data?.error?.message || `Request failed: ${res.status}`;
    const err = new Error(code ? `${message} (${code})` : message);
    err.status = res.status;
    err.code = code;
    err.details = data?.error?.details;
    throw err;
  }

  return data;
}
