import React from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

/**
 * Testimonials / social proof section displaying customer reviews
 * in a card grid layout.
 */
// PUBLIC_INTERFACE
export default function Testimonials() {
  return (
    <section className="w-full bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 lg:py-20">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-[32px] font-bold text-[#262626] tracking-[-0.01em] mb-3">
            What Our Customers Say
          </h2>
          <p className="text-[15px] text-[#737373] max-w-md mx-auto">
            Real reviews from real customers who love our products.
          </p>
        </div>

        {/* Testimonial cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-8 shadow-[var(--shadow-sm)]"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
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
              <p className="text-[15px] text-[#404040] italic leading-[1.7] mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Divider */}
              <div className="border-t border-[#E5E5E5] mb-4" />

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="w-11 h-11 rounded-full bg-[#E5E5E5] flex items-center justify-center text-sm font-semibold text-[#525252] shrink-0">
                  {testimonial.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#262626]">
                    {testimonial.author}
                  </p>
                  <p className="text-[13px] text-[#737373]">
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
