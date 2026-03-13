import React from "react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import AppShell from "@/components/layout/AppShell";
import Footer from "@/components/layout/Footer";

/**
 * Main route group layout that wraps all non-dashboard pages
 * with the standard shopping shell (Navbar + shopping Sidebar).
 *
 * This layout provides the same structure that was previously
 * in the root layout, ensuring backward compatibility for all
 * existing pages (home, login, shop, etc.).
 *
 * Layout structure:
 *   - AnnouncementBar (top, dismissible)
 *   - AppShell (navbar at top, shopping sidebar on left, main content centered)
 *   - Footer (below main content, scrolls with page)
 */
// PUBLIC_INTERFACE
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Announcement bar */}
      <AnnouncementBar />

      {/* Application shell: top navbar + shopping sidebar + centered main content */}
      <AppShell>
        {children}
        {/* Footer inside AppShell so it scrolls with content */}
        <Footer />
      </AppShell>
    </>
  );
}
