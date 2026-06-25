import type { NextConfig } from "next";

// ─── Security HTTP Response Headers ──────────────────────────────────────────
// Applied to every page response. Defends against clickjacking (X-Frame-Options),
// MIME-sniffing (X-Content-Type-Options), XSS (CSP + X-XSS-Protection),
// information leakage (Referrer-Policy), and protocol downgrade (HSTS).
const securityHeaders = [
  {
    // Clickjacking prevention: disallows this site from being embedded in any iframe.
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    // MIME-sniffing prevention: browser must respect declared Content-Type.
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Legacy XSS filter (IE/old Chrome). CSP below is the modern replacement.
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    // HTTPS enforcement: once loaded over HTTPS, never downgrade to HTTP.
    // max-age = 1 year, also applies to subdomains.
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    // Referrer leakage prevention: only send origin on same-site requests.
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Permissions Policy: restrict browser features the site doesn't need.
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    // Content Security Policy (XSS defence-in-depth):
    // - default-src: block everything not explicitly allowed
    // - script-src: only self + Next.js inline (unsafe-inline for RSC hydration)
    // - style-src: self + inline styles needed by Tailwind / CSS-in-JS
    // - img-src: self + data URIs + Unsplash CDN (used in ContactForm background)
    // - connect-src: self + Google Apps Script (form submission endpoint)
    // - frame-src: Google Maps embeds
    // - font-src: Google Fonts
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval needed by Next.js dev/prod
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://images.unsplash.com",
      "connect-src 'self' https://script.google.com https://script.googleusercontent.com",
      "frame-src https://maps.google.com https://www.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://script.google.com",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;