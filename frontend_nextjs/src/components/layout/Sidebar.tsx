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
 * localStorage key used to persist the desktop sidebar collapsed state.
 * Keeping this as a module-level constant ensures a single source of truth
 * and makes it easy to find or change.
 */
const SIDEBAR_COLLAPSED_KEY = "sidebar-collapsed";

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
 * Reads the persisted sidebar collapsed preference from localStorage.
 * Returns `false` (expanded) when running on the server or if
 * localStorage is unavailable / the key has never been set.
 *
 * @returns The persisted collapsed state, defaulting to false.
 */
function readPersistedCollapsed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    return stored === "true";
  } catch {
    // localStorage may be blocked (e.g. private browsing in some browsers)
    return false;
  }
}

/**
 * Writes the sidebar collapsed state to localStorage.
 * Silently ignores errors (quota exceeded, blocked storage, etc.).
 *
 * @param collapsed - The collapsed state to persist.
 */
function writePersistedCollapsed(collapsed: boolean): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(collapsed));
  } catch {
    // Silently ignore storage errors
  }
}

/**
 * Left sidebar navigation component with responsive behavior.
 *
 * Desktop (lg+):
 *   - Always visible as a fixed-width side panel.
 *   - Supports collapsed (icon-only, 68px) and expanded (240px) modes.
 *   - A toggle button (chevron) switches between modes.
 *   - Collapsed/expanded preference is persisted in localStorage so
 *     the user's choice survives page reloads and navigation.
 *
 * Mobile/Tablet (<lg):
 *   - Hidden by default; toggled via an external hamburger button.
 *   - Renders as a slide-over drawer with a backdrop overlay.
 *   - Always shown in expanded mode (never icon-only).
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
  // ---- Desktop collapsed state with localStorage persistence ----
  // Start with `false` on the server; hydrate from localStorage on mount.
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Track whether the client has hydrated the persisted value.
  const [isHydrated, setIsHydrated] = useState(false);

  /**
   * On first client render, read the persisted preference so the sidebar
   * opens in the same state the user left it. We delay reading until
   * useEffect to keep SSR output deterministic (always expanded).
   */
  useEffect(() => {
    setIsCollapsed(readPersistedCollapsed());
    setIsHydrated(true);
  }, []);

  /**
   * Toggle the desktop sidebar collapsed state and persist the new value.
   */
  const handleToggleCollapsed = useCallback(() => {
    setIsCollapsed((prev) => {
      const next = !prev;
      writePersistedCollapsed(next);
      return next;
    });
  }, []);

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
   * When `collapsed` is true, only the icon is shown and the label
   * is provided via a `title` attribute for hover tooltips.
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
        {!collapsed && (
          <span className="truncate transition-opacity duration-200">
            {link.label}
          </span>
        )}
      </Link>
    );
  };

  /**
   * Renders the sidebar content (sections and links).
   * When collapsed, section headers are replaced with thin dividers.
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
      {/*
        Width transitions smoothly between collapsed (68px) and expanded (240px).
        Opacity of the toggle area avoids a flash on first paint before
        the persisted state is hydrated from localStorage.
      */}
      <aside
        className={cn(
          "hidden lg:flex flex-col border-r border-[#E5E5E5] bg-white transition-all duration-300 ease-in-out flex-shrink-0 h-full",
          isCollapsed ? "w-[68px]" : "w-[240px]",
          // Avoid visible layout shift before hydration completes
          !isHydrated && "opacity-0"
        )}
        style={{
          // Ensure opacity transitions smoothly after hydration
          transition: isHydrated
            ? "width 300ms ease-in-out, opacity 150ms ease-in"
            : "opacity 150ms ease-in",
        }}
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
            onClick={handleToggleCollapsed}
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

      {/* Mobile sidebar drawer — always expanded, never icon-only */}
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

        {/* Mobile sidebar scrollable content — always expanded */}
        <div className="overflow-y-auto h-[calc(100%-65px)]">
          {renderSidebarContent(false)}
        </div>
      </aside>
    </>
  );
}
