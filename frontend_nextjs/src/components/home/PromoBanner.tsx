import React from "react";

/**
 * Promotional split-screen banner section.
 * Left side: visual/image area, Right side: content with CTA.
 * Stacks vertically on mobile.
 */
// PUBLIC_INTERFACE
export default function PromoBanner() {
  return (
    <section className="w-full flex flex-col md:flex-row min-h-[400px] md:min-h-[500px]">
      {/* Image half */}
      <div className="w-full md:w-1/2 min-h-[300px] relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #16213E 0%, #0F3460 50%, #1A1A2E 100%)",
          }}
          aria-hidden="true"
        />
        {/* Decorative content placeholder */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <svg
            className="w-48 h-48 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={0.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      {/* Content half */}
      <div className="w-full md:w-1/2 bg-[#FAFAFA] flex flex-col justify-center px-8 md:px-12 lg:px-20 py-12 md:py-20">
        <div className="max-w-[480px]">
          {/* Eyebrow */}
          <span className="text-xs uppercase font-semibold tracking-[0.05em] text-[#E94560] mb-4 block">
            Limited Edition
          </span>

          {/* Headline */}
          <h2 className="text-2xl md:text-[32px] font-bold text-[#1A1A2E] leading-tight mb-4">
            Summer Collection 2024
          </h2>

          {/* Body text */}
          <p className="text-base text-[#525252] leading-relaxed mb-8">
            Discover our latest summer collection featuring lightweight fabrics,
            vibrant colors, and timeless silhouettes designed for the modern
            wardrobe.
          </p>

          {/* CTA */}
          <a
            href="/collections/summer"
            className="inline-flex items-center justify-center bg-[#E94560] text-white text-sm font-semibold uppercase tracking-[0.05em] px-8 py-3.5 rounded-lg hover:bg-[#D63851] hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(233,69,96,0.3)] active:translate-y-0 transition-all duration-200"
          >
            Explore Collection
          </a>
        </div>
      </div>
    </section>
  );
}
