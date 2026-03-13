"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  X,
  Home,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Grid3X3,
  Tag,
  User,
  Gem,
  Footprints,
  Package,
  Heart,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SIDEBAR_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Icon mapping for sidebar link icons.
 * Maps icon string names from constants to Lucide React components.
 */
const ICON_MAP: Record<string, React.ElementType> = {
  home: Home,
  "shopping-bag": ShoppingBag,
  sparkles: Sparkles,
  "trending-up": TrendingUp,
  grid: Grid3X3,
  tag: Tag,
  user: User,
  gem: Gem,
  footprints: Footprints,
  package: Package,
  heart: Heart,
  settings: Settings,
};

/**
 * Left sidebar navigation component with responsive behavior.
 * - Desktop (lg+): Always visible as a fixed-width side panel with collapse toggle.
 * - Mobile/Tablet (<lg): Hidden by default; toggled via an external button (handled by layout).
 *
 * @param isMobileOpen - Whether the mobile sidebar overlay is open
 * @param onMobileClose - Callback to close the mobile sidebar overlay
 */
// PUBLIC_INTERFACE
export default function Sidebar({
  isMobileOpen,
  onMobileClose,
}: {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  /**
   * Close mobile sidebar on escape key press for accessibility.
   */
  const handleEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileOpen) {
        onMobileClose();
      }
    },
    [isMobileOpen, onMobileClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [handleEscapeKey]);

  /* Prevent body scroll when mobile sidebar is open */
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  /**
   * Renders a single sidebar link with icon and label.
   */
  const renderLink = (
    link: { label: string; href: string; icon: string; isAccent?: boolean },
    collapsed: boolean
  ) => {
    const IconComponent = ICON_MAP[link.icon] || Home;
    return (
      <Link
        key={link.label}
        href={link.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200",
          "hover:bg-[#F5F5F5]",
          link.isAccent
            ? "text-[#E94560] hover:bg-[#E94560]/5"
            : "text-[#404040] hover:text-[#1A1A2E]",
          collapsed && "justify-center px-2"
        )}
        title={collapsed ? link.label : undefined}
        onClick={() => {
          if (isMobileOpen) {
            onMobileClose();
          }
        }}
      >
        <IconComponent size={18} className="flex-shrink-0" />
        {!collapsed && <span>{link.label}</span>}
      </Link>
    );
  };

  /**
   * Renders the sidebar content (sections and links).
   */
  const renderSidebarContent = (collapsed: boolean) => (
    <nav className="flex flex-col h-full py-4" aria-label="Sidebar navigation">
      {SIDEBAR_LINKS.map((section, idx) => (
        <div key={section.section} className={cn("px-3", idx > 0 && "mt-4")}>
          {!collapsed && (
            <h3 className="px-3 mb-2 text-[11px] uppercase font-semibold tracking-[0.06em] text-[#A3A3A3]">
              {section.section}
            </h3>
          )}
          {collapsed && idx > 0 && (
            <div className="border-t border-[#E5E5E5] my-2" />
          )}
          <div className="space-y-0.5">
            {section.links.map((link) =>
              renderLink(
                link as {
                  label: string;
                  href: string;
                  icon: string;
                  isAccent?: boolean;
                },
                collapsed
              )
            )}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* ============ DESKTOP SIDEBAR (lg+) ============ */}
      <aside
        className={cn(
          "hidden lg:flex flex-col border-r border-[#E5E5E5] bg-white transition-all duration-300 ease-in-out flex-shrink-0 h-full",
          isCollapsed ? "w-[68px]" : "w-[240px]"
        )}
        aria-label="Desktop sidebar"
      >
        {/* Collapse toggle button */}
        <div
          className={cn(
            "flex items-center border-b border-[#E5E5E5] h-12",
            isCollapsed ? "justify-center" : "justify-end px-3"
          )}
        >
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-md text-[#737373] hover:text-[#1A1A2E] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </div>

        {/* Scrollable sidebar content */}
        <div className="flex-1 overflow-y-auto">
          {renderSidebarContent(isCollapsed)}
        </div>
      </aside>

      {/* ============ MOBILE SIDEBAR OVERLAY (<lg) ============ */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-[70] h-full w-[280px] max-w-[85vw] bg-white shadow-[var(--shadow-xl)] transform transition-transform duration-300 ease-in-out lg:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile sidebar navigation"
      >
        {/* Mobile sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E5E5E5]">
          <span className="text-lg font-extrabold tracking-tight text-[#1A1A2E]">
            COMMERCE
          </span>
          <button
            onClick={onMobileClose}
            className="p-2 text-[#404040] hover:text-[#1A1A2E] transition-colors cursor-pointer"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile sidebar scrollable content */}
        <div className="overflow-y-auto h-[calc(100%-65px)]">
          {renderSidebarContent(false)}
        </div>
      </aside>
    </>
  );
}
