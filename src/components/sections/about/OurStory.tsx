"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "#fbf3e4",
    padding: "100px 64px",
    position: "relative",
    overflow: "hidden",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 80,
    alignItems: "center",
  },
  imageCol: {
    position: "relative",
  },
  imageFrame: {
    position: "relative",
    width: "100%",
    aspectRatio: "3/4",
    overflow: "hidden",
    background: "#D4CFC5",
  },
  goldCorner: {
    position: "absolute",
    background: "#C9A84C",
  },
  imageFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "35%",
    background:
      "linear-gradient(to top, rgba(251,243,228,0.97) 0%, transparent 100%)",
    zIndex: 3,
  },
  nameTag: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 4,
    padding: "20px 24px",
    textAlign: "center" as const,
  },
  nameTagName: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 21,
    fontWeight: 700,
    color: "#1A1A1A",
    marginBottom: 4,
    display: "block",
  },
  nameTagTitle: {
    fontSize: 9,
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "#C9A84C",
    display: "block",
  },
  badge: {
    position: "absolute",
    top: -12,
    right: -12,
    background: "#C9A84C",
    padding: "14px 18px",
    textAlign: "center" as const,
    minWidth: 80,
    zIndex: 5,
  },
  badgeNum: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 26,
    fontWeight: 700,
    color: "#0A0906",
    display: "block",
    lineHeight: 1,
  },
  badgeLabel: {
    fontSize: 8,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: "rgba(10,9,6,0.6)",
    display: "block",
    marginTop: 4,
  },
  sebiTag: {
    position: "absolute",
    bottom: 60,
    left: -20,
    background: "#1A1A1A",
    padding: "10px 16px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    zIndex: 5,
  },
  sebiDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#C9A84C",
    flexShrink: 0,
  },
  sebiText: {
    fontSize: 10,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "rgba(245,240,232,0.7)",
  },
  textCol: {
    padding: "0 8px",
  },
  eyebrow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  eyebrowLine: {
    width: 32,
    height: 1,
    background: "#C9A84C",
  },
  eyebrowText: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: "#C9A84C",
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(30px, 3.5vw, 44px)",
    fontWeight: 700,
    color: "#1A1A1A",
    lineHeight: 1.18,
    margin: "0 0 20px",
  },
  goldRule: {
    height: 2,
    background: "linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.15))",
    margin: "20px 0 28px",
    width: 80,
  },
  para: {
    fontSize: 15,
    color: "#5A5450",
    lineHeight: 1.85,
    marginBottom: 18,
  },
  timeline: {
    marginTop: 36,
    display: "flex",
    flexDirection: "column" as const,
    gap: 20,
  },
  timelineItem: {
    display: "flex",
    gap: 20,
    alignItems: "flex-start",
  },
  timelineYear: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 13,
    fontWeight: 700,
    color: "#C9A84C",
    minWidth: 44,
    paddingTop: 2,
  },
  timelineContent: {
    borderLeft: "1px solid rgba(201,168,76,0.25)",
    paddingLeft: 20,
  },
  timelineTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: "#1A1A1A",
    marginBottom: 4,
    display: "block",
    letterSpacing: "0.04em",
    textTransform: "uppercase" as const,
  },
  timelineDesc: {
    fontSize: 13,
    color: "#5A5450",
    lineHeight: 1.65,
  },
};

const milestones = [
  {
    year: "2019",
    title: "Founded",
    desc: "SBS Financial Services was established in Ahmedabad, Gujarat, with a vision to make quality financial planning accessible to all.",
  },
  {
    year: "2021",
    title: "SEBI Registration",
    desc: "Registered as an Investment Advisor with SEBI, cementing our commitment to regulatory compliance and client trust.",
  },
  {
    year: "2023",
    title: "₹500 Cr+ AUM",
    desc: "Surpassed ₹500 crore in assets under management, serving 1,500+ families across Gujarat.",
  },
  {
    year: "2025",
    title: "2000+ Clients",
    desc: "Reached 2,000+ happy clients, with a 98% retention rate and expanded service suite.",
  },
];

export default function OurStory() {
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
    <section ref={ref} style={styles.section}>
      {/* Background deco */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: -200,
          transform: "translateY(-50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.07)",
          pointerEvents: "none",
        }}
      />

      <div style={styles.container}>
        {/* Left: Image */}
        <div
          style={{
            ...styles.imageCol,
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
            transition: "opacity 0.9s 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          {/* Corner frame lines */}
          {[
            { top: -10, left: -10, width: "55%", height: 1.5, borderRadius: 0 },
            { top: -10, left: -10, width: 1.5, height: "55%", borderRadius: 0 },
            { bottom: -10, right: -10, width: "55%", height: 1.5, borderRadius: 0 },
            { bottom: -10, right: -10, width: 1.5, height: "55%", borderRadius: 0 },
          ].map((s, i) => (
            <div key={i} style={{ position: "absolute", background: "#C9A84C", zIndex: 0, ...s }} />
          ))}

          {/* Image */}
          <div style={styles.imageFrame}>
            <Image
              src="/images/founder.png"
              alt="Mr. Urval Shah – Founder of SBS Financial Services"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "center center" }}
              priority
            />
            <div style={styles.imageFade} />
            <div style={styles.nameTag}>
              <span style={styles.nameTagName}>Mr. Urval Shah</span>
              <span style={styles.nameTagTitle}>Founder &amp; Managing Director</span>
            </div>
          </div>

          {/* Badge */}
          <div style={styles.badge}>
            <span style={styles.badgeNum}>15+</span>
            <span style={styles.badgeLabel}>Years</span>
          </div>

          {/* SEBI Tag */}
          <div style={styles.sebiTag}>
            <div style={styles.sebiDot} />
            <span style={styles.sebiText}>SEBI Registered Advisor</span>
          </div>
        </div>

        {/* Right: Text */}
        <div
          style={{
            ...styles.textCol,
            opacity: active ? 1 : 0,
            transform: active ? "translateX(0)" : "translateX(32px)",
            transition: "opacity 0.8s 0.3s, transform 0.8s 0.3s",
          }}
        >
          <div style={styles.eyebrow}>
            <div style={styles.eyebrowLine} />
            <span style={styles.eyebrowText}>Our Story</span>
          </div>

          <h2 style={styles.heading}>
            Built on Trust,
            <br />
            <span style={{ fontStyle: "italic", color: "#C9A84C" }}>
              Driven by Purpose
            </span>
          </h2>

          <div style={styles.goldRule} />

          <p style={styles.para}>
            Established in 2019, SBS Financial Services has emerged as a
            trusted financial services firm in Ahmedabad, Gujarat. We are
            committed to helping individuals and families make smarter financial
            decisions with confidence, through a client-centric approach and
            future-focused strategies.
          </p>
          <p style={styles.para}>
            Our mission is to deliver transparent, personalized, and
            goal-oriented financial guidance that empowers clients at every
            stage of their financial journey — from investment planning and
            wealth management to insurance and tax-saving solutions.
          </p>

          {/* Timeline */}
          <div style={styles.timeline}>
            {milestones.map((m, i) => (
              <div
                key={i}
                style={{
                  ...styles.timelineItem,
                  opacity: active ? 1 : 0,
                  transform: active ? "translateX(0)" : "translateX(16px)",
                  transition: `opacity 0.5s ${0.55 + i * 0.1}s, transform 0.5s ${0.55 + i * 0.1}s`,
                }}
              >
                <span style={styles.timelineYear}>{m.year}</span>
                <div style={styles.timelineContent}>
                  <span style={styles.timelineTitle}>{m.title}</span>
                  <span style={styles.timelineDesc}>{m.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
