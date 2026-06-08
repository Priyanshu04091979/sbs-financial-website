"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// ─────────────────────────────────────────────
//  NAV CONFIG — add / remove links here freely
// ─────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",        href: "/" },
  { label: "About Us",   href: "/about" },
  { label: "Services",   href: "/services" },
  { label: "Products",   href: "/products" },
  { label: "Calculator", href: "/calculator" },
  { label: "Contact",    href: "/contact" },
  // { label: "Testimonials", href: "/testimonials" },
];

// ─────────────────────────────────────────────
//  LOGO CONFIG — size yahan se change karo ✏️
// ─────────────────────────────────────────────
const LOGO_SRC = "/logo/Sbs-1.png";
const LOGO_ALT = "SBS Financial Services";
const LOGO_W   = 160;   // ← width pixels mein badao/ghatao
const LOGO_H   = 52;    // ← height pixels mein badao/ghatao

// ─────────────────────────────────────────────
//  COLOR CONFIG — colors yahan se change karo ✏️
// ─────────────────────────────────────────────
const COLORS = {
  navBg:          "#fbf3e4",        // navbar background
  navBorder:      "#e8e8e8",        // bottom border
  linkDefault:    "#333333",        // normal link color
  linkActive:     "#111111",        // active/hover link color
  activeUnderline:"#C9A84C",        // gold underline color ← yahan se change karo
  ctaBg:          "transparent",    // bespoke button background ← transparent rakha
  ctaColor:       "#111111",        // bespoke button text color
  ctaBorder:      "#111111",        // bespoke button border color
  ctaHoverBg:     "#111111",        // bespoke button hover background
  ctaHoverColor:  "#ffffff",        // bespoke button hover text color
};

// ─────────────────────────────────────────────
//  NAVBAR
// ─────────────────────────────────────────────
const NavbarSection: React.FC = () => {
  const pathname                      = usePathname();
  const [hoveredLink, setHoveredLink] = React.useState<string | null>(null);
  const [ctaHover,    setCtaHover]    = React.useState(false);

  return (
    <nav
      style={{
        position:        "fixed",
        top:             0,
        left:            0,
        right:           0,
        zIndex:          100,
        backgroundColor: COLORS.navBg,
        borderBottom:    `1px solid ${COLORS.navBorder}`,
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "space-between",
        padding:         "0 48px",
        height:          "64px",
        fontFamily:      "'Montserrat', sans-serif",
      }}
    >
      {/* ── Logo ── */}
      <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        {LOGO_SRC ? (
          <Image
            src={LOGO_SRC}
            alt={LOGO_ALT}
            width={LOGO_W}
            height={LOGO_H}
            style={{ objectFit: "contain" }}
            priority
          />
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "22px", color: "#111", letterSpacing: "0.02em" }}>
              SBS
            </span>
            <span style={{ fontWeight: 500, fontSize: "13px", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", paddingLeft: "8px", borderLeft: "1px solid #ccc" }}>
              Financial
            </span>
          </div>
        )}
      </Link>

      {/* ── Nav Links ── */}
      <ul style={{ display: "flex", alignItems: "center", gap: "36px", listStyle: "none", margin: 0, padding: 0 }}>
        {NAV_LINKS.map((link) => {
          // ✅ FIX: pathname se compare — no more static active
          const isActive  = pathname === link.href;
          const isHovered = hoveredLink === link.label;

          return (
            <li key={link.label}>
              <Link
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  textDecoration: "none",
                  fontSize:       "12px",
                  fontWeight:     600,
                  letterSpacing:  "0.08em",
                  textTransform:  "uppercase",
                  color:          isActive || isHovered ? COLORS.linkActive : COLORS.linkDefault,
                  paddingBottom:  "2px",
                  borderBottom:   isActive  ? `2px solid ${COLORS.activeUnderline}`
                                : isHovered ? `2px solid ${COLORS.activeUnderline}99`
                                :             "2px solid transparent",
                  transition:     "color 0.2s, border-bottom 0.2s",
                }}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* ── CTA Button ── ✅ FIX: transparent bg, border only */}
      <Link
        href="/contact"
        onMouseEnter={() => setCtaHover(true)}
        onMouseLeave={() => setCtaHover(false)}
        style={{
          display:         "inline-block",
          backgroundColor: ctaHover ? COLORS.ctaHoverBg    : COLORS.ctaBg,
          color:           ctaHover ? COLORS.ctaHoverColor  : COLORS.ctaColor,
          border:          `1.5px solid ${COLORS.ctaBorder}`,
          padding:         "9px 22px",
          letterSpacing:   "0.08em",
          textTransform:   "uppercase",
          fontSize:        "11px",
          fontWeight:      700,
          textDecoration:  "none",
          cursor:          "pointer",
          transition:      "background 0.2s, color 0.2s",
          fontFamily:      "'Montserrat', sans-serif",
        }}
      >
        Contact Us
      </Link>
    </nav>
  );
};

export default NavbarSection;