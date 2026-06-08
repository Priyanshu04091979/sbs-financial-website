"use client";

import React from "react";


const HERO_IMAGE = "/images/hero/Hero-section.jpg";

const styles: Record<string, React.CSSProperties> = {
  hero: {
    position: "relative",
    width: "100%",
    height: "100vh",
    minHeight: "600px",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },
  heroBg: {
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${HERO_IMAGE})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 0,
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.60)",
    zIndex: 1,
  },
  heroContent: {
    position: "relative",
    zIndex: 10,
    padding: "0 80px",
    maxWidth: "780px",
    paddingTop: "64px",
    fontFamily: "'Montserrat', sans-serif",
  },
  eyebrow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "28px",
  },
  eyebrowLine: {
    width: "32px",
    height: "1px",
    backgroundColor: "#C9A84C",
    flexShrink: 0,
  },
  eyebrowText: {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "#C9A84C",
  },
  headline: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(42px, 5vw, 68px)" as unknown as number,
    lineHeight: 1.08,
    color: "#fbf3e4",
    fontWeight: 700,
    margin: 0,
    letterSpacing: "-0.01em",
  },
  headlineItalic: {
    fontStyle: "italic",
    fontWeight: 400,
    color: "rgba(255,255,255,0.92)",
    display: "block",
  },
  taglineWrap: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    margin: "28px 0 48px",
  },
  taglineBar: {
    width: "3px",
    minHeight: "52px",
    backgroundColor: "#C9A84C",
    flexShrink: 0,
    marginTop: "2px",
  },
  taglineText: {
    fontSize: "15px",
    fontWeight: 400,
    color: "rgba(255,255,255,0.70)",
    lineHeight: 1.7,
    maxWidth: "440px",
    margin: 0,
  },
  buttons: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap" as const,
  },
  btnPrimary: {
    display: "inline-block",
    padding: "14px 32px",
    backgroundColor: "#C9A84C",
    color: "#111",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    textDecoration: "none",
    cursor: "pointer",
    border: "none",
    fontFamily: "'Montserrat', sans-serif",
    transition: "background 0.2s, transform 0.15s",
  },
  btnSecondary: {
  display: "inline-block",
  padding: "13px 32px",
  backgroundColor: "transparent",
  color: "#fff",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  textDecoration: "none",
  cursor: "pointer",

  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "rgba(255,255,255,0.4)",

  fontFamily: "'Montserrat', sans-serif",
  transition: "border-color 0.2s, background 0.2s",
  },
};

const HeroSection: React.FC = () => {
  const [primaryHover, setPrimaryHover] = React.useState(false);
  const [secondaryHover, setSecondaryHover] = React.useState(false);

  return (
    <section style={styles.hero}>
      {/* Background image */}
      <div style={styles.heroBg} />

      {/* Dark overlay */}
      <div style={styles.heroOverlay} />

      {/* Content */}
      <div style={styles.heroContent}>

        {/* Headline */}
        <h1 style={styles.headline}>
          Plan, Invest, Grow —
          <span style={styles.headlineItalic}>SBS Financial</span>
        </h1>

        {/* Tagline */}
        <div style={styles.taglineWrap}>
          <div style={styles.taglineBar} />
          <p style={styles.taglineText}>
            Precision-engineered wealth management for the modern global
            investor, where heritage meets innovation.
          </p>
        </div>

        {/* Buttons */}
        <div style={styles.buttons}>
          <a
            href="#"
            style={{
              ...styles.btnPrimary,
              ...(primaryHover
                ? { backgroundColor: "#E8C96A", transform: "translateY(-1px)" }
                : {}),
            }}
            onMouseEnter={() => setPrimaryHover(true)}
            onMouseLeave={() => setPrimaryHover(false)}
          >
            Get Started
          </a>
          <a
            href="#"
            style={{
              ...styles.btnSecondary,
              ...(secondaryHover
                ? {
                    borderColor: "rgba(255,255,255,0.8)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }
                : {}),
            }}
            onMouseEnter={() => setSecondaryHover(true)}
            onMouseLeave={() => setSecondaryHover(false)}
          >
            Our Philosophy
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;