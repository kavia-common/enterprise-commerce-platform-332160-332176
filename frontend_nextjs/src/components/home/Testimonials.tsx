import React from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

/**
 * Testimonials / social proof section displaying customer reviews
 * in a responsive card grid layout.
 *
 * Grid layout:
 *   - Mobile: 1 column
 *   - Tablet: 2 columns
 *   - Desktop: 3 columns
 *
 * Section uses a subtle gray-50 background for visual separation
 * from adjacent white sections.
 *
 * Section spacing:
 *   - Mobile: py-16 (64px)
 *   - Desktop: py-24 (96px)
 */
// PUBLIC_INTERFACE
export default function Testimonials() {
  return (
    <section className="w-full bg-[#FAFAFA]" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        {/* Section heading */}
        <div className="text-center mb-10 md:mb-12 lg:mb-14">
          <h2
            id="testimonials-heading"
            className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] font-bold text-[#262626] tracking-[-0.01em] mb-3"
          >
            What Our Customers Say
          </h2>
          <p className="text-sm sm:text-[15px] text-[#737373] max-w-md mx-auto leading-relaxed">
            Real reviews from real customers who love our products.
          </p>
        </div>

        {/* Testimonial cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      star <= testimonial.rating
                        ? "fill-[#F59E0B] text-[#F59E0B]"
                        : "fill-[#D4D4D4] text-[#D4D4D4]"
                    }
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[14px] sm:text-[15px] text-[#404040] italic leading-[1.7] mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Divider */}
              <div className="border-t border-[#E5E5E5] mb-4" />

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar placeholder with initials */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E5E5E5] flex items-center justify-center text-[13px] font-semibold text-[#525252] shrink-0">
                  {testimonial.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#262626]">
                    {testimonial.author}
                  </p>
                  <p className="text-[12px] sm:text-[13px] text-[#737373]">
                    {testimonial.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
