'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { apiFetch } from '../../../lib/apiClient';

function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function AdminActivityPage() {
  const [token, setToken] = useState(null);

  const [filters, setFilters] = useState({
    eventType: '',
    resourceType: '',
    actorUserId: ''
  });

  const [page, setPage] = useState({ limit: 50, offset: 0 });
  const [data, setData] = useState({ items: [], total: 0 });
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  useEffect(() => {
    setToken(getToken());
  }, []);

  const canPrev = page.offset > 0;
  const canNext = page.offset + page.limit < data.total;

  const query = useMemo(
    () => ({
      limit: page.limit,
      offset: page.offset,
      eventType: filters.eventType || undefined,
      resourceType: filters.resourceType || undefined,
      actorUserId: filters.actorUserId || undefined
    }),
    [filters, page]
  );

  async function load() {
    if (!token) {
      setStatus({ type: 'error', message: 'Missing token. Please login first.' });
      return;
    }
    setStatus({ type: 'loading', message: 'Loading activity logs...' });

    try {
      const res = await apiFetch('/api/admin/activity', { token, query });
      setData(res);
      setStatus({ type: 'success', message: `Loaded ${res.items.length} of ${res.total}` });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  }

  useEffect(() => {
    if (!token) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, query]);

  return (
    <main style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h1 style={{ marginTop: 0, marginBottom: 8 }}>User Activity Log</h1>
          <p style={{ marginTop: 0, color: '#334155' }}>
            Admin-only table of login/logout and data update events.
          </p>
        </div>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/admin/products">Products</Link>
          <Link href="/admin/orders">Orders</Link>
        </nav>
      </div>

      <section style={{ marginTop: 16, padding: 16, border: '1px solid #e2e8f0', borderRadius: 8 }}>
        <h2 style={{ marginTop: 0, fontSize: 16 }}>Filters</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          <label>
            Event Type
            <select
              value={filters.eventType}
              onChange={(e) => setFilters((f) => ({ ...f, eventType: e.target.value }))}
              style={{ width: '100%', padding: 10, marginTop: 6 }}
            >
              <option value="">All</option>
              <option value="LOGIN">LOGIN</option>
              <option value="LOGOUT">LOGOUT</option>
              <option value="DATA_UPDATE">DATA_UPDATE</option>
            </select>
          </label>

          <label>
            Resource Type
            <select
              value={filters.resourceType}
              onChange={(e) => setFilters((f) => ({ ...f, resourceType: e.target.value }))}
              style={{ width: '100%', padding: 10, marginTop: 6 }}
            >
              <option value="">All</option>
              <option value="AUTH">AUTH</option>
              <option value="USER">USER</option>
              <option value="PRODUCT">PRODUCT</option>
              <option value="ORDER">ORDER</option>
            </select>
          </label>

          <label>
            Actor User ID
            <input
              value={filters.actorUserId}
              onChange={(e) => setFilters((f) => ({ ...f, actorUserId: e.target.value }))}
              placeholder="uuid"
              style={{ width: '100%', padding: 10, marginTop: 6 }}
            />
          </label>
        </div>

        <div style={{ marginTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => {
              setPage((p) => ({ ...p, offset: 0 }));
              load();
            }}
            style={{ padding: 10 }}
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('auth_token');
              localStorage.removeItem('auth_user');
              setToken(null);
              setStatus({ type: 'idle', message: '' });
              setData({ items: [], total: 0 });
            }}
            style={{ padding: 10 }}
          >
            Clear token
          </button>

          {status.type !== 'idle' && (
            <div aria-live="polite" style={{ padding: 10, border: '1px solid #e2e8f0' }}>
              {status.message}
            </div>
          )}
        </div>
      </section>

      <section style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: 16 }}>Events</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              disabled={!canPrev}
              onClick={() => setPage((p) => ({ ...p, offset: Math.max(0, p.offset - p.limit) }))}
            >
              Prev
            </button>
            <button
              type="button"
              disabled={!canNext}
              onClick={() => setPage((p) => ({ ...p, offset: p.offset + p.limit }))}
            >
              Next
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto', marginTop: 8, border: '1px solid #e2e8f0', borderRadius: 8 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 980 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Time', 'Event', 'Resource', 'Action', 'Actor Email', 'Actor User ID', 'IP', 'Request ID'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e2e8f0' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.items.map((row) => (
                <tr key={row.id}>
                  <td style={{ padding: 10, borderBottom: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>
                    {formatDate(row.created_at)}
                  </td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f1f5f9' }}>{row.event_type}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f1f5f9' }}>
                    {row.resource_type}
                    {row.resource_id ? `:${row.resource_id}` : ''}
                  </td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f1f5f9' }}>{row.action}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f1f5f9' }}>{row.actor_email || '-'}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f1f5f9' }}>{row.actor_user_id || '-'}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f1f5f9' }}>{row.ip_address || '-'}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f1f5f9' }}>{row.request_id || '-'}</td>
                </tr>
              ))}

              {data.items.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ padding: 16 }}>
                    No events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: 8, color: '#64748b' }}>
          Showing {data.items.length} of {data.total}.
        </p>
      </section>
    </main>
  );
}
