import React from "react";
import Link from "next/link";
import { FOOTER_COLUMNS, SOCIAL_LINKS } from "@/lib/constants";

/**
 * Site footer with multi-column link layout, brand description,
 * social media icons, and copyright notice.
 */
// PUBLIC_INTERFACE
export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-white w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-16 pb-8">
        {/* Top section: grid of columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div>
            <Link href="/" className="text-xl font-extrabold tracking-tight">
              COMMERCE
            </Link>
            <p className="text-sm text-white/60 mt-4 max-w-xs leading-relaxed">
              Curated collections for the modern lifestyle. Quality products,
              exceptional service, and timeless style.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  <SocialIcon name={social.label} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm uppercase font-semibold tracking-[0.05em] mb-5">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 gap-4">
          <p className="text-[13px] text-white/40">
            © {new Date().getFullYear()} Commerce. All rights reserved.
          </p>
          {/* Payment icons placeholder */}
          <div className="flex items-center gap-3">
            {["Visa", "Mastercard", "Amex", "PayPal"].map((method) => (
              <span
                key={method}
                className="text-[11px] text-white/40 bg-white/10 px-2 py-1 rounded"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Simple SVG social media icons
 */
function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case "Instagram":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case "Twitter":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      );
    case "Facebook":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    default:
      return null;
  }
}
