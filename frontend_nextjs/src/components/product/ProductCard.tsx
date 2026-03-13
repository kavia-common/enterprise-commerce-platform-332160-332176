"use client";

import React from "react";
import { Heart } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Rating from "@/components/ui/Rating";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  /** Product data */
  product: {
    id: string;
    brand: string;
    name: string;
    price: number;
    originalPrice: number | null;
    rating: number;
    reviewCount: number;
    badge: "SALE" | "NEW" | null;
    slug: string;
  };
}

/**
 * Product card component displaying product image placeholder,
 * brand, name, rating, price, and interactive elements
 * (wishlist button, quick add overlay).
 */
// PUBLIC_INTERFACE
export default function ProductCard({ product }: ProductCardProps) {
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : null;

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300 ease-in-out">
      {/* Image area */}
      <div className="relative aspect-[4/5] bg-[#F5F5F5] overflow-hidden">
        {/* Placeholder gradient simulating product image */}
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
          style={{
            background: `linear-gradient(145deg, #F5F5F5 0%, #E5E5E5 50%, #D4D4D4 100%)`,
          }}
          aria-hidden="true"
        />

        {/* Product icon placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-[#A3A3A3]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant={product.badge === "SALE" ? "sale" : "new"}>
              {product.badge}
            </Badge>
          </div>
        )}

        {/* Wishlist button */}
        <button
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-white rounded-full shadow-[var(--shadow-sm)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:scale-110"
          aria-label={`Add ${product.name} to wishlist`}
        >
          <Heart size={18} className="text-[#525252] hover:text-[#E94560] hover:fill-[#E94560] transition-colors" />
        </button>

        {/* Quick add overlay */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-10">
          <button
            className="w-full h-11 bg-[#1A1A2E] text-white text-[13px] uppercase font-semibold tracking-[0.05em] flex items-center justify-center hover:bg-[#E94560] transition-colors duration-200 cursor-pointer"
            aria-label={`Quick add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-xs uppercase text-[#737373] tracking-[0.03em] mb-1">
          {product.brand}
        </p>

        {/* Product name */}
        <h3 className="text-[15px] font-semibold text-[#262626] mb-2 line-clamp-2">
          <a href={`/product/${product.slug}`} className="hover:text-[#E94560] transition-colors">
            {product.name}
          </a>
        </h3>

        {/* Rating */}
        <Rating
          rating={product.rating}
          reviewCount={product.reviewCount}
          className="mb-2"
        />

        {/* Price row */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#171717]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-[#A3A3A3] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          {discount && (
            <span className="text-xs font-semibold text-[#E94560]">
              -{discount}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
