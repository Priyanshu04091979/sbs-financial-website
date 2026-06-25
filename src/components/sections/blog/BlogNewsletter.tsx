"use client";

import React, { useState } from "react";

export default function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hover, setHover] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      style={{
        background: "#000613",
        padding: "80px 64px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Deco */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div style={{ width: 28, height: 1, background: "#C9A84C" }} />
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C9A84C",
            }}
          >
            Stay Informed
          </span>
          <div style={{ width: 28, height: 1, background: "#C9A84C" }} />
        </div>

        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(26px, 3.5vw, 42px)",
            fontWeight: 700,
            color: "#fbf3e4",
            lineHeight: 1.18,
            marginBottom: 16,
          }}
        >
          Get Financial Insights{" "}
          <span style={{ fontStyle: "italic", color: "#C9A84C" }}>
            Delivered to You
          </span>
        </h2>

        <p
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.75,
            marginBottom: 40,
          }}
        >
          Subscribe to receive our weekly newsletter packed with market
          updates, investment tips, and tax-saving strategies from our team of
          SEBI-registered advisors.
        </p>

        {submitted ? (
          <div
            style={{
              background: "rgba(201,168,76,0.12)",
              border: "1px solid rgba(201,168,76,0.3)",
              padding: "24px 40px",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20,
                color: "#C9A84C",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              You&apos;re subscribed!
            </p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
              Thank you for subscribing. Watch your inbox for our next
              financial insights newsletter.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: 0 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              style={{
                flex: 1,
                padding: "16px 24px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(201,168,76,0.25)",
                borderRight: "none",
                color: "#fbf3e4",
                fontSize: 14,
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <button
              type="submit"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{
                padding: "16px 32px",
                background: hover ? "#E8C96A" : "#C9A84C",
                border: "none",
                color: "#0A0906",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.2s",
                whiteSpace: "nowrap",
                fontFamily: "inherit",
              }}
            >
              Subscribe Now
            </button>
          </form>
        )}

        <p
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.3)",
            marginTop: 16,
            letterSpacing: "0.04em",
          }}
        >
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
}
