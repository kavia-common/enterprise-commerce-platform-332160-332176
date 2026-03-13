import React from "react";

/**
 * Custom 404 page following the enterprise commerce design system.
 */
// PUBLIC_INTERFACE
export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Large 404 number */}
        <p className="text-8xl font-extrabold text-[#E5E5E5] mb-4">404</p>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#262626] mb-3">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-[15px] text-[#737373] mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* CTA */}
        <a
          href="/"
          className="inline-flex items-center justify-center bg-[#E94560] text-white text-sm font-semibold uppercase tracking-[0.05em] px-8 py-3.5 rounded-lg hover:bg-[#D63851] hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(233,69,96,0.3)] active:translate-y-0 transition-all duration-200"
        >
          Back to Home
        </a>
      </div>
    </section>
  );
}
