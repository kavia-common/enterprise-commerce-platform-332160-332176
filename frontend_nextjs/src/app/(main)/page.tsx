import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanner from "@/components/home/PromoBanner";
import Testimonials from "@/components/home/Testimonials";
import NewsletterSignup from "@/components/home/NewsletterSignup";

/**
 * Homepage — the primary landing page for the enterprise commerce platform.
 * Composed of distinct full-width sections following the design system.
 *
 * Sections use an alternating white/gray-50 background pattern to create
 * visual rhythm and separation. Each section has consistent vertical padding
 * based on the 8px grid system defined in the style guide.
 *
 * Section flow:
 *   1. Hero (dark gradient, full-bleed)
 *   2. Categories (white background)
 *   3. Featured Products (gray-50 background)
 *   4. Promo Banner (full-bleed split)
 *   5. Testimonials (gray-50 background)
 *   6. Newsletter (dark gradient, full-bleed)
 */
// PUBLIC_INTERFACE
export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white">
      {/* Hero section — full-bleed dark gradient with CTAs */}
      <HeroSection />

      {/* Shop by category grid — white background */}
      <CategoryGrid />

      {/* Featured products grid — subtle gray background for contrast */}
      <div className="bg-[#FAFAFA]">
        <FeaturedProducts />
      </div>

      {/* Promotional split-screen banner — full-bleed */}
      <PromoBanner />

      {/* Customer testimonials / social proof — subtle gray background */}
      <Testimonials />

      {/* Newsletter signup — dark gradient */}
      <NewsletterSignup />
    </div>
  );
}
