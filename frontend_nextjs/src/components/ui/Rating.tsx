import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  /** Rating value (0-5) */
  rating: number;
  /** Number of reviews */
  reviewCount?: number;
  /** Star size in pixels */
  size?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Star rating display component.
 * Shows filled/empty stars with optional review count.
 */
// PUBLIC_INTERFACE
export default function Rating({
  rating,
  reviewCount,
  size = 14,
  className,
}: RatingProps) {
  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={cn(
            star <= Math.round(rating)
              ? "fill-[#F59E0B] text-[#F59E0B]"
              : "fill-[#D4D4D4] text-[#D4D4D4]"
          )}
          aria-hidden="true"
        />
      ))}
      {rating > 0 && (
        <span
          className="text-xs font-semibold text-[#262626] ml-1"
          aria-label={`${rating} out of 5 stars`}
        >
          {rating}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-[#A3A3A3] ml-1">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
