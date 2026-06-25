"use client";

import React, { useState } from "react";

export default function AboutCTA() {
  const [hoverPrimary, setHoverPrimary] = useState(false);
  const [hoverSecondary, setHoverSecondary] = useState(false);

  return (
    <section
      style={{
        background: "#C9A84C",
        padding: "80px 64px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Deco lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />
      {[400, 280, 160].map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            right: -s * 0.3,
            top: "50%",
            transform: "translateY(-50%)",
            width: s,
            height: s,
            borderRadius: "50%",
            border: "1px solid rgba(0,0,0,0.06)",
            pointerEvents: "none",
          }}
        />
      ))}

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 48,
          position: "relative",
          zIndex: 1,
          flexWrap: "wrap",
        }}
      >
        {/* Text */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(10,9,6,0.55)",
              display: "block",
              marginBottom: 16,
            }}
          >
            Start Your Journey
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(26px, 3vw, 40px)",
              fontWeight: 700,
              color: "#0A0906",
              lineHeight: 1.18,
              margin: 0,
            }}
          >
            Ready to Build Your{" "}
            <span style={{ fontStyle: "italic" }}>Financial Future?</span>
          </h2>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a
            href="/contact"
            onMouseEnter={() => setHoverPrimary(true)}
            onMouseLeave={() => setHoverPrimary(false)}
            style={{
              display: "inline-block",
              padding: "14px 36px",
              background: hoverPrimary ? "#1A1A1A" : "#0A0906",
              color: "#C9A84C",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.25s, transform 0.15s",
              transform: hoverPrimary ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            Book a Free Consultation
          </a>
          <a
            href="/services"
            onMouseEnter={() => setHoverSecondary(true)}
            onMouseLeave={() => setHoverSecondary(false)}
            style={{
              display: "inline-block",
              padding: "13px 36px",
              background: "transparent",
              color: "#0A0906",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: "1px solid rgba(10,9,6,0.4)",
              transition: "border-color 0.25s, background 0.25s, transform 0.15s",
              borderColor: hoverSecondary
                ? "rgba(10,9,6,0.8)"
                : "rgba(10,9,6,0.4)",
              backgroundColor: hoverSecondary
                ? "rgba(10,9,6,0.08)"
                : "transparent",
              transform: hoverSecondary ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            Explore Our Services
          </a>
        </div>
      </div>
    </section>
  );
}
