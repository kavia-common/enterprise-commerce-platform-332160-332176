import React from 'react';
import Link from 'next/link';

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
      </ul>
    </main>
  );
}
