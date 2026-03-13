import React from "react";

/**
 * Hero section with bold gradient background, headline text,
 * and primary/secondary CTA buttons.
 * Full-width with vertically centered content.
 */
// PUBLIC_INTERFACE
export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center overflow-hidden"
      aria-label="Hero banner"
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)",
        }}
        aria-hidden="true"
      />

      {/* Decorative pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 50%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-[800px] mx-auto px-4 md:px-8 py-16 md:py-20 lg:py-24">
        {/* Eyebrow */}
        <span className="inline-block text-xs uppercase tracking-[0.1em] text-white/80 font-semibold mb-4">
          New Collection
        </span>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.1] tracking-[-0.02em] mb-6">
          Discover Your Style
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-white/70 max-w-lg mx-auto mb-10">
          Curated collections for the modern lifestyle. Premium quality,
          timeless designs, and exceptional craftsmanship.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/shop"
            className="inline-flex items-center justify-center bg-[#E94560] text-white text-sm font-semibold uppercase tracking-[0.05em] px-8 py-3.5 rounded-lg hover:bg-[#D63851] hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(233,69,96,0.3)] active:translate-y-0 transition-all duration-200 w-full sm:w-auto"
          >
            Shop Now
          </a>
          <a
            href="/collections"
            className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white text-sm font-semibold uppercase tracking-[0.05em] px-8 py-3.5 rounded-lg hover:bg-white hover:text-[#1A1A2E] transition-all duration-200 w-full sm:w-auto"
          >
            View Lookbook
          </a>
        </div>
      </div>
    </section>
  );
}
