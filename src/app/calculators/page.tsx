"use client";

import Link from "next/link";
import {
  TrendingUp,
  Briefcase,
  Target,
  Calculator,
  Landmark,
  Clock,
  ArrowRight,
} from "lucide-react";
import { CALCULATORS } from "@/lib/calculator-config";
import { useEffect } from "react";

const CARD_CSS = `
  .sbs-calc-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 32px 28px;
    border: 1px solid #f0ece4;
    box-shadow: 0 2px 10px rgba(0,6,19,0.04);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: box-shadow 0.25s, transform 0.25s;
    text-decoration: none;
  }
  .sbs-calc-card:hover {
    box-shadow: 0 8px 28px rgba(0,6,19,0.10);
    transform: translateY(-4px);
  }
  .sbs-calc-cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #000613;
    text-decoration: none;
    transition: color 0.2s;
    margin-top: auto;
  }
  .sbs-calc-card:hover .sbs-calc-cta {
    color: #e9c349;
  }
`;

function CardIcon({ name }: { name: string }) {
  const s = { width: 22, height: 22, color: "#e9c349" };
  const icons: Record<string, React.ReactNode> = {
    TrendingUp: <TrendingUp style={s} />,
    Briefcase: <Briefcase style={s} />,
    Target: <Target style={s} />,
    Calculator: <Calculator style={s} />,
    Landmark: <Landmark style={s} />,
    Clock: <Clock style={s} />,
  };
  return <>{icons[name] ?? <TrendingUp style={s} />}</>;
}

export default function CalculatorsPage() {
  useEffect(() => {
    if (document.getElementById("sbs-calc-card-style")) return;
    const el = document.createElement("style");
    el.id = "sbs-calc-card-style";
    el.textContent = CARD_CSS;
    document.head.appendChild(el);
  }, []);

  const calcs = Object.values(CALCULATORS);

  return (
    <main style={{ background: "#fff8ef", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "88px 32px 100px" }}>

        {/* Page header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 5vw, 52px)",
            fontWeight: 700,
            color: "#000613",
            marginBottom: 14,
            lineHeight: 1.1,
          }}>
            Financial Calculators
          </h1>
          <p style={{
            color: "#74777f",
            fontSize: 15,
            lineHeight: 1.75,
            maxWidth: 520,
            margin: "0 auto",
          }}>
            Plan your financial goals, estimate your returns, and make informed investment
            decisions with our comprehensive suite of calculators.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}>
          {calcs.map((calc) => (
            <Link
              key={calc.id}
              href={`/calculators/${calc.id}`}
              className="sbs-calc-card"
            >
              {/* Icon box */}
              <div style={{
                width: 48, height: 48,
                borderRadius: 12,
                background: "rgba(233,195,73,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
              }}>
                <CardIcon name={calc.iconName} />
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 17,
                fontWeight: 700,
                color: "#000613",
                marginBottom: 8,
                lineHeight: 1.3,
              }}>
                {calc.name}
              </h2>

              {/* Description */}
              <p style={{
                color: "#74777f",
                fontSize: 13,
                lineHeight: 1.75,
                marginBottom: 24,
                flexGrow: 1,
              }}>
                {calc.gridDescription}
              </p>

              {/* CTA */}
              <span className="sbs-calc-cta">
                Calculate Now
                <ArrowRight style={{ width: 14, height: 14 }} />
              </span>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
