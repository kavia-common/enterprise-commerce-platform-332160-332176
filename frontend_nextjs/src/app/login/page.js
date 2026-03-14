'use client';

import React, { useState } from 'react';
import { apiFetch } from '../../lib/apiClient';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@admin.test');
  const [password, setPassword] = useState('demo');
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Logging in...' });

    try {
      const data = await apiFetch('/api/auth/login', { method: 'POST', body: { email, password } });
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      setStatus({ type: 'success', message: `Logged in as ${data.user.email} (${data.user.role})` });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  }

  return (
    <main style={{ padding: 24, maxWidth: 520 }}>
      <h1 style={{ marginTop: 0 }}>Login</h1>
      <p style={{ color: '#334155' }}>
        For admin access, use an email ending with <code>@admin.test</code>.
      </p>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: 10, marginTop: 6 }}
            type="email"
            required
          />
        </label>

        <label>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: 10, marginTop: 6 }}
            type="password"
            required
          />
        </label>

        <button type="submit" style={{ padding: 10 }}>
          Login
        </button>

        {status.type !== 'idle' && (
          <div aria-live="polite" style={{ padding: 10, border: '1px solid #e2e8f0' }}>
            {status.message}
          </div>
        )}
      </form>

      <nav style={{ marginTop: 16, display: 'flex', gap: 16 }}>
        <Link href="/">Home</Link>
        <Link href="/admin/activity">Activity Log</Link>
        <Link href="/admin/products">Products</Link>
        <Link href="/admin/orders">Orders</Link>
      </nav>
    </main>
  );
}
