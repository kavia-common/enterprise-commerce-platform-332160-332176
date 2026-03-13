"use client";

import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "@/components/product/ProductCard";
import { fetchProducts, ApiProduct } from "@/lib/api";
import { MOCK_PRODUCTS } from "@/lib/constants";

/**
 * Shape expected by ProductCard, derived from the product data.
 */
interface DisplayProduct {
  id: string;
  brand: string;
  name: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviewCount: number;
  badge: "SALE" | "NEW" | null;
  slug: string;
}

/**
 * Maps a backend API product to the display shape expected by ProductCard.
 * Price from the API is in dollars; ProductCard uses formatPrice (cents),
 * so we convert dollars to cents.
 *
 * Fields not provided by the API (brand, rating, etc.) receive sensible defaults.
 *
 * @param apiProduct - Raw product from the backend API
 * @returns DisplayProduct compatible with ProductCard
 */
function mapApiProductToDisplay(apiProduct: ApiProduct): DisplayProduct {
  // Convert dollar price to cents for formatPrice compatibility
  const priceInCents = Math.round(apiProduct.price * 100);

  // Derive a URL-friendly slug from the product name
  const slug = apiProduct.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Determine badge based on product state
  let badge: "SALE" | "NEW" | null = null;
  if (apiProduct.created_at) {
    const createdDate = new Date(apiProduct.created_at);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    if (createdDate > sevenDaysAgo) {
      badge = "NEW";
    }
  }

  return {
    id: apiProduct.id,
    brand: apiProduct.category || "Brand",
    name: apiProduct.name,
    price: priceInCents,
    originalPrice: null,
    rating: 4.5,
    reviewCount: 0,
    badge,
    slug,
  };
}

/**
 * Featured products section displaying a responsive grid of product cards
 * with a section header and "View All" navigation link.
 *
 * Fetches real product data from the backend API on mount.
 * Shows a loading skeleton during fetch, an error message with retry on failure,
 * and falls back to mock products if no real data is available.
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
  const [products, setProducts] = useState<DisplayProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usedFallback, setUsedFallback] = useState<boolean>(false);

  /**
   * Loads products from the backend API.
   * On failure, falls back to MOCK_PRODUCTS so the UI is never empty.
   */
  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setUsedFallback(false);

    try {
      const response = await fetchProducts({ limit: 8, sort_by: "created_at", sort_order: "desc" });

      // Handle both possible response shapes gracefully
      const apiProducts: ApiProduct[] = response?.data?.products ?? [];

      if (apiProducts.length > 0) {
        setProducts(apiProducts.map(mapApiProductToDisplay));
      } else {
        // API returned empty list — use fallback mock data
        setProducts(MOCK_PRODUCTS.map((p) => ({ ...p })));
        setUsedFallback(true);
      }
    } catch (err) {
      // Network or server error — use fallback mock data
      const message = err instanceof Error ? err.message : "Failed to load products";
      setError(message);
      setProducts(MOCK_PRODUCTS.map((p) => ({ ...p })));
      setUsedFallback(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

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

      {/* Loading state — skeleton cards */}
      {isLoading && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
          aria-busy="true"
          aria-label="Loading products"
        >
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={`skeleton-${idx}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse"
            >
              {/* Image placeholder */}
              <div className="aspect-[4/5] bg-gray-200" />
              {/* Content placeholder */}
              <div className="p-4 space-y-3">
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
                <div className="h-5 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error banner with retry — shown above fallback products */}
      {!isLoading && error && (
        <div
          className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm"
          role="alert"
        >
          <span className="flex-1">
            Unable to load latest products. Showing sample products instead.
          </span>
          <button
            onClick={loadProducts}
            className="text-sm font-medium text-red-700 hover:text-red-900 underline whitespace-nowrap cursor-pointer"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty state — only if not loading and genuinely no products */}
      {!isLoading && products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[#737373] text-base">
            No products available at the moment. Please check back soon!
          </p>
        </div>
      )}

      {/* Product grid — renders real or fallback products */}
      {!isLoading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Subtle indicator when showing fallback data without error */}
      {!isLoading && usedFallback && !error && (
        <p className="mt-4 text-xs text-[#A3A3A3] text-center">
          Showing sample products.
        </p>
      )}
    </section>
  );
}
