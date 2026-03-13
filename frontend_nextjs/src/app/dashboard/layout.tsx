import React from "react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import DashboardShell from "@/components/layout/DashboardShell";
import Footer from "@/components/layout/Footer";

/**
 * Dashboard layout component that wraps all `/dashboard/*` routes
 * with the dashboard-specific shell (Navbar + DashboardSidebar).
 *
 * This layout is nested inside the root layout (which provides the
 * global HTML structure and fonts) and uses DashboardShell so
 * dashboard pages get a dashboard-specific sidebar instead of the
 * main shopping sidebar.
 *
 * Layout structure:
 *   - AnnouncementBar (top, dismissible)
 *   - DashboardShell (navbar at top, dashboard sidebar on left, main content)
 *   - Footer (below main content, scrolls with page)
 */
// PUBLIC_INTERFACE
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Announcement bar */}
      <AnnouncementBar />

      {/* Dashboard shell: top navbar + dashboard sidebar + main content */}
      <DashboardShell>
        {children}
        {/* Footer inside DashboardShell so it scrolls with content */}
        <Footer />
      </DashboardShell>
    </>
  );
}
