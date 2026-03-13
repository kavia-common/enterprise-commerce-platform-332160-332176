import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import AppShell from "@/components/layout/AppShell";
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
 * font, announcement bar, navigation (top navbar + left sidebar),
 * centered main content, and footer.
 *
 * Layout structure:
 *   - Announcement bar (top, dismissible)
 *   - AppShell (navbar at top, sidebar on left, main content centered)
 *   - Footer (below main content, scrolls with page)
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

        {/* Application shell: top navbar + left sidebar + centered main content */}
        <AppShell>
          {children}
          {/* Footer inside AppShell so it scrolls with content */}
          <Footer />
        </AppShell>
      </body>
    </html>
  );
}
