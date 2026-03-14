'use client';

import React from 'react';
import Link from 'next/link';

/**
 * PUBLIC_INTERFACE
 * AdminProductsPage - Placeholder page for Products management.
 * Will be replaced with full CRUD UI in a future iteration.
 */
export default function AdminProductsPage() {
  return (
    <main style={{ padding: 24 }}>
      {/* Navigation bar */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h1 style={{ marginTop: 0, marginBottom: 8 }}>Products Management</h1>
          <p style={{ marginTop: 0, color: '#334155' }}>
            Product CRUD functionality coming soon.
          </p>
        </div>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/admin/activity">Activity Log</Link>
          <Link href="/admin/orders">Orders</Link>
        </nav>
      </div>

      {/* Placeholder content */}
      <section
        style={{
          marginTop: 24,
          padding: 32,
          border: '1px solid #e2e8f0',
          borderRadius: 8,
          background: '#f9fafb',
          textAlign: 'center'
        }}
      >
        <h2 style={{ marginTop: 0, color: '#64748b' }}>Products</h2>
        <p style={{ color: '#94a3b8' }}>
          This page will display a list of products with options to create, edit, and delete products.
        </p>
        <p style={{ color: '#94a3b8', fontSize: 14 }}>
          Full CRUD UI is under development.
        </p>
      </section>
    </main>
  );
}
