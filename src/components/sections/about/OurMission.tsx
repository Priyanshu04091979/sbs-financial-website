"use client";

import React, { useEffect, useRef, useState } from "react";

const pillars = [
  {
    icon: "🎯",
    label: "Our Mission",
    title: "Empower Every Financial Decision",
    body: "To deliver transparent, personalized, and goal-oriented financial guidance that empowers clients at every stage of their financial journey — simplifying complexity, maximizing returns, and securing futures.",
    color: "#C9A84C",
  },
  {
    icon: "🔭",
    label: "Our Vision",
    title: "India's Most Trusted Financial Partner",
    body: "To become the most trusted and accessible financial advisory firm in India, building lasting client relationships through integrity, innovation, and consistent financial growth.",
    color: "#1A1A1A",
    light: true,
  },
  {
    icon: "⚖️",
    label: "Our Values",
    title: "Integrity · Transparency · Excellence",
    body: "We hold ourselves to the highest standards — always putting clients first, communicating with complete honesty, and delivering measurable results through rigorous research and disciplined planning.",
    color: "#C9A84C",
  },
];

const expertise = [
  { label: "Mutual Funds", pct: 95 },
  { label: "Wealth Management", pct: 90 },
  { label: "Insurance Planning", pct: 88 },
  { label: "Tax Advisory", pct: 85 },
  { label: "Retirement Planning", pct: 92 },
];

export default function OurMission() {
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "#000613",
        padding: "100px 64px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Deco */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          left: "-10%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {[500, 360, 220].map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            right: -s * 0.25,
            bottom: -s * 0.25,
            width: s,
            height: s,
            borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.06)",
            pointerEvents: "none",
          }}
        />
      ))}

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 72,
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <div style={{ width: 32, height: 1, background: "#C9A84C" }} />
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C9A84C",
              }}
            >
              Mission · Vision · Values
            </span>
            <div style={{ width: 32, height: 1, background: "#C9A84C" }} />
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 700,
              color: "#fbf3e4",
              lineHeight: 1.12,
              margin: 0,
            }}
          >
            The Principles That{" "}
            <span style={{ fontStyle: "italic", color: "#C9A84C" }}>
              Guide Us
            </span>
          </h2>
        </div>

        {/* Pillar Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            marginBottom: 80,
          }}
        >
          {pillars.map((p, i) => (
            <div
              key={i}
              style={{
                background: p.light ? "#C9A84C" : "rgba(255,255,255,0.04)",
                border: p.light
                  ? "none"
                  : "1px solid rgba(201,168,76,0.15)",
                padding: "40px 36px",
                position: "relative",
                overflow: "hidden",
                opacity: active ? 1 : 0,
                transform: active ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.6s ${0.2 + i * 0.15}s, transform 0.6s ${0.2 + i * 0.15}s`,
              }}
            >
              {/* Gold corner accent */}
              {!p.light && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 3,
                    height: 60,
                    background: "#C9A84C",
                  }}
                />
              )}

              <div style={{ fontSize: 36, marginBottom: 20 }}>{p.icon}</div>

              <span
                style={{
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: p.light ? "rgba(10,9,6,0.55)" : "#C9A84C",
                  display: "block",
                  marginBottom: 12,
                  fontWeight: 700,
                }}
              >
                {p.label}
              </span>

              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: p.light ? "#0A0906" : "#fbf3e4",
                  lineHeight: 1.3,
                  marginBottom: 16,
                }}
              >
                {p.title}
              </h3>

              <p
                style={{
                  fontSize: 14,
                  color: p.light ? "rgba(10,9,6,0.7)" : "rgba(255,255,255,0.55)",
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* Expertise Bar Chart */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(201,168,76,0.12)",
            padding: "48px 52px",
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s 0.7s, transform 0.7s 0.7s",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0 80px",
              alignItems: "center",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  display: "block",
                  marginBottom: 12,
                  fontWeight: 700,
                }}
              >
                Areas of Expertise
              </span>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#fbf3e4",
                  lineHeight: 1.2,
                  marginBottom: 16,
                }}
              >
                Comprehensive Financial
                <br />
                <span style={{ fontStyle: "italic", color: "#C9A84C" }}>
                  Service Excellence
                </span>
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                Every service we offer is backed by deep expertise, SEBI
                compliance, and a commitment to placing your goals at the
                center of every recommendation.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {expertise.map((e, i) => (
                <div key={i}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {e.label}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        color: "#C9A84C",
                        fontWeight: 600,
                      }}
                    >
                      {e.pct}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 3,
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        background:
                          "linear-gradient(90deg, #C9A84C, #fed65b)",
                        borderRadius: 2,
                        width: active ? `${e.pct}%` : "0%",
                        transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${0.8 + i * 0.1}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
