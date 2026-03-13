import React from "react";
import ProductCard from "@/components/product/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/constants";

/**
 * Featured products section displaying a responsive grid of product cards
 * with a section header and "View All" navigation link.
 *
 * Grid layout:
 *   - Mobile: 1 column
 *   - Small tablet: 2 columns
 *   - Desktop: 3 columns
 *   - Wide desktop: 4 columns
 *
 * Section spacing follows the 8px grid system:
 *   - Mobile: py-16 (64px)
 *   - Desktop: py-24 (96px)
 */
// PUBLIC_INTERFACE
export default function FeaturedProducts() {
  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24"
      aria-labelledby="featured-products-heading"
    >
      {/* Section header — title/subtitle left, "View All" link right */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-10 lg:mb-12 gap-4">
        <div>
          <h2
            id="featured-products-heading"
            className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] font-bold text-[#262626] tracking-[-0.01em] mb-2"
          >
            Featured Products
          </h2>
          <p className="text-sm sm:text-[15px] text-[#737373] leading-relaxed">
            Handpicked selections our customers love.
          </p>
        </div>
        <a
          href="/shop"
          className="text-sm font-medium text-[#E94560] hover:text-[#D63851] transition-colors whitespace-nowrap group"
        >
          View All{" "}
          <span
            className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            →
          </span>
        </a>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
