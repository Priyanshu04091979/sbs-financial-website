"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ── types ── */
interface Particle {
  x: number; y: number; size: number;
  speedX: number; speedY: number;
  opacity: number; life: number; maxLife: number;
}

/* ── helpers ── */
function resetParticle(p: Particle, W: number, H: number, init = false) {
  p.x = Math.random() * W;
  p.y = init ? Math.random() * H : H + 10;
  p.size = Math.random() * 2 + 0.5;
  p.speedY = -(Math.random() * 0.4 + 0.2);
  p.speedX = (Math.random() - 0.5) * 0.3;
  p.opacity = Math.random() * 0.5 + 0.1;
  p.life = 0;
  p.maxLife = Math.random() * 300 + 200;
}

/* ════════════════════════════════
   ABOUT SNIPPET COMPONENT
   ════════════════════════════════ */
export default function AboutSnippet() {
  const sectionRef   = useRef<HTMLElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const curRef       = useRef<HTMLDivElement>(null);
  const ringRef      = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [counters, setCounters] = useState({ years: 0, clients: 0, assets: 0, retention: 0 });

  /* ── Intersection observer → trigger animations ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    // trigger immediately if already in view
    setTimeout(() => setActive(true), 150);
    return () => obs.disconnect();
  }, []);

  /* ── Count-up animation ── */
  useEffect(() => {
    if (!active) return;
    const targets = { years: 15, clients: 2000, assets: 500, retention: 98 };
    const duration = 1800;
    const start = performance.now();
    requestAnimationFrame(function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setCounters({
        years:     Math.floor(ease * targets.years),
        clients:   Math.floor(ease * targets.clients),
        assets:    Math.floor(ease * targets.assets),
        retention: Math.floor(ease * targets.retention),
      });
      if (p < 1) requestAnimationFrame(tick);
    });
    const t = setTimeout(() => requestAnimationFrame(function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setCounters({
        years:     Math.floor(ease * targets.years),
        clients:   Math.floor(ease * targets.clients),
        assets:    Math.floor(ease * targets.assets),
        retention: Math.floor(ease * targets.retention),
      });
      if (p < 1) requestAnimationFrame(tick);
    }), 600);
    return () => clearTimeout(t);
  }, [active]);

  /* ── Gold particles canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, raf: number;
    const particles: Particle[] = [];

    function resize() {
      W = canvas!.width  = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      const p: Particle = { x:0,y:0,size:0,speedX:0,speedY:0,opacity:0,life:0,maxLife:0 };
      resetParticle(p, W, H, true);
      particles.push(p);
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.speedX; p.y += p.speedY; p.life++;
        if (p.life > p.maxLife) resetParticle(p, W, H, false);
        const alpha = p.life < 30 ? p.life / 30 : p.life > p.maxLife - 30 ? (p.maxLife - p.life) / 30 : 1;
        ctx.save();
        ctx.globalAlpha = p.opacity * alpha;
        ctx.fillStyle = "#C9A84C";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      raf = requestAnimationFrame(loop);
    }
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  /* ── Custom cursor ── */
  useEffect(() => {
    let rx = 0, ry = 0, mx = 0, my = 0, rafId: number;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (curRef.current) { curRef.current.style.left = mx + "px"; curRef.current.style.top = my + "px"; }
    };
    function animRing() {
      rx += (mx - rx) * 0.11; ry += (my - ry) * 0.11;
      if (ringRef.current) { ringRef.current.style.left = rx + "px"; ringRef.current.style.top = ry + "px"; }
      rafId = requestAnimationFrame(animRing);
    }
    animRing();
    document.addEventListener("mousemove", onMove);
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafId); };
  }, []);

  /* ── Parallax on image ── */
  useEffect(() => {
    const onScroll = () => {
      const img = document.querySelector<HTMLImageElement>(".founder-img");
      if (img) img.style.transform = `scale(1) translateY(${window.scrollY * 0.04}px)`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── cursor size helpers ── */
  const bigCursor   = () => { curRef.current?.classList.add("cur-big");  ringRef.current?.classList.add("ring-big"); };
  const smallCursor = () => { curRef.current?.classList.remove("cur-big"); ringRef.current?.classList.remove("ring-big"); };

  /* ── word list for animated heading ── */
  const words = [
    { text: "Financial",  em: false },
    { text: "Guidance",   em: false },
    { text: "Built",      em: false },
    { text: "On",         em: false },
    { text: "Trust,",     em: true  },
    { text: "Stability",  em: true  },
    { text: "&",          em: false },
    { text: "Legacy",     em: true  },
  ];

  const statDelays = ["0.5s","0.65s","0.8s","0.95s"];
  const barWidths  = ["80%","65%","90%","98%"];
  const barDelays  = ["0.9s","1.05s","1.2s","1.35s"];

  return (
    <>
      {/* ── Custom Cursor ── */}
      <div
        ref={curRef}
        style={{
          position:"fixed",width:8,height:8,background:"#C9A84C",borderRadius:"50%",
          pointerEvents:"none",zIndex:9999,transform:"translate(-50%,-50%)",
          transition:"width .3s,height .3s",mixBlendMode:"multiply",
        }}
        className="cursor-dot"
      />
      <div
        ref={ringRef}
        style={{
          position:"fixed",width:32,height:32,border:"1.5px solid rgba(201,168,76,0.6)",
          borderRadius:"50%",pointerEvents:"none",zIndex:9998,transform:"translate(-50%,-50%)",
          transition:"width .3s,height .3s",
        }}
        className="cursor-ring"
      />

      <style>{`
        .cursor-dot.cur-big  { width:18px !important; height:18px !important; }
        .cursor-ring.ring-big{ width:52px !important; height:52px !important; }
        * { cursor: none !important; }

        /* word animation */
        .word-item { display:inline-block; overflow:hidden; }
        .word-inner {
          display:inline-block;
          opacity:0; transform:translateY(100%);
          transition:opacity .6s, transform .6s cubic-bezier(.16,1,.3,1);
          margin-right:0.22em;
        }
        .section-active .word-inner { opacity:1; transform:translateY(0); }

        /* gold rule */
        .gold-rule { width:0; height:2px; background:linear-gradient(90deg,#C9A84C,rgba(201,168,76,.2)); margin:20px 0 22px; transition:width .9s cubic-bezier(.16,1,.3,1) .7s; }
        .section-active .gold-rule { width:80px; }

        /* frame lines */
        .frame-top    { position:absolute; top:-12px; left:-12px; height:1.5px; background:#C9A84C; width:0; transition:width .7s cubic-bezier(.16,1,.3,1) .8s; }
        .frame-left   { position:absolute; top:-12px; left:-12px; width:1.5px; background:#C9A84C; height:0; transition:height .7s cubic-bezier(.16,1,.3,1) .9s; }
        .frame-bottom { position:absolute; bottom:12px; right:12px; height:1.5px; background:#C9A84C; width:0; transition:width .7s cubic-bezier(.16,1,.3,1) 1s; }
        .frame-right  { position:absolute; bottom:12px; right:12px; width:1.5px; background:#C9A84C; height:0; transition:height .7s cubic-bezier(.16,1,.3,1) 1.1s; }
        .section-active .frame-top,
        .section-active .frame-bottom { width:60%; }
        .section-active .frame-left,
        .section-active .frame-right  { height:60%; }

        /* shimmer on image */
        .founder-img-box::after {
          content:''; position:absolute; inset:0; z-index:2;
          background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.15) 50%,transparent 60%);
          transform:translateX(-100%);
          transition:transform 1s ease 1.2s;
        }
        .section-active .founder-img-box::after { transform:translateX(200%); }

        /* stat bar */
        .stat-bar { position:absolute; bottom:0; left:0; height:1.5px; background:#C9A84C; width:0; }
        .stat-row-hover { position:absolute; inset:0; background:rgba(201,168,76,.04); width:0; transition:width .3s; }
        .stat-row-el:hover .stat-row-hover { width:100%; }

        /* btn slide fill */
        .btn-bg { position:absolute; inset:0; transform:translateX(-101%); transition:transform .4s cubic-bezier(.16,1,.3,1); }
        .btn-el:hover .btn-bg { transform:translateX(0); }
        .btn-el:hover .btn-arrow { transform:translateX(6px); }
        .btn-arrow { transition:transform .3s; }

        /* value card hover */
        .value-card:hover { box-shadow:0 8px 32px rgba(201,168,76,.12); border-color:rgba(201,168,76,.5) !important; background:rgba(201,168,76,.09) !important; }

        /* bs hover top bar */
        .bs-item-el::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:#C9A84C; transform:scaleX(0); transform-origin:left; transition:transform .4s cubic-bezier(.16,1,.3,1); }
        .bs-item-el:hover::before { transform:scaleX(1); }

        /* rings pulse */
        @keyframes ringPulse { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.04);opacity:1} }
        .deco-ring { animation:ringPulse 6s ease-in-out infinite; }

        /* dot pulse */
        @keyframes dotPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }
        .award-dot { animation:dotPulse 2s ease infinite; }
      `}</style>

      {/* ════════ SECTION ════════ */}
      <section
        ref={sectionRef}
        className={active ? "section-active" : ""}
        style={{
          background:"#fbf3e4", position:"relative", overflow:"hidden",
          fontFamily:"'DM Sans', sans-serif",
        }}
      >
        {/* Particles */}
        <canvas
          ref={canvasRef}
          style={{ position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0,opacity:.5 }}
        />

        {/* Deco rings */}
        {[600,400,200].map((s,i) => (
          <div key={i} className="deco-ring" style={{
            position:"absolute", borderRadius:"50%",
            border:"1px solid rgba(201,168,76,0.1)",
            pointerEvents:"none", zIndex:0,
            width:s, height:s,
            top: -s*0.33, right: -s*0.25,
            animationDelay:`${i}s`,
          }}/>
        ))}

        {/* Watermark */}
        <div style={{
          position:"absolute",bottom:-40,left:-10,zIndex:0,
          fontFamily:"'Playfair Display',serif",fontSize:260,fontWeight:700,
          color:"rgba(201,168,76,0.04)",lineHeight:1,pointerEvents:"none",userSelect:"none",
          transform: active ? "translateX(0)" : "translateX(-40px)",
          transition:"transform 1.8s cubic-bezier(.16,1,.3,1)",
        }}>SBS</div>

        {/* ── TOP STRIP ── */}
        <div style={{
          display:"flex",alignItems:"center",justifyContent:"space-between",
          padding:"24px 64px 0",position:"relative",zIndex:2,
          opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(-10px)",
          transition:"opacity .6s,transform .6s",
        }}>
          <span style={{ display:"flex",alignItems:"center",gap:10,fontSize:10,letterSpacing:".22em",textTransform:"uppercase",color:"#C9A84C" }}>
            <span style={{width:32,height:1,background:"#C9A84C",display:"block"}}/>
            Wealth Stewardship
          </span>
          <div style={{ flex:1,height:1,background:"linear-gradient(90deg,rgba(201,168,76,.3),rgba(201,168,76,.05))",margin:"0 32px" }}/>
          <span style={{fontSize:10,letterSpacing:".14em",color:"rgba(26,26,26,.25)"}}>Est. 2009 · Ahmedabad, Gujarat</span>
        </div>

        {/* ── MAIN GRID ── */}
        <div style={{ display:"grid",gridTemplateColumns:"1fr 400px 1fr",padding:"36px 64px 0",position:"relative",zIndex:2,alignItems:"start" }}>

          {/* ── LEFT COL ── */}
          <div style={{ paddingRight:52,paddingTop:24 }}>
            <span style={{
              fontSize:10,letterSpacing:".22em",textTransform:"uppercase",color:"#C9A84C",
              display:"block",marginBottom:18,
              opacity: active?1:0, transform: active?"translateX(0)":"translateX(-18px)",
              transition:"opacity .5s .1s,transform .5s .1s",
            }}>About Us</span>

            {/* Animated heading */}
            <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:44,fontWeight:700,color:"#1A1A1A",lineHeight:1.15,marginBottom:4 }}>
              {words.map((w,i) => (
                <span key={i} className="word-item">
                  <span
                    className="word-inner"
                    style={{
                      fontStyle: w.em?"italic":"normal",
                      color: w.em?"#C9A84C":"#1A1A1A",
                      transitionDelay:`${0.2+i*0.1}s`,
                    }}
                  >{w.text}</span>
                </span>
              ))}
            </h2>
            <div className="gold-rule"/>

            <p style={{ fontSize:14.5,color:"#5A5450",lineHeight:1.85,marginBottom:16,
              opacity:active?1:0,transform:active?"translateX(0)":"translateX(-14px)",
              transition:"opacity .6s .55s,transform .6s .55s" }}>
              At SBS Financial Services, we believe every financial journey deserves expert guidance — built on integrity, clarity, and decades of unwavering commitment to your unique goals.
            </p>
            <p style={{ fontSize:14.5,color:"#5A5450",lineHeight:1.85,marginBottom:16,
              opacity:active?1:0,transform:active?"translateX(0)":"translateX(-14px)",
              transition:"opacity .6s .65s,transform .6s .65s" }}>
              Our advisors craft bespoke strategies that endure across generations. Because your future deserves nothing less than the very best.
            </p>

            {/* Value cards */}
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:26 }}>
              {[
                { icon:"🤝", name:"Trust First",   sub:"15+ years of lasting relationships" },
                { icon:"📊", name:"Disciplined",   sub:"Data-driven, long-term planning"    },
                { icon:"🔒", name:"Stability",     sub:"Consistent returns every cycle"     },
                { icon:"🌱", name:"Growth",        sub:"Wealth that spans generations"      },
              ].map((v,i) => (
                <div
                  key={i}
                  className="value-card"
                  onMouseEnter={bigCursor} onMouseLeave={smallCursor}
                  style={{
                    display:"flex",alignItems:"flex-start",gap:10,padding:"14px 16px",
                    border:"1px solid rgba(201,168,76,.18)",background:"rgba(201,168,76,.04)",
                    opacity:active?1:0,transform:active?"translateY(0) scale(1)":"translateY(14px) scale(.98)",
                    transition:`opacity .4s ${0.8+i*0.12}s,transform .4s ${0.8+i*0.12}s,box-shadow .25s,border-color .25s,background .25s`,
                    cursor:"none",
                  }}
                >
                  <span style={{fontSize:17,flexShrink:0,marginTop:1}}>{v.icon}</span>
                  <div>
                    <div style={{fontSize:11,fontWeight:600,color:"#1A1A1A",letterSpacing:".04em",marginBottom:2}}>{v.name}</div>
                    <div style={{fontSize:11,color:"#8A8078",lineHeight:1.4}}>{v.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CENTER COL — FOUNDER ── */}
          <div style={{ position:"relative",display:"flex",flexDirection:"column",alignItems:"center" }}>
            <div style={{
              position:"relative",width:"100%",
              opacity:active?1:0,transform:active?"translateY(0) scale(1)":"translateY(40px) scale(.95)",
              transition:"opacity 1s .15s,transform 1s cubic-bezier(.16,1,.3,1) .15s",
            }}>
              {/* Frame lines */}
              <div className="frame-top"/><div className="frame-left"/>
              <div className="frame-bottom"/><div className="frame-right"/>

              {/* Image box */}
              <div
                className="founder-img-box"
                style={{ position:"relative",zIndex:1,width:"100%",aspectRatio:"3/4",overflow:"hidden",background:"#D4CFC5" }}
              >
                {/*
                  Replace the src below with your actual founder image.
                  e.g. src="/images/urval-shah.jpg"
                  or use Next.js Image: import Image from "next/image"
                */}
                <Image
                  src="/image.png"
                  alt="about"
                  width={500}
                  height={500}
                  style={{
                  width: "100%",
                  height: "auto",
                }}
                />  
                {/* Bottom fade */}
                <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"50%",background:"linear-gradient(to top,rgba(245,240,232,.95) 0%,transparent 100%)",zIndex:3 }}/>
                {/* Name tag */}
                <div style={{ position:"absolute",bottom:0,left:0,right:0,zIndex:4,padding:"20px 24px",textAlign:"center" }}>
                  <div style={{ fontFamily:"'Playfair Display',serif",fontSize:21,fontWeight:700,color:"#1A1A1A",marginBottom:4 }}>Mr. Urval Shah</div>
                  <div style={{ fontSize:9,letterSpacing:".2em",textTransform:"uppercase",color:"#C9A84C" }}>Founder &amp; Managing Director</div>
                </div>
              </div>

              {/* Gold badge */}
              <div style={{
                position:"absolute",top:20,right:-18,zIndex:6,
                background:"#C9A84C",padding:"14px 16px",textAlign:"center",minWidth:76,
                opacity:active?1:0,transform:active?"scale(1) rotate(0deg)":"scale(0) rotate(-8deg)",
                transition:"opacity .5s .95s,transform .5s cubic-bezier(.34,1.56,.64,1) .95s",
              }}>
                <span style={{ fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:"#0A0906",display:"block",lineHeight:1 }}>15+</span>
                <span style={{ fontSize:8,letterSpacing:".14em",textTransform:"uppercase",color:"rgba(10,9,6,.6)",display:"block",marginTop:3 }}>Years</span>
              </div>

              {/* SEBI award tag */}
              <div style={{
                position:"absolute",bottom:80,left:-20,zIndex:6,
                background:"#1A1A1A",padding:"10px 16px",
                display:"flex",alignItems:"center",gap:10,
                opacity:active?1:0,transform:active?"translateX(0)":"translateX(-20px)",
                transition:"opacity .5s 1.1s,transform .5s cubic-bezier(.16,1,.3,1) 1.1s",
              }}>
                <div className="award-dot" style={{ width:6,height:6,borderRadius:"50%",background:"#C9A84C",flexShrink:0 }}/>
                <span style={{ fontSize:10,letterSpacing:".1em",textTransform:"uppercase",color:"rgba(245,240,232,.7)" }}>SEBI Registered Advisor</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COL ── */}
          <div style={{ paddingLeft:52,paddingTop:24,display:"flex",flexDirection:"column" }}>
            {/* Big quote */}
            <div style={{
              position:"relative",marginBottom:32,
              opacity:active?1:0,transform:active?"translateX(0)":"translateX(18px)",
              transition:"opacity .7s .3s,transform .7s .3s",
            }}>
              <span style={{ fontFamily:"'Playfair Display',serif",fontSize:100,fontWeight:700,color:"rgba(201,168,76,.12)",lineHeight:.6,display:"block",marginBottom:-12 }}></span>
              <p style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:21,color:"#1A1A1A",lineHeight:1.62,marginBottom:14,paddingLeft:2 }}>
                Financial confidence is built through disciplined planning, informed decisions, and trusted relationships.
              </p>
              <span style={{ fontSize:10,letterSpacing:".16em",textTransform:"uppercase",color:"#C9A84C" }}>— Mr. Urval Shah, Founder</span>
            </div>

            {/* Stat rows with count-up */}
            <div style={{ display:"flex",flexDirection:"column",borderTop:"1px solid rgba(201,168,76,.2)",marginBottom:32 }}>
              {[
                { label:"Years of Experience", val:`${counters.years}+`                                      },
                { label:"Happy Clients",        val: counters.clients >= 1000 ? `${(counters.clients/1000).toFixed(counters.clients>=2000?0:1)}K+` : `${counters.clients}+` },
                { label:"Assets Under Mgmt",    val:`₹${counters.assets}Cr+`                                 },
                { label:"Client Retention",     val:`${counters.retention}%`                                 },
              ].map((s,i) => (
                <div
                  key={i}
                  className="stat-row-el"
                  onMouseEnter={bigCursor} onMouseLeave={smallCursor}
                  style={{
                    display:"flex",alignItems:"center",justifyContent:"space-between",
                    padding:"16px 0",borderBottom:"1px solid rgba(201,168,76,.08)",
                    position:"relative",overflow:"hidden",cursor:"none",
                    opacity:active?1:0,transform:active?"translateX(0)":"translateX(14px)",
                    transition:`opacity .4s ${statDelays[i]},transform .4s ${statDelays[i]}`,
                  }}
                >
                  <div className="stat-row-hover"/>
                  <span style={{ fontSize:11,letterSpacing:".06em",color:"#8A8078",position:"relative",zIndex:1 }}>{s.label}</span>
                  <span style={{ fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,color:"#1A1A1A",position:"relative",zIndex:1 }}>{s.val}</span>
                  <div
                    className="stat-bar"
                    style={{
                      width: active ? barWidths[i] : 0,
                      transition:`width .8s cubic-bezier(.16,1,.3,1) ${barDelays[i]}`,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{
              display:"flex",flexDirection:"column",gap:10,
              opacity:active?1:0,transform:active?"translateY(0)":"translateY(14px)",
              transition:"opacity .5s 1.1s,transform .5s 1.1s",
            }}>
              {[
                { label:"Read Our Full Story", primary:true  },
                { label:"Meet The Team",        primary:false },
              ].map((b,i) => (
                <button
                  key={i}
                  className="btn-el"
                  onMouseEnter={bigCursor} onMouseLeave={smallCursor}
                  style={{
                    display:"flex",alignItems:"center",justifyContent:"space-between",
                    width:"100%",padding:"15px 22px",border: b.primary?"none":"1px solid rgba(26,26,26,.2)",
                    background: b.primary?"#1A1A1A":"transparent",
                    color: b.primary?"#F5F0E8":"#1A1A1A",
                    fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:".14em",
                    textTransform:"uppercase",fontWeight:500,
                    position:"relative",overflow:"hidden",cursor:"none",
                  }}
                >
                  <div
                    className="btn-bg"
                    style={{ background: b.primary?"#C9A84C":"rgba(201,168,76,.1)" }}
                  />
                  <span style={{ position:"relative",zIndex:1 }}>{b.label}</span>
                  <span className="btn-arrow" style={{ position:"relative",zIndex:1,fontSize:14 }}>→</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM STATS STRIP ── */}
        <div style={{
          display:"grid",gridTemplateColumns:"repeat(4,1fr)",
          marginTop:44,borderTop:"1px solid rgba(201,168,76,.18)",
          position:"relative",zIndex:2,
        }}>
          {[
            { num:"15", suf:"+",    lbl:"Years of Trust",  sub:"Since 2009"        },
            { num:"2,000", suf:"+", lbl:"Happy Clients",   sub:"Across Gujarat"    },
            { num:"₹500", suf:"Cr+",lbl:"Assets Managed",  sub:"Growing every year"},
            { num:"98", suf:"%",    lbl:"Retention Rate",  sub:"Clients for life"  },
          ].map((s,i) => (
            <div
              key={i}
              className="bs-item-el"
              onMouseEnter={bigCursor} onMouseLeave={smallCursor}
              style={{
                padding:"26px 40px",
                borderRight: i<3?"1px solid rgba(201,168,76,.1)":"none",
                display:"flex",flexDirection:"column",gap:4,
                position:"relative",overflow:"hidden",cursor:"none",
                opacity:active?1:0,transform:active?"translateY(0)":"translateY(18px)",
                transition:`opacity .4s ${1.05+i*0.13}s,transform .4s ${1.05+i*0.13}s`,
              }}
            >
              <span style={{ fontFamily:"'Playfair Display',serif",fontSize:34,fontWeight:700,color:"#1A1A1A",lineHeight:1 }}>
                {s.num}<span style={{color:"#C9A84C"}}>{s.suf}</span>
              </span>
              <span style={{fontSize:10,letterSpacing:".14em",textTransform:"uppercase",color:"#9A9088"}}>{s.lbl}</span>
              <span style={{fontSize:12,color:"#C9A84C",fontWeight:500,marginTop:1}}>{s.sub}</span>
            </div>
          ))}
        </div>

        {/* ── BRAND STRIP ── */}
        <div style={{
          background:"#1A1A1A",padding:"15px 64px",
          display:"flex",alignItems:"center",justifyContent:"space-between",
          position:"relative",zIndex:2,
        }}>
          <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,#C9A84C 30%,#C9A84C 70%,transparent)",opacity:.3 }}/>
          <span style={{fontSize:10,letterSpacing:".14em",textTransform:"uppercase",color:"rgba(245,240,232,.22)"}}>SBS Financial Services · Ahmedabad, Gujarat</span>
          <div style={{display:"flex"}}>
            {["Mutual Funds","Insurance","Wealth Planning","Tax Advisory"].map((s,i,arr) => (
              <span key={i} style={{ fontSize:10,letterSpacing:".1em",textTransform:"uppercase",color:"rgba(245,240,232,.35)",padding:"0 16px",borderRight: i<arr.length-1?"1px solid rgba(255,255,255,.07)":"none" }}>{s}</span>
            ))}
          </div>
          <span style={{fontSize:10,letterSpacing:".14em",textTransform:"uppercase",color:"#C9A84C"}}>SEBI Registered</span>
        </div>
      </section>
    </>
  );
}