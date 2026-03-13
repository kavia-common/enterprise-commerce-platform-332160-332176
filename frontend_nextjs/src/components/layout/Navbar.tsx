"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Main navigation bar with sticky positioning and responsive layout.
 * Includes logo, navigation links, and utility icons (search, account, cart).
 * On mobile, shows a hamburger menu that opens a slide-over drawer.
 */
// PUBLIC_INTERFACE
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-white/95 backdrop-blur-[12px] border-b border-[#E5E5E5] shadow-[var(--shadow-sm)]"
            : "bg-white/95 backdrop-blur-[12px]"
        )}
      >
        <nav
          className="max-w-7xl mx-auto flex items-center justify-between h-[72px] px-4 md:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 -ml-2 text-[#1A1A2E] hover:text-[#E94560] transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <a
            href="/"
            className="text-xl font-extrabold tracking-tight text-[#1A1A2E] hover:text-[#E94560] transition-colors"
          >
            COMMERCE
          </a>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={cn(
                    "text-sm font-medium tracking-[0.02em] transition-colors duration-200 relative group",
                    link.isAccent
                      ? "text-[#E94560] hover:text-[#D63851]"
                      : "text-[#404040] hover:text-[#1A1A2E]"
                  )}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <svg
                      className="inline-block ml-1 w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                  {/* Animated underline */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E94560] transition-all duration-200 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Utility icons */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 text-[#404040] hover:text-[#1A1A2E] transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <a
              href="/login"
              className="hidden sm:block p-2 text-[#404040] hover:text-[#1A1A2E] transition-colors cursor-pointer"
              aria-label="Account — Sign in"
            >
              <User size={20} />
            </a>
            <button
              className="p-2 text-[#404040] hover:text-[#1A1A2E] transition-colors relative cursor-pointer"
              aria-label="Cart - 3 items"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-[#E94560] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 z-[70] h-full w-[85vw] max-w-[320px] bg-white shadow-[var(--shadow-xl)] transform transition-transform duration-300 ease-in-out lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex items-center justify-between p-4 border-b border-[#E5E5E5]">
          <span className="text-lg font-extrabold tracking-tight text-[#1A1A2E]">
            COMMERCE
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-[#404040] hover:text-[#1A1A2E] transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="py-4" aria-label="Mobile navigation">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={cn(
                    "flex items-center h-12 px-6 text-base font-medium border-b border-[#F5F5F5] transition-colors duration-200",
                    link.isAccent
                      ? "text-[#E94560]"
                      : "text-[#404040] hover:text-[#1A1A2E]"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto px-6 py-4 border-t border-[#F5F5F5]">
            <a
              href="/login"
              className="flex items-center gap-3 text-sm font-medium text-[#404040] hover:text-[#1A1A2E] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User size={20} />
              Sign In
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
