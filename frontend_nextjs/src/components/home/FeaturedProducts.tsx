import React from "react";
import ProductCard from "@/components/product/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/constants";

/**
 * Featured products section displaying a grid of product cards
 * with a section header and "View All" link.
 */
// PUBLIC_INTERFACE
export default function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 lg:py-20">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10">
        <div>
          <h2 className="text-2xl md:text-[32px] font-bold text-[#262626] tracking-[-0.01em] mb-2">
            Featured Products
          </h2>
          <p className="text-[15px] text-[#737373]">
            Handpicked selections our customers love.
          </p>
        </div>
        <a
          href="/shop"
          className="text-sm font-medium text-[#E94560] hover:text-[#D63851] mt-4 sm:mt-0 transition-colors"
        >
          View All →
        </a>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
