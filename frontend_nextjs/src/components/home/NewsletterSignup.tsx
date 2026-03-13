"use client";

import React, { useState } from "react";

/**
 * Newsletter signup section with email input and subscribe button.
 * Dark gradient background with centered content layout.
 *
 * Form features:
 *   - Accessible label (sr-only for visual cleanliness)
 *   - Email validation via native HTML5
 *   - Success feedback after submission
 *   - Auto-reset of success state after 3 seconds
 *
 * Layout:
 *   - Mobile: stacked input + button, full width
 *   - Desktop: inline input + button row
 *
 * Section spacing:
 *   - Mobile: py-16 (64px)
 *   - Desktop: py-24 (96px)
 */
// PUBLIC_INTERFACE
export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      // Reset feedback after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section
      className="w-full"
      style={{
        background:
          "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)",
      }}
      aria-labelledby="newsletter-heading"
    >
      <div className="max-w-[600px] mx-auto px-6 sm:px-8 py-16 md:py-20 lg:py-24 text-center">
        {/* Heading */}
        <h2
          id="newsletter-heading"
          className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] font-bold text-white mb-3"
        >
          Stay in the Loop
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-8 md:mb-10">
          Subscribe for exclusive deals, new arrivals, and style inspiration.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
          aria-label="Newsletter signup"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 h-[52px] bg-white text-[#262626] text-base px-6 rounded-full outline-none focus:ring-2 focus:ring-[#E94560] focus:ring-offset-2 focus:ring-offset-transparent placeholder:text-[#A3A3A3]"
          />
          <button
            type="submit"
            className="h-[52px] bg-[#E94560] text-white text-sm font-semibold uppercase tracking-[0.05em] px-8 rounded-full hover:bg-[#D63851] transition-colors duration-200 cursor-pointer whitespace-nowrap"
          >
            {submitted ? "Subscribed ✓" : "Subscribe"}
          </button>
        </form>

        {/* Status announcement for screen readers */}
        {submitted && (
          <p role="status" className="sr-only">
            Successfully subscribed to the newsletter.
          </p>
        )}

        {/* Privacy note */}
        <p className="text-[11px] sm:text-xs text-white/50 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
