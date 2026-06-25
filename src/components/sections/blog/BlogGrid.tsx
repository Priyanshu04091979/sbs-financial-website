"use client";

import React, { useEffect, useRef, useState } from "react";

const CATEGORIES = ["All", "Mutual Funds", "Wealth Management", "Tax Planning", "Insurance", "Market Insights"];

const POSTS = [
  {
    category: "Mutual Funds",
    date: "June 18, 2026",
    readTime: "5 min read",
    title: "SIP vs Lumpsum: Which Strategy Fits Your Financial Goals?",
    excerpt:
      "Systematic Investment Plans and lumpsum investments each have their merits. We break down when to use each strategy for maximum wealth creation.",
    featured: true,
    gradient: "linear-gradient(135deg, #1a2a4a 0%, #000613 100%)",
    accentColor: "#C9A84C",
  },
  {
    category: "Tax Planning",
    date: "June 12, 2026",
    readTime: "7 min read",
    title: "Top 10 Tax-Saving Investment Options Under Section 80C",
    excerpt:
      "A comprehensive guide to maximizing your tax deductions while building long-term wealth through ELSS, PPF, NPS and other Section 80C instruments.",
    featured: false,
    gradient: "linear-gradient(135deg, #1a3a2a 0%, #0a1a10 100%)",
    accentColor: "#4CAF50",
  },
  {
    category: "Market Insights",
    date: "June 5, 2026",
    readTime: "4 min read",
    title: "India's Equity Market: Outlook for H2 2026",
    excerpt:
      "With inflation moderating and strong corporate earnings, here's what investors should expect from Indian equities in the second half of 2026.",
    featured: false,
    gradient: "linear-gradient(135deg, #2a1a3a 0%, #100a1a 100%)",
    accentColor: "#9C6FE4",
  },
  {
    category: "Wealth Management",
    date: "May 28, 2026",
    readTime: "6 min read",
    title: "How to Build a Diversified Portfolio for Long-Term Growth",
    excerpt:
      "Diversification is more than just spreading money across stocks. Learn how asset allocation across equity, debt, gold, and REITs can protect and grow your wealth.",
    featured: false,
    gradient: "linear-gradient(135deg, #3a2a1a 0%, #1a0a00 100%)",
    accentColor: "#E4906F",
  },
  {
    category: "Insurance",
    date: "May 20, 2026",
    readTime: "5 min read",
    title: "Term Life vs Whole Life Insurance: Making the Right Choice",
    excerpt:
      "Insurance is the bedrock of financial planning. Understand the key differences between term and whole life policies to protect your family's future.",
    featured: false,
    gradient: "linear-gradient(135deg, #1a3a3a 0%, #001a1a 100%)",
    accentColor: "#4CCFCF",
  },
  {
    category: "Mutual Funds",
    date: "May 14, 2026",
    readTime: "8 min read",
    title: "Understanding NAV, Expense Ratio, and Exit Load in Mutual Funds",
    excerpt:
      "Before you invest in any mutual fund, you need to understand the key metrics that affect your actual returns. We demystify the jargon.",
    featured: false,
    gradient: "linear-gradient(135deg, #1a1a3a 0%, #00000a 100%)",
    accentColor: "#C9A84C",
  },
];

export default function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const filtered =
    activeCategory === "All"
      ? POSTS
      : POSTS.filter((p) => p.category === activeCategory);

  return (
    <section
      ref={ref}
      style={{
        background: "#fff8ef",
        padding: "60px 64px 100px",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Category Filters */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 56,
            flexWrap: "wrap",
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "9px 22px",
                border: "1px solid",
                borderColor:
                  activeCategory === cat
                    ? "#C9A84C"
                    : "rgba(201,168,76,0.25)",
                background:
                  activeCategory === cat ? "#C9A84C" : "transparent",
                color: activeCategory === cat ? "#0A0906" : "#5A5450",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 28,
          }}
        >
          {filtered.map((post, i) => (
            <article
              key={i}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: "#ffffff",
                border: "1px solid rgba(201,168,76,0.12)",
                overflow: "hidden",
                cursor: "pointer",
                opacity: active ? 1 : 0,
                transform: active
                  ? hoveredCard === i
                    ? "translateY(-6px)"
                    : "translateY(0)"
                  : "translateY(24px)",
                transition: `
                  opacity 0.5s ${0.1 + i * 0.07}s,
                  transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)
                `,
                boxShadow:
                  hoveredCard === i
                    ? "0 16px 48px rgba(0,0,0,0.1)"
                    : "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              {/* Card image area */}
              <div
                style={{
                  height: 180,
                  background: post.gradient,
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Abstract pattern */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
                      radial-gradient(circle at 30% 60%, ${post.accentColor}22 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, ${post.accentColor}15 0%, transparent 40%)
                    `,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    right: -30,
                    bottom: -30,
                    width: 140,
                    height: 140,
                    borderRadius: "50%",
                    border: `1px solid ${post.accentColor}30`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    right: 10,
                    bottom: 10,
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    border: `1px solid ${post.accentColor}25`,
                  }}
                />
                {/* Category badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    padding: "5px 12px",
                    background: post.accentColor,
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#0A0906",
                  }}
                >
                  {post.category}
                </div>
              </div>

              {/* Card content */}
              <div style={{ padding: "28px 28px 32px" }}>
                {/* Meta */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginBottom: 14,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      color: "#9A9088",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {post.date}
                  </span>
                  <div
                    style={{
                      width: 3,
                      height: 3,
                      borderRadius: "50%",
                      background: "#C9A84C",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      color: "#C9A84C",
                      fontWeight: 600,
                    }}
                  >
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: 1.35,
                    marginBottom: 12,
                    transition: "color 0.2s",
                    color: hoveredCard === i ? "#000613" : "#1A1A1A",
                  }}
                >
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p
                  style={{
                    fontSize: 13.5,
                    color: "#5A5450",
                    lineHeight: 1.78,
                    marginBottom: 24,
                  }}
                >
                  {post.excerpt}
                </p>

                {/* Read more */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#C9A84C",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  <span>Read Article</span>
                  <span
                    style={{
                      transform:
                        hoveredCard === i ? "translateX(4px)" : "translateX(0)",
                      transition: "transform 0.25s",
                    }}
                  >
                    →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 40px",
              color: "#9A9088",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 16 }}>📚</div>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20,
                color: "#1A1A1A",
                marginBottom: 8,
              }}
            >
              No articles in this category yet
            </p>
            <p style={{ fontSize: 14 }}>
              Check back soon for new insights and updates.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
