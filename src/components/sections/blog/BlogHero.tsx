"use client";

import React, { useEffect, useState } from "react";

export default function BlogHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        background: "#000613",
        padding: "180px 64px 100px",
        overflow: "hidden",
      }}
    >
      {/* Gold glow */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "30%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Deco rings */}
      {[500, 340].map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            right: -s * 0.25,
            top: "50%",
            transform: "translateY(-50%)",
            width: s,
            height: s,
            borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.07)",
            pointerEvents: "none",
          }}
        />
      ))}

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
          }}
        >
          <div style={{ width: 36, height: 1, background: "#C9A84C" }} />
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C9A84C",
            }}
          >
            Insights &amp; Articles
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(42px, 6vw, 76px)",
            fontWeight: 700,
            color: "#fbf3e4",
            lineHeight: 1.06,
            margin: "0 0 24px",
            letterSpacing: "-0.02em",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s 0.25s, transform 0.8s 0.25s",
          }}
        >
          Financial{" "}
          <span style={{ fontStyle: "italic", color: "#C9A84C" }}>
            Knowledge
          </span>
          <br />
          That Empowers
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.58)",
            lineHeight: 1.75,
            maxWidth: 520,
            margin: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s 0.45s, transform 0.7s 0.45s",
          }}
        >
          Stay updated with the latest insights on mutual funds, investment
          strategies, tax planning, and market trends — curated by our team of
          SEBI-registered financial advisors.
        </p>
      </div>

      {/* Bottom gradient */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background:
            "linear-gradient(to bottom, transparent, #fff8ef)",
          zIndex: 2,
        }}
      />
    </section>
  );
}
