import React from 'react';

export const metadata = {
  title: 'Enterprise Commerce Platform',
  description: 'Admin dashboard with user activity logs'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
