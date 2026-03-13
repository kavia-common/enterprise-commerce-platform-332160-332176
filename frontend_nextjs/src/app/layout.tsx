import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
 * Root layout component that provides the global HTML structure,
 * font configuration, and CSS reset for all pages.
 *
 * This layout is intentionally minimal — it does NOT include the
 * AppShell or DashboardShell. Each route group provides its own
 * shell layout:
 *   - (main) routes: AppShell with shopping sidebar
 *   - dashboard routes: DashboardShell with dashboard sidebar
 *
 * Layout structure:
 *   - <html> with Inter font variable
 *   - <body> with global font family
 *   - Skip-to-content accessibility link
 *   - Children rendered by nested route group layouts
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

        {children}
      </body>
    </html>
  );
}
