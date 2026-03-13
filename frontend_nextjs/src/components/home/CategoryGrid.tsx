import React from "react";
import { CATEGORIES } from "@/lib/constants";

/**
 * Featured categories section displaying a grid of category cards.
 * Each card has a colored gradient background with category name and item count.
 */
// PUBLIC_INTERFACE
export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 lg:py-20">
      {/* Section heading */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-[32px] font-bold text-[#262626] tracking-[-0.01em] mb-3">
          Shop by Category
        </h2>
        <p className="text-[15px] text-[#737373] max-w-md mx-auto">
          Browse our curated collections and find exactly what you&apos;re looking for.
        </p>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {CATEGORIES.map((category) => (
          <a
            key={category.slug}
            href={`/shop/${category.slug}`}
            className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
          >
            {/* Background gradient */}
            <div
              className="absolute inset-0 transition-transform duration-600 ease-out group-hover:scale-110"
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

            {/* Text content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <span className="text-base md:text-lg font-semibold mb-1">
                {category.name}
              </span>
              <span className="text-xs text-white/70">
                {category.itemCount} items
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
