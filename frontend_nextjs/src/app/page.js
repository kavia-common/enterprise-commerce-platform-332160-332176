import React from 'react';
import Link from 'next/link';

/**
 * PUBLIC_INTERFACE
 * HomePage - Landing page for the Enterprise Commerce Platform.
 * Provides navigation links to all major sections including admin pages.
 */
export default function HomePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>Enterprise Commerce Platform</h1>
      <p>Use the links below to access the demo UI.</p>
      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/admin/activity">Admin: User Activity Log</Link>
        </li>
        <li>
          <Link href="/admin/products">Admin: Products Management</Link>
        </li>
        <li>
          <Link href="/admin/orders">Admin: Orders Management</Link>
        </li>
      </ul>
    </main>
  );
}
