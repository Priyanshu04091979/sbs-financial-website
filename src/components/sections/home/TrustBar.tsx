"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const NODES = [
  { label: "AMFI Registered", title: "Trusted Advisory" },
  { label: "Client-Centric", title: "Long-Term Planning" },
  { label: "Personalized", title: "Wealth Strategies" },
  { label: "Financial Solutions", title: "Structured Guidance" },
];

export default function TrustBar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pausedRef = useRef<boolean[]>([false, false, false, false]);
  const anglesRef = useRef<number[]>([0,Math.PI * 0.65,Math.PI * 1.2,Math.PI * 1.8,]);
  const frameRef = useRef<number>(0);    

  const CX = 180, CY = 180 ;
  const radii = [142, 118, 155, 128];
  const speeds = [0.0045, 0.0052, 0.0042, 0.0058];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
      
    let t = 0;
    
    function getPos(i: number) {
  if (!pausedRef.current[i]) {
    anglesRef.current[i] += speeds[i];
  }

  const radius = radii[i];

  return {
    x:
      CX +
      radius * Math.cos(anglesRef.current[i]),

    y:
      CY +
      radius * Math.sin(anglesRef.current[i]) +
      Math.sin(t * 0.01 + i) * 6,
  };
}

    function draw() {
      ctx!.clearRect(0, 0, 360, 360);

      // Outer orbit ring
      ctx!.beginPath();
      radii.forEach((radius, i) => {
      ctx!.beginPath();
      ctx!.arc(CX, CY, radius, 0, Math.PI * 2);
      ctx!.strokeStyle =
      i % 2 === 0
      ? "rgba(184,144,26,0.14)"
      : "rgba(184,144,26,0.08)";
      ctx!.lineWidth = 1;

      ctx!.setLineDash([4, 10]);

      ctx!.stroke();

      ctx!.setLineDash([]);
});
      ctx!.strokeStyle = "rgba(184,144,26,0.2)";
      ctx!.lineWidth = 1;
      ctx!.setLineDash([4, 10]);
      ctx!.stroke();
      ctx!.setLineDash([]);

      // Inner ring
      ctx!.beginPath();
      ctx!.arc(CX, CY, 72, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(184,144,26,0.08)";
      ctx!.lineWidth = 1;
      ctx!.stroke();

      const positions = NODES.map((_, i) => getPos(i));

      // Lines from center to nodes
      positions.forEach((p) => {
        ctx!.beginPath();
        ctx!.moveTo(CX, CY);
        ctx!.lineTo(p.x, p.y);
        ctx!.strokeStyle = "rgba(184,144,26,0.12)";
        ctx!.lineWidth = 0.5;
        ctx!.stroke();
      });

      // Lines between nodes
      positions.forEach((p, i) => {
        const next = positions[(i + 1) % 4];
        ctx!.beginPath();
        ctx!.moveTo(p.x, p.y);
        ctx!.lineTo(next.x, next.y);
        ctx!.strokeStyle = "rgba(184,144,26,0.08)";
        ctx!.lineWidth = 0.5;
        ctx!.stroke();
      });

      // Traveling dots
      positions.forEach((p, i) => {
        const dotProgress = (t * speeds[i] * 0.5) % 1;
        const dx = CX + (p.x - CX) * dotProgress;
        const dy = CY + (p.y - CY) * dotProgress;
        ctx!.beginPath();
        ctx!.arc(dx, dy, 1.5, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(233,195,73,0.7)";
        ctx!.fill();
      });

      // Position DOM nodes
      positions.forEach((p, i) => {
        const el = nodeRefs.current[i];
        if (!el) return;
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        el.style.left = p.x - w / 2 + "px";
        el.style.top = p.y - h / 2 + "px";
      });

      t++;
      frameRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(frameRef.current);
  },);

  return (
    <section
      style={{
        background: "#fbf3e4", 
        padding: "64px 24px",
        fontFamily: "var(--font-inter)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderTop: "1px solid #e8e0d0",
        borderBottom: "1px solid #e8e0d0",
      }}
    >
      {/* Soft gold orb */}
      <div style={{
        position: "absolute", borderRadius: "50%",
        filter: "blur(80px)", pointerEvents: "none",
        width: 320, height: 320,
        background: "rgba(184,144,26,0.06)",
        top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
      }} />

      {/* Top heading */}
      <div style={{ textAlign: "center", marginBottom: 32, position: "relative", zIndex: 2 }}>
        <p style={{
          fontSize: 10, letterSpacing: "0.32em",
          color: "#b8901a", textTransform: "uppercase",
          marginBottom: 10, fontFamily: "var(--font-inter)",
        }}>
          Connected Financial Planning
        </p>
        <h2 style={{
          fontFamily: "var(--font-playfair)",
          fontSize: 28, fontWeight: 400,
          color: "#1e1b13", letterSpacing: "0.04em", margin: 0,
        }}>
          The SBS Wealth Ecosystem
        </h2>
        {/* Gold divider */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "center", gap: 8, marginTop: 14,
        }}>
          <div style={{ width: 28, height: 1, background: "#c9a84c" }} />
          <div style={{ width: 5, height: 5, background: "#e9c349", transform: "rotate(45deg)" }} />
          <div style={{ width: 28, height: 1, background: "#c9a84c" }} />
        </div>
      </div>

      {/* Ecosystem canvas */}
      <div style={{ position: "relative", width: 360, height: 360, zIndex: 2 }}>
        <canvas
          ref={canvasRef}
          width={360}
          height={360}
          style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
        />

      {/* Center badge */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: 140,
        height: 140,
        borderRadius: "50%",
        border: "1px solid rgba(184,144,26,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#faf6ef",
        zIndex: 10,
        boxShadow: `
        0 0 40px rgba(184,144,26,0.14),
        inset 0 0 18px rgba(184,144,26,0.05)
      `,
    }}>
      <div style={{
      width: 102,
      height: 102,
      borderRadius: "50%",
      border: "1px solid rgba(184,144,26,0.22)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(255,255,255,0.35)",
      backdropFilter: "blur(8px)",
    }}>
    <Image
      src="/images/trusted bar/Sbs.png"
      alt="SBS Trust"
      width={84}
      height={84}
      style={{
        objectFit: "contain",
        borderRadius: "50%",
      }}
    />
  </div>
</div>

        {/* Orbiting nodes */}
        {NODES.map((node, i) => (
          <div
            key={i}
            ref={(el) => { nodeRefs.current[i] = el; }}
            onMouseEnter={() => { pausedRef.current[i] = true; }}
            onMouseLeave={() => { pausedRef.current[i] = false; }}
            style={{
              position: "absolute",
              display: "flex", flexDirection: "column", alignItems: "center",
              cursor: "default", zIndex: 5,
            }}
          >
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              border: "1px solid rgba(184,144,26,0.4)",
              background: "#faf6ef",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 8,
              boxShadow: "0 0 12px rgba(184,144,26,0.1)",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}>
          <div
              style={{
              position: "relative",
              width: 16,
              height: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            >
        {/* Pulse ring */}
          <div
              style={{
              position: "absolute",
              width: 16,
              height: 16,
              borderRadius: "50%",
              border: "1px solid rgba(201,168,76,0.35)",
              animation: "pulseOrb 2.8s ease-in-out infinite",
            }}
          />

        {/* Core */}
          <div
              style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background:"radial-gradient(circle, #f4d87a 0%, #c9a84c 70%)",
              boxShadow: "0 0 14px rgba(201,168,76,0.45)",
            }}
          />
          </div>
            </div>
            <span style={{
              fontSize: 8.5, letterSpacing: "0.18em",
              color: "#b8901a", textTransform: "uppercase",
              textAlign: "center", marginBottom: 3,
              whiteSpace: "nowrap",
              fontFamily: "var(--font-inter)",
            }}>
              {node.label}
            </span>
            <span style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 15, fontWeight: 400,
              color: "#1e1b13", textAlign: "center",
              whiteSpace: "nowrap",
            }}>
              {node.title}
            </span>
          </div>
        ))}
      </div>

      {/* Luxury marquee */}
        <div
            style={{
            width: "100%",
            overflow: "hidden",
            borderTop: "1px solid rgba(184,144,26,0.14)",
            borderBottom: "1px solid rgba(184,144,26,0.14)",
            marginTop: 34,
            padding: "14px 0",
            position: "relative",
            zIndex: 2,
            background: "rgba(255,255,255,0.28)",
            backdropFilter: "blur(10px)",
          }}
        >
      <div
         style={{
         display: "flex",
         width: "max-content",
         animation: "sbsMarquee 26s linear infinite",
         gap: 48,
         whiteSpace: "nowrap",
        }}
        >
      {[
        "Legacy-Focused Wealth Planning",
        "Disciplined Financial Guidance",
        "Long-Term Relationship Driven Advisory",
        "Structured Investment Thinking",
        "Preserving Wealth Across Generations",
        "Clarity Through Every Financial Stage",
      ].map((text, i) => (
      <span
        key={i}
        style={{
          fontSize: 10,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          color: "#b8901a",
          fontFamily: "var(--font-inter)",
        }}
      >
        {text}
      </span>
    ))}

    {/* Duplicate for seamless loop */}
    {[
      "Legacy-Focused Wealth Planning",
      "Disciplined Financial Guidance",
      "Long-Term Relationship Driven Advisory",
      "Structured Investment Thinking",
      "Preserving Wealth Across Generations",
      "Clarity Through Every Financial Stage",
    ].map((text, i) => (
      <span
        key={`dup-${i}`}
        style={{
          fontSize: 10,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          color: "#b8901a",
          fontFamily: "var(--font-inter)",
        }}
      >
        {text}
      </span>
    ))}
  </div>
</div>
    </section>
  );
}