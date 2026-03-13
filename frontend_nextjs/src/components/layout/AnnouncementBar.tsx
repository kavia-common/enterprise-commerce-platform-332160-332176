"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

/**
 * Announcement bar displayed at the very top of the page.
 * Shows a promotional message and can be dismissed by the user.
 */
// PUBLIC_INTERFACE
export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className="bg-[#1A1A2E] text-white h-10 flex items-center justify-center relative w-full"
      role="status"
      aria-live="polite"
    >
      <p className="text-xs uppercase font-medium tracking-[0.05em] text-center px-10">
        Free Shipping on Orders Over $50 |{" "}
        <a
          href="/shop"
          className="underline decoration-transparent hover:decoration-white transition-all duration-200"
        >
          Shop Now →
        </a>
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-opacity duration-200 cursor-pointer"
        aria-label="Dismiss announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
}
