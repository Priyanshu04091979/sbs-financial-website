"use client";

import React, { useEffect, useRef, useState } from "react";

const whyItems = [
  {
    num: "01",
    title: "Client-First Philosophy",
    body: "Every recommendation we make is driven by your goals, risk tolerance, and life stage — never by product commissions or hidden incentives.",
  },
  {
    num: "02",
    title: "SEBI Registered & Compliant",
    body: "As a SEBI-registered investment advisor, we operate with full regulatory oversight, ensuring your investments are always protected and compliant.",
  },
  {
    num: "03",
    title: "Holistic Financial Planning",
    body: "From SIP investments and insurance to tax planning and retirement — we cover every dimension of your financial life under one trusted roof.",
  },
  {
    num: "04",
    title: "Transparent Fee Structure",
    body: "No hidden charges. No surprise commissions. We maintain complete fee transparency so you always know what you're paying for and why.",
  },
  {
    num: "05",
    title: "Research-Backed Advice",
    body: "Our recommendations are rooted in rigorous market research, fundamental analysis, and data-driven insights — not speculation or trends.",
  },
  {
    num: "06",
    title: "Long-Term Partnerships",
    body: "We don't just give advice — we build lasting relationships. Our 98% client retention rate reflects the trust clients place in us year after year.",
  },
];

export default function WhyChooseAbout() {
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
        background: "#fbf3e4",
        padding: "100px 64px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Deco ring */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: -200,
          transform: "translateY(-50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.1)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "end",
            marginBottom: 72,
          }}
        >
          <div
            style={{
              opacity: active ? 1 : 0,
              transform: active ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s, transform 0.7s",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <div
                style={{ width: 32, height: 1, background: "#C9A84C" }}
              />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                }}
              >
                Why SBS Financial
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(30px, 3.5vw, 46px)",
                fontWeight: 700,
                color: "#1A1A1A",
                lineHeight: 1.14,
                margin: 0,
              }}
            >
              What Sets Us{" "}
              <span style={{ fontStyle: "italic", color: "#C9A84C" }}>
                Apart
              </span>
            </h2>
          </div>

          <p
            style={{
              fontSize: 15,
              color: "#5A5450",
              lineHeight: 1.8,
              margin: 0,
              paddingBottom: 6,
              opacity: active ? 1 : 0,
              transform: active ? "translateX(0)" : "translateX(24px)",
              transition: "opacity 0.7s 0.15s, transform 0.7s 0.15s",
            }}
          >
            With a dedicated team of financial professionals and a deep
            commitment to client success, SBS Financial Services provides the
            expertise, trust, and personal attention that modern investors
            deserve.
          </p>
        </div>

        {/* Why Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            background: "rgba(201,168,76,0.15)",
          }}
        >
          {whyItems.map((item, i) => (
            <div
              key={i}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "#1A1A1A";
                const num = el.querySelector(".why-num") as HTMLElement;
                const title = el.querySelector(".why-title") as HTMLElement;
                const body = el.querySelector(".why-body") as HTMLElement;
                const bar = el.querySelector(".why-bar") as HTMLElement;
                if (num) num.style.color = "rgba(201,168,76,0.2)";
                if (title) title.style.color = "#fbf3e4";
                if (body) body.style.color = "rgba(255,255,255,0.55)";
                if (bar) bar.style.transform = "scaleX(1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "#fbf3e4";
                const num = el.querySelector(".why-num") as HTMLElement;
                const title = el.querySelector(".why-title") as HTMLElement;
                const body = el.querySelector(".why-body") as HTMLElement;
                const bar = el.querySelector(".why-bar") as HTMLElement;
                if (num) num.style.color = "rgba(201,168,76,0.15)";
                if (title) title.style.color = "#1A1A1A";
                if (body) body.style.color = "#5A5450";
                if (bar) bar.style.transform = "scaleX(0)";
              }}
              style={{
                background: "#fbf3e4",
                padding: "40px 36px",
                position: "relative",
                overflow: "hidden",
                opacity: active ? 1 : 0,
                transform: active ? "translateY(0)" : "translateY(20px)",
                transition: `background 0.3s, opacity 0.5s ${0.2 + i * 0.08}s, transform 0.5s ${0.2 + i * 0.08}s`,
                cursor: "default",
              }}
            >
              {/* Gold top bar */}
              <div
                className="why-bar"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: "#C9A84C",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                }}
              />

              <span
                className="why-num"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 52,
                  fontWeight: 700,
                  color: "rgba(201,168,76,0.15)",
                  lineHeight: 1,
                  display: "block",
                  marginBottom: 16,
                  transition: "color 0.3s",
                }}
              >
                {item.num}
              </span>
              <h3
                className="why-title"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#1A1A1A",
                  marginBottom: 14,
                  lineHeight: 1.3,
                  transition: "color 0.3s",
                }}
              >
                {item.title}
              </h3>
              <p
                className="why-body"
                style={{
                  fontSize: 14,
                  color: "#5A5450",
                  lineHeight: 1.8,
                  margin: 0,
                  transition: "color 0.3s",
                }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
