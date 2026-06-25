"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, ChevronLeft, ChevronRight,
  TrendingUp, Briefcase, Target, Calculator, Landmark, Clock,
} from "lucide-react";
import { CALCULATORS, formatIndianCurrency } from "@/lib/calculator-config";

interface Props { initialSlug: string; }

/* ─────── Global CSS injected once ─────── */
const GLOBAL_CSS = `
  /* ── Range slider ── */
  .sbs-range {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 5px;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    display: block;
    transition: opacity 0.2s;
  }
  .sbs-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 22px; height: 22px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #f5d76e, #c9a84c);
    border: 3px solid #ffffff;
    box-shadow: 0 2px 10px rgba(201,168,76,0.5);
    cursor: pointer;
    transition: transform 0.18s cubic-bezier(.34,1.56,.64,1), box-shadow 0.18s ease;
  }
  .sbs-range::-webkit-slider-thumb:hover {
    transform: scale(1.35);
    box-shadow: 0 4px 18px rgba(233,195,73,0.65);
  }
  .sbs-range::-moz-range-thumb {
    width: 22px; height: 22px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #f5d76e, #c9a84c);
    border: 3px solid #ffffff;
    box-shadow: 0 2px 10px rgba(201,168,76,0.5);
    cursor: pointer;
    transition: transform 0.18s cubic-bezier(.34,1.56,.64,1);
  }
  .sbs-range::-moz-range-thumb:hover { transform: scale(1.35); }

  /* ── Tab scrollbar hide ── */
  .sbs-tabs-scroll { scrollbar-width: none; -ms-overflow-style: none; }
  .sbs-tabs-scroll::-webkit-scrollbar { display: none; }

  /* ── Entrance animations ── */
  @keyframes sbs-slide-left {
    from { opacity: 0; transform: translateX(-28px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes sbs-slide-right {
    from { opacity: 0; transform: translateX(28px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes sbs-fade-up {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes sbs-pulse-gold {
    0%   { box-shadow: 0 0 0 0 rgba(233,195,73,0.55); }
    70%  { box-shadow: 0 0 0 6px rgba(233,195,73,0); }
    100% { box-shadow: 0 0 0 0 rgba(233,195,73,0); }
  }

  .sbs-slide-left  { animation: sbs-slide-left  0.5s cubic-bezier(.22,1,.36,1) both; }
  .sbs-slide-right { animation: sbs-slide-right 0.5s cubic-bezier(.22,1,.36,1) 0.08s both; }
  .sbs-fade-up     { animation: sbs-fade-up 0.4s ease both; }
  .sbs-pulse       { animation: sbs-pulse-gold 0.5s ease; }

  /* ── Donut hover ── */
  .sbs-donut-wrap {
    transition: transform 0.35s cubic-bezier(.34,1.56,.64,1),
                filter 0.35s ease;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  .sbs-donut-wrap:hover {
    transform: scale(1.11);
    filter: drop-shadow(0 8px 24px rgba(201,168,76,0.35))
            drop-shadow(0 4px 12px rgba(0,6,19,0.18));
  }

  /* ── Input box focus ── */
  .sbs-inp-box {
    display: flex; align-items: center;
    padding: 7px 12px;
    border: 1.5px solid #ddd8cf;
    border-radius: 9px;
    background: #fff;
    gap: 3px;
    min-width: 115px;
    transition: border-color 0.22s, box-shadow 0.22s;
  }
  .sbs-inp-box:focus-within {
    border-color: #e9c349;
    box-shadow: 0 0 0 3px rgba(233,195,73,0.20);
  }

  /* ── Result row ── */
  .sbs-result-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 11px;
    animation: sbs-fade-up 0.38s ease both;
  }

  /* ── Responsive ── */
  .sbs-calc-workspace {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }
  @media (max-width: 820px) {
    .sbs-calc-workspace { grid-template-columns: 1fr; }
    .sbs-chart-col { order: -1; }
  }
  @media (max-width: 520px) {
    .sbs-outer-pad { padding: 16px 14px !important; }
    .sbs-workspace-pad { padding: 20px 14px !important; }
  }
`;

function injectStyle(id: string, css: string) {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

/* ─────── Animated counter hook ─────── */
function useAnimatedValue(target: number, duration = 520) {
  const [display, setDisplay] = useState(target);
  const raf = useRef(0);
  const from = useRef(target);
  const start = useRef(0);

  useEffect(() => {
    cancelAnimationFrame(raf.current);
    const f = from.current;
    const diff = target - f;
    start.current = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start.current) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(f + diff * ease);
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target]);

  return display;
}

function AnimatedCurrency({ value }: { value: number }) {
  return <>{formatIndianCurrency(useAnimatedValue(value))}</>;
}

/* ─────── Donut Chart ─────── */
function DonutChart({ segments }: { segments: { value: number; color: string; label?: string; name?: string }[] }) {
  const R = 48, STROKE = 17, SIZE = 190, CX = SIZE / 2;
  const CIRC = 2 * Math.PI * R;

  const total = segments.reduce((s, d) => s + d.value, 0);
  const pcts = segments.map(s => (total > 0 ? s.value / total : 0));

  const [anim, setAnim] = useState<number[]>(pcts.map(() => 0));
  const raf = useRef(0);
  const prevPcts = useRef<number[]>(pcts.map(() => 0));
  const startT = useRef(0);

  useEffect(() => {
    cancelAnimationFrame(raf.current);
    const from = [...prevPcts.current];
    const to = [...pcts];
    startT.current = performance.now();
    const D = 650;
    const tick = (now: number) => {
      const t = Math.min((now - startT.current) / D, 1);
      const e = 1 - Math.pow(1 - t, 3);
      setAnim(from.map((f, i) => f + (to[i] - f) * e));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else prevPcts.current = to;
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [segments.map(s => s.value).join(",")]);

  const isEmpty = total === 0;
  const returnPct = total > 0 ? Math.round(((segments[1]?.value ?? 0) / total) * 100) : 0;

  return (
    <div className="sbs-donut-wrap">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="sbsGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde07a" />
            <stop offset="100%" stopColor="#c9a84c" />
          </linearGradient>
          <linearGradient id="sbsNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a2060" />
            <stop offset="100%" stopColor="#000613" />
          </linearGradient>
          <filter id="sbsGlow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Track */}
        <circle cx={CX} cy={CX} r={R} fill="none" stroke="#e8dfd0" strokeWidth={STROKE}
          transform={`rotate(-90 ${CX} ${CX})`} />

        {/* Segments */}
        {!isEmpty && (() => {
          let accum = 0;
          return anim.map((pct, idx) => {
            const segLen = pct * CIRC;
            const offset = CIRC * (1 - accum);
            accum += pct;
            return (
              <circle
                key={idx}
                cx={CX} cy={CX} r={R}
                fill="none"
                stroke={segments[idx].color === "#e9c349" ? "url(#sbsGoldGrad)" : "url(#sbsNavyGrad)"}
                strokeWidth={STROKE}
                strokeDasharray={`${segLen} ${CIRC - segLen}`}
                strokeDashoffset={offset}
                strokeLinecap="butt"
                transform={`rotate(-90 ${CX} ${CX})`}
                style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.15))" }}
              />
            );
          });
        })()}

        {/* Inner fill */}
        <circle cx={CX} cy={CX} r={R - STROKE / 2 - 3} fill="#fbf3e4" />

        {/* Center label */}
        {!isEmpty && (
          <>
            <text x={CX} y={CX - 8} textAnchor="middle" dominantBaseline="middle"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 800, fill: "#000613" }}>
              {returnPct}%
            </text>
            <text x={CX} y={CX + 12} textAnchor="middle" dominantBaseline="middle"
              style={{ fontSize: 8.5, fill: "#74777f", fontFamily: "sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              RETURNS
            </text>
          </>
        )}
      </svg>
    </div>
  );
}

/* ─────── Input field with value-change pulse ─────── */
function InputField({
  inp, value, onSlider, onText, onBlur, isActive, onFocus,
}: {
  inp: { key: string; label: string; min: number; max: number; step: number; type: string };
  value: number;
  onSlider: (v: number) => void;
  onText: (v: number) => void;
  onBlur: (v: number) => void;
  isActive: boolean;
  onFocus: () => void;
}) {
  const isCurrency = inp.type === "currency";
  const isYears = inp.type === "years";
  const isPct = inp.type === "percentage";
  const pct = ((value - inp.min) / (inp.max - inp.min)) * 100;
  const [pulse, setPulse] = useState(false);
  const prevVal = useRef(value);

  useEffect(() => {
    if (prevVal.current !== value) {
      setPulse(false);
      requestAnimationFrame(() => {
        setPulse(true);
        setTimeout(() => setPulse(false), 520);
      });
      prevVal.current = value;
    }
  }, [value]);

  return (
    <div style={{ marginBottom: 30 }}>
      {/* Label + value box */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <label style={{ fontSize: 14, fontWeight: 500, color: "#43474e" }}>{inp.label}</label>

        <div
          className={`sbs-inp-box${pulse ? " sbs-pulse" : ""}`}
        >
          {isCurrency && <span style={{ color: "#43474e", fontSize: 14, fontWeight: 500 }}>₹</span>}
          <input
            type="text"
            value={isActive ? String(value) : value.toLocaleString("en-IN")}
            onFocus={onFocus}
            onBlur={() => {
              let c = Math.max(inp.min, Math.min(inp.max, value));
              c = Math.round(c / inp.step) * inp.step;
              onBlur(c);
            }}
            onChange={e => {
              const raw = e.target.value.replace(/[^0-9.]/g, "");
              const parsed = parseFloat(raw);
              onText(isNaN(parsed) ? 0 : parsed);
            }}
            style={{
              width: "100%", textAlign: "right", outline: "none",
              background: "transparent", fontWeight: 700,
              color: "#000613", fontSize: 15, border: "none", minWidth: 0,
            }}
          />
          {isYears && <span style={{ color: "#74777f", fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" }}>Yr</span>}
          {isPct && <span style={{ color: "#74777f", fontSize: 12, fontWeight: 500 }}>%</span>}
        </div>
      </div>

      {/* Slider */}
      <input
        type="range"
        className="sbs-range"
        min={inp.min} max={inp.max} step={inp.step} value={value}
        onChange={e => onSlider(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right,
            #e9c349 0%, #e9c349 ${pct}%,
            #e2d8cc ${pct}%, #e2d8cc 100%)`,
        }}
      />

      {/* Range labels */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
        <span style={{ fontSize: 10.5, color: "#b0a898" }}>
          {isCurrency ? `₹${inp.min.toLocaleString("en-IN")}` : inp.min}
          {isYears ? " Yr" : isPct ? "%" : ""}
        </span>
        <span style={{ fontSize: 10.5, color: "#b0a898" }}>
          {isCurrency ? `₹${inp.max.toLocaleString("en-IN")}` : inp.max}
          {isYears ? " Yr" : isPct ? "%" : ""}
        </span>
      </div>
    </div>
  );
}

/* ─────── Main Component ─────── */
export default function CalculatorInterface({ initialSlug }: Props) {
  const router = useRouter();
  const currentSlug = CALCULATORS[initialSlug] ? initialSlug : "sip";
  const config = CALCULATORS[currentSlug];

  const tabRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { injectStyle("sbs-calc-g", GLOBAL_CSS); }, []);
  useEffect(() => { setMounted(false); setTimeout(() => setMounted(true), 20); }, [currentSlug]);

  useEffect(() => {
    const d: Record<string, number> = {};
    config.inputs.forEach(i => { d[i.key] = i.defaultValue; });
    setInputs(d);
  }, [currentSlug]);

  const onTabScroll = () => {
    const el = tabRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollPct(max > 0 ? el.scrollLeft / max : 0);
  };

  const { results, primaryResult, chartData } = config.calculate(inputs);

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "68px 24px 80px" }}>

      {/* Back */}
      <Link
        href="/calculators"
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          color: "#74777f", fontSize: 13, fontWeight: 500,
          textDecoration: "none", marginBottom: 22,
          transition: "color 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "#c9a84c")}
        onMouseLeave={e => (e.currentTarget.style.color = "#74777f")}
      >
        <ArrowLeft style={{ width: 14, height: 14 }} />
        Back to all calculators
      </Link>

      {/* Heading */}
      <div className="sbs-fade-up" style={{ marginBottom: 28 }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(26px, 4.5vw, 40px)",
          fontWeight: 700, color: "#000613", marginBottom: 7, lineHeight: 1.1,
        }}>
          {config.title}
        </h1>
        <p style={{ color: "#74777f", fontSize: 14, lineHeight: 1.7, maxWidth: 480 }}>
          {config.description}
        </p>
      </div>

      {/* Outer card */}
      <div
        className="sbs-outer-pad"
        style={{
          background: "#fff8ef",
          borderRadius: 22,
          border: "1px solid #ede5d8",
          padding: "24px 20px",
          boxShadow: "0 6px 40px rgba(0,6,19,0.07)",
        }}
      >
        {/* ── Tabs ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          {/* Scroll left */}
          <button
            onClick={() => tabRef.current?.scrollBy({ left: -220, behavior: "smooth" })}
            style={{
              width: 28, height: 28, borderRadius: "50%", border: "1px solid #d4cfc5",
              background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0, transition: "all 0.2s",
            }}
            onMouseEnter={e => { const b = e.currentTarget; b.style.background = "#e9c349"; b.style.borderColor = "#e9c349"; }}
            onMouseLeave={e => { const b = e.currentTarget; b.style.background = "#fff"; b.style.borderColor = "#d4cfc5"; }}
          >
            <ChevronLeft style={{ width: 13, height: 13, color: "#000613" }} />
          </button>

          <div
            ref={tabRef}
            onScroll={onTabScroll}
            className="sbs-tabs-scroll"
            style={{ display: "flex", gap: 8, overflowX: "auto", flex: 1, alignItems: "center" }}
          >
            {Object.values(CALCULATORS).map(calc => {
              const active = calc.id === currentSlug;
              return (
                <button
                  key={calc.id}
                  onClick={() => router.push(`/calculators/${calc.id}`)}
                  style={{
                    padding: "8px 17px", borderRadius: 20, fontSize: 12.5,
                    fontWeight: active ? 600 : 400, whiteSpace: "nowrap",
                    border: active ? "none" : "1px solid #d4cfc5",
                    background: active ? "#000613" : "#fff",
                    color: active ? "#fff8ef" : "#43474e",
                    cursor: "pointer", transition: "all 0.22s", flexShrink: 0,
                  }}
                >
                  {calc.tabName}
                </button>
              );
            })}
          </div>

          {/* Scroll right */}
          <button
            onClick={() => tabRef.current?.scrollBy({ left: 220, behavior: "smooth" })}
            style={{
              width: 28, height: 28, borderRadius: "50%", border: "1px solid #d4cfc5",
              background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0, transition: "all 0.2s",
            }}
            onMouseEnter={e => { const b = e.currentTarget; b.style.background = "#e9c349"; b.style.borderColor = "#e9c349"; }}
            onMouseLeave={e => { const b = e.currentTarget; b.style.background = "#fff"; b.style.borderColor = "#d4cfc5"; }}
          >
            <ChevronRight style={{ width: 13, height: 13, color: "#000613" }} />
          </button>
        </div>

        {/* Scroll progress bar */}
        <div style={{ padding: "4px 36px 16px", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 360, height: 3, background: "#e2d8cc", borderRadius: 3, position: "relative" }}>
            <div style={{
              position: "absolute", height: "100%", borderRadius: 3,
              background: "linear-gradient(90deg, #f5d76e, #c9a84c)",
              width: "25%", left: `${scrollPct * 75}%`, transition: "left 0.15s",
            }} />
          </div>
        </div>

        {/* ── Workspace ── */}
        <div
          className={`sbs-calc-workspace sbs-workspace-pad`}
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "28px 24px",
            boxShadow: "0 2px 14px rgba(0,6,19,0.05)",
            border: "1px solid #f0ece4",
          }}
        >
          {/* Left: Sliders */}
          <div
            className={mounted ? "sbs-slide-left" : ""}
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
          >
            {config.inputs.map(inp => (
              <InputField
                key={inp.key}
                inp={inp}
                value={inputs[inp.key] ?? inp.defaultValue}
                isActive={activeInput === inp.key}
                onFocus={() => setActiveInput(inp.key)}
                onSlider={v => setInputs(p => ({ ...p, [inp.key]: v }))}
                onText={v => setInputs(p => ({ ...p, [inp.key]: v }))}
                onBlur={v => { setActiveInput(null); setInputs(p => ({ ...p, [inp.key]: v })); }}
              />
            ))}
          </div>

          {/* Right: Chart + Results */}
          <div
            className={`sbs-chart-col${mounted ? " sbs-slide-right" : ""}`}
            style={{
              background: "linear-gradient(150deg, #fcf4e6 0%, #f6ebd8 100%)",
              borderRadius: 16,
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #ede5d8",
              boxShadow: "inset 0 2px 10px rgba(0,6,19,0.04)",
            }}
          >
            {/* Donut with hover enlarge */}
            <div style={{ marginBottom: 18 }}>
              <DonutChart segments={chartData} />
            </div>

            {/* Legend legend dots */}
            <div style={{ width: "100%" }}>
              {results.map((res, idx) => (
                <div
                  key={idx}
                  className="sbs-result-row"
                  style={{ animationDelay: `${idx * 65}ms` }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: "#5a5450" }}>
                    <span style={{
                      width: 11, height: 11, borderRadius: "50%", flexShrink: 0,
                      background: res.color === "#e9c349"
                        ? "linear-gradient(135deg,#fde07a,#c9a84c)"
                        : "linear-gradient(135deg,#0a2060,#000613)",
                      boxShadow: res.color === "#e9c349"
                        ? "0 1px 5px rgba(233,195,73,0.55)"
                        : "0 1px 5px rgba(0,6,19,0.35)",
                    }} />
                    {res.label}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#000613" }}>
                    <AnimatedCurrency value={res.value} />
                  </span>
                </div>
              ))}

              <div style={{ borderTop: "1px solid #ddd3c4", margin: "13px 0" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 600, fontSize: 14, color: "#1e1b13" }}>
                  {primaryResult.label}
                </span>
                <span style={{
                  fontWeight: 800, fontSize: 18, color: "#000613",
                  fontFamily: "'Playfair Display', serif",
                }}>
                  <AnimatedCurrency value={primaryResult.value} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
