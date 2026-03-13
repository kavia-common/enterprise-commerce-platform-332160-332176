import React from "react";
import { cn } from "@/lib/utils";

/**
 * Badge variant styles
 */
const badgeVariants = {
  sale: "bg-[#E94560] text-white",
  new: "bg-[#1A1A2E] text-white",
  success: "bg-[#10B981] text-white",
  warning: "bg-[#F59E0B] text-white",
  error: "bg-[#EF4444] text-white",
  neutral: "bg-[#F5F5F5] text-[#404040]",
} as const;

interface BadgeProps {
  /** Visual variant */
  variant?: keyof typeof badgeVariants;
  /** Badge label text */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Badge component for labels, tags, and status indicators.
 */
// PUBLIC_INTERFACE
export default function Badge({
  variant = "neutral",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.05em] px-2.5 py-1 rounded-[var(--radius-sm)]",
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
