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
 * The homepage uses a red background colour scoped only to this route.
 * The global blue design-token theme (accents, buttons, links, etc.)
 * remains unchanged across the rest of the application.
 */
// PUBLIC_INTERFACE
export default function Home() {
  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: "#DC2626" }}
    >
      {/* Hero section with gradient background and CTAs */}
      <HeroSection />

      {/* Shop by category grid */}
      <CategoryGrid />

      {/* Featured products grid */}
      <FeaturedProducts />

      {/* Promotional split-screen banner */}
      <PromoBanner />

      {/* Customer testimonials / social proof */}
      <Testimonials />

      {/* Newsletter signup */}
      <NewsletterSignup />
    </div>
  );
}
