"use client";

import React, { useState, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

/**
 * Application shell component that orchestrates the top navbar,
 * left sidebar, and centered main content layout.
 *
 * Desktop (lg+):
 *   - Navbar spans full width at the top (sticky)
 *   - Sidebar is fixed-width on the left
 *   - Main content fills remaining space and is centered
 *
 * Mobile (<lg):
 *   - Navbar spans full width at the top (sticky)
 *   - Sidebar is hidden and toggled via hamburger menu
 *   - Main content fills full width
 *
 * @param children - Page content to render in the main content area
 */
// PUBLIC_INTERFACE
export default function AppShell({ children }: { children: React.ReactNode }) {
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

      {/* Content area: sidebar + main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar — visible on desktop, overlay on mobile */}
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={handleMobileSidebarClose}
        />

        {/* Main content area — centered within remaining space */}
        <main id="main-content" className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
