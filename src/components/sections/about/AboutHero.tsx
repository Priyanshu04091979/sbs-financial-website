"use client";

import React, { useEffect, useRef, useState } from "react";

const styles: Record<string, React.CSSProperties> = {
  section: {
    position: "relative",
    width: "100%",
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    background: "#000613",
  },
  bg: {
    position: "absolute",
    inset: 0,
    backgroundImage: "url(/images/hero/Hero-section.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center 30%",
    zIndex: 0,
    filter: "grayscale(40%)",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(0,6,19,0.88) 0%, rgba(0,6,19,0.70) 60%, rgba(0,6,19,0.82) 100%)",
    zIndex: 1,
  },
  goldGlow: {
    position: "absolute",
    top: "-20%",
    right: "-5%",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
    zIndex: 1,
    pointerEvents: "none",
  },
  content: {
    position: "relative",
    zIndex: 2,
    maxWidth: 1200,
    margin: "0 auto",
    padding: "160px 64px 100px",
    width: "100%",
  },
  eyebrow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 28,
  },
  eyebrowLine: {
    width: 40,
    height: 1,
    background: "#C9A84C",
  },
  eyebrowText: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: "#C9A84C",
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(42px, 6vw, 76px)",
    fontWeight: 700,
    color: "#fbf3e4",
    lineHeight: 1.06,
    margin: "0 0 24px",
    letterSpacing: "-0.02em",
  },
  headingItalic: {
    fontStyle: "italic",
    color: "#C9A84C",
  },
  tagline: {
    fontSize: 16,
    color: "rgba(255,255,255,0.65)",
    lineHeight: 1.75,
    maxWidth: 560,
    margin: "0 0 60px",
  },
  statsRow: {
    display: "flex",
    gap: 0,
    borderTop: "1px solid rgba(201,168,76,0.2)",
    paddingTop: 40,
    flexWrap: "wrap" as const,
  },
  statItem: {
    paddingRight: 48,
    marginRight: 48,
    borderRight: "1px solid rgba(201,168,76,0.15)",
  },
  statNum: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 38,
    fontWeight: 700,
    color: "#fbf3e4",
    lineHeight: 1,
    display: "block",
  },
  statGold: {
    color: "#C9A84C",
  },
  statLabel: {
    fontSize: 9,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.45)",
    display: "block",
    marginTop: 6,
  },
};

const stats = [
  { num: "15", suf: "+", label: "Years of Trust" },
  { num: "2000", suf: "+", label: "Happy Clients" },
  { num: "₹500", suf: "Cr+", label: "Assets Managed" },
  { num: "98", suf: "%", label: "Retention Rate" },
];

export default function AboutHero() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section ref={ref} style={styles.section}>
      <div style={styles.bg} />
      <div style={styles.overlay} />
      <div style={styles.goldGlow} />

      {/* Decorative rings */}
      {[500, 340, 180].map((size, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            right: -size * 0.25,
            top: "50%",
            transform: "translateY(-50%)",
            width: size,
            height: size,
            borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.08)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      ))}

      <div style={styles.content}>
        {/* Eyebrow */}
        <div
          style={{
            ...styles.eyebrow,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
          }}
        >
          <div style={styles.eyebrowLine} />
          <span style={styles.eyebrowText}>Our Story</span>
        </div>

        {/* Heading */}
        <h1
          style={{
            ...styles.heading,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s 0.25s, transform 0.8s 0.25s",
          }}
        >
          We Are{" "}
          <span style={styles.headingItalic}>SBS Financial</span>
          <br />
          Services
        </h1>

        {/* Tagline */}
        <p
          style={{
            ...styles.tagline,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s 0.45s, transform 0.7s 0.45s",
          }}
        >
          A trusted partner in your financial journey. Rooted in Ahmedabad,
          dedicated to empowering thousands of families across Gujarat with
          transparent, goal-driven financial solutions since 2019.
        </p>

        {/* Stats */}
        <div
          style={{
            ...styles.statsRow,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s 0.65s, transform 0.7s 0.65s",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                ...styles.statItem,
                borderRight:
                  i < stats.length - 1
                    ? "1px solid rgba(201,168,76,0.15)"
                    : "none",
              }}
            >
              <span style={styles.statNum}>
                {s.num}
                <span style={styles.statGold}>{s.suf}</span>
              </span>
              <span style={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
