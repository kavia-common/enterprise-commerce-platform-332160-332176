import React from "react";
import { CATEGORIES } from "@/lib/constants";

/**
 * Featured categories section displaying a responsive grid of category cards.
 * Each card has a colored gradient background with category name and item count.
 *
 * Grid layout:
 *   - Mobile: 2 columns
 *   - Tablet: 3 columns
 *   - Desktop: 6 columns (one per category)
 *
 * Section spacing follows the 8px grid system:
 *   - Mobile: py-16 (64px)
 *   - Desktop: py-24 (96px)
 */
// PUBLIC_INTERFACE
export default function CategoryGrid() {
  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24"
      aria-labelledby="category-heading"
    >
      {/* Section heading */}
      <div className="text-center mb-10 md:mb-12 lg:mb-14">
        <h2
          id="category-heading"
          className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] font-bold text-[#262626] tracking-[-0.01em] mb-3"
        >
          Shop by Category
        </h2>
        <p className="text-sm sm:text-[15px] text-[#737373] max-w-md mx-auto leading-relaxed">
          Browse our curated collections and find exactly what you&apos;re
          looking for.
        </p>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {CATEGORIES.map((category) => (
          <a
            key={category.slug}
            href={`/shop/${category.slug}`}
            className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-[#E94560] focus-visible:ring-offset-2"
          >
            {/* Background gradient */}
            <div
              className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.08]"
              style={{
                background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}CC 50%, ${category.color}99 100%)`,
              }}
              aria-hidden="true"
            />

            {/* Dark overlay on hover */}
            <div
              className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"
              aria-hidden="true"
            />

            {/* Text content — centered in card */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <span className="text-[15px] sm:text-base md:text-lg font-semibold mb-1 text-center leading-tight">
                {category.name}
              </span>
              <span className="text-[11px] sm:text-xs text-white/70">
                {category.itemCount} items
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
