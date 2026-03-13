"use client";

import React, { useState, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

/**
 * Dashboard shell component that orchestrates the top navbar,
 * left dashboard sidebar, and centered main content layout.
 *
 * This component follows the same structural pattern as AppShell,
 * but uses the DashboardSidebar (with dashboard-specific navigation)
 * instead of the main shopping Sidebar.
 *
 * Desktop (lg+):
 *   - Navbar spans full width at the top (sticky)
 *   - DashboardSidebar is fixed-width on the left
 *   - Main content fills remaining space
 *
 * Mobile (<lg):
 *   - Navbar spans full width at the top (sticky)
 *   - DashboardSidebar is hidden and toggled via hamburger menu
 *   - Main content fills full width
 *
 * Contract:
 *   Inputs: children (React.ReactNode) — page content
 *   Outputs: rendered shell UI with navbar + sidebar + content
 *   Side effects: manages mobile sidebar open/close state
 *
 * @param children - Page content to render in the main content area
 */
// PUBLIC_INTERFACE
export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  /** Toggle the mobile sidebar open/closed. */
  const handleMobileSidebarToggle = useCallback(() => {
    setIsMobileSidebarOpen((prev) => !prev);
  }, []);

  /** Close the mobile sidebar. */
  const handleMobileSidebarClose = useCallback(() => {
    setIsMobileSidebarOpen(false);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top navigation bar — full width, sticky */}
      <Navbar onMobileSidebarToggle={handleMobileSidebarToggle} />

      {/* Content area: dashboard sidebar + main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left dashboard sidebar — visible on desktop, overlay on mobile */}
        <DashboardSidebar
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={handleMobileSidebarClose}
        />

        {/* Main content area with subtle background for dashboard feel */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto bg-[#f9fafb]"
        >
          <div className="mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
