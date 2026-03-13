"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Button variant styles mapping
 */
const variants = {
  primary:
    "bg-[#E94560] text-white hover:bg-[#D63851] hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(233,69,96,0.3)] active:translate-y-0 active:shadow-[0_2px_6px_rgba(233,69,96,0.2)]",
  secondary:
    "bg-transparent border-2 border-[#1A1A2E] text-[#1A1A2E] hover:bg-[#1A1A2E] hover:text-white",
  ghost:
    "bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1A1A2E]",
  danger:
    "bg-[#EF4444] text-white hover:bg-[#DC2626] hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(239,68,68,0.3)]",
  link: "bg-transparent border-none text-[#E94560] hover:underline p-0 uppercase-none tracking-normal font-medium",
} as const;

/**
 * Button size styles mapping
 */
const sizes = {
  sm: "px-5 py-2 text-xs h-9",
  md: "px-8 py-3.5 text-sm h-12",
  lg: "px-10 py-4 text-base h-14",
} as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: keyof typeof variants;
  /** Size of the button */
  size?: keyof typeof sizes;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Optional icon to display */
  children: React.ReactNode;
}

/**
 * Reusable Button component with multiple variants and sizes.
 * Follows the enterprise commerce design system.
 */
// PUBLIC_INTERFACE
export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const isLink = variant === "link";

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold uppercase tracking-[0.05em] transition-all duration-200 ease-in-out cursor-pointer rounded-[var(--radius-md)]",
        !isLink && variants[variant],
        !isLink && sizes[size],
        isLink && variants.link,
        (disabled || loading) && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
