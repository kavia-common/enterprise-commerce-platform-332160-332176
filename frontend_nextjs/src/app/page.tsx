import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanner from "@/components/home/PromoBanner";
import Testimonials from "@/components/home/Testimonials";
import NewsletterSignup from "@/components/home/NewsletterSignup";

/**
 * Homepage — the primary landing page for the enterprise commerce platform.
 * Composed of distinct full-width sections following the design system.
 */
// PUBLIC_INTERFACE
export default function Home() {
  return (
    <>
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
    </>
  );
}
