import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Commerce — Discover Your Style",
  description:
    "Enterprise commerce platform with curated collections for the modern lifestyle. Premium quality products, timeless designs, and exceptional craftsmanship.",
};

/**
 * Root layout component that wraps all pages with the global
 * font, announcement bar, navigation, and footer.
 */
// PUBLIC_INTERFACE
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-[family-name:var(--font-inter)]" suppressHydrationWarning>
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        {/* Announcement bar */}
        <AnnouncementBar />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main id="main-content">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
