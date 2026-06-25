"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <style>{`
        @keyframes sbs-footer-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .sbs-footer-marquee {
          display: flex;
          gap: 0;
          white-space: nowrap;
          animation: sbs-footer-scroll 22s linear infinite;
        }
        .sbs-footer-link {
          display: block;
          font-size: 12.5px;
          color: #43474e;
          text-decoration: none;
          margin-bottom: 10px;
          font-weight: 300;
          position: relative;
          padding-bottom: 2px;
          transition: color 0.25s ease, letter-spacing 0.25s ease;
          font-family: var(--font-inter), sans-serif;
        }
        .sbs-footer-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: #e9c349;
          transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sbs-footer-link:hover {
          color: #735c00;
          letter-spacing: 0.05em;
        }
        .sbs-footer-link:hover::after {
          width: 100%;
        }
        .sbs-footer-legal-link {
          font-size: 11px;
          color: rgba(67,71,78,0.45);
          text-decoration: none;
          transition: color 0.2s;
          position: relative;
          font-family: var(--font-inter), sans-serif;
        }
        .sbs-footer-legal-link::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0;
          width: 0; height: 1px;
          background: #e9c349;
          transition: width 0.3s;
        }
        .sbs-footer-legal-link:hover { color: #735c00; }
        .sbs-footer-legal-link:hover::after { width: 100%; }

        .sbs-social-btn {
          width: 34px; height: 34px;
          border: 1px solid rgba(233,195,73,0.35);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          background: transparent;
          position: relative;
          overflow: hidden;
          text-decoration: none;
        }
        .sbs-social-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #e9c349;
          transform: translateY(100%);
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sbs-social-btn:hover::before { transform: translateY(0); }
        .sbs-social-btn:hover {
          border-color: #e9c349;
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(233,195,73,0.2);
        }
        .sbs-social-btn svg {
          width: 14px; height: 14px;
          fill: #735c00;
          position: relative; z-index: 1;
          transition: fill 0.3s;
        }
        .sbs-social-btn:hover svg { fill: #000613; }

        .sbs-contact-item {
          display: flex; gap: 10px;
          margin-bottom: 13px;
          align-items: flex-start;
          cursor: default;
        }
        .sbs-contact-icon {
          width: 30px; height: 30px;
          flex-shrink: 0;
          border: 1px solid rgba(233,195,73,0.28);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative; overflow: hidden;
        }
        .sbs-contact-icon::before {
          content: '';
          position: absolute; inset: 0;
          background: #e9c349;
          transform: translateY(100%);
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sbs-contact-item:hover .sbs-contact-icon::before { transform: translateY(0); }
        .sbs-contact-item:hover .sbs-contact-icon {
          border-color: #e9c349;
          transform: translateY(-2px);
        }
        .sbs-contact-icon svg {
          width: 13px; height: 13px;
          stroke: #735c00; fill: none; stroke-width: 1.5;
          position: relative; z-index: 1;
          transition: stroke 0.3s;
        }
        .sbs-contact-item:hover .sbs-contact-icon svg { stroke: #000613; }
      `}</style>

      <footer
        style={{
          background: "#fff8ef",
          padding: "60px 48px 0",
          position: "relative",
          overflow: "hidden",
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        {/* Top gold border */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "2px",
            background: "linear-gradient(90deg, transparent, #e9c349 30%, #e9c349 70%, transparent)",
          }}
        />

        {/* Marquee */}
        <div
          style={{
            overflow: "hidden",
            position: "relative",
            borderTop: "1px solid rgba(233,195,73,0.25)",
            borderBottom: "1px solid rgba(233,195,73,0.25)",
            padding: "14px 0",
            marginBottom: "52px",
            backgroundColor: "#fbf3e4",
          }}
        >
          {/* Fade edges */}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "80px", background: "linear-gradient(90deg,#fbf3e4,transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "80px", background: "linear-gradient(270deg,#fbf3e4,transparent)", zIndex: 2, pointerEvents: "none" }} />

          <div className="sbs-footer-marquee">
            {[...Array(2)].map((_, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "13px", fontWeight: 600, color: "#000613", letterSpacing: "0.38em", textTransform: "uppercase", paddingRight: "40px", userSelect: "none" }}>SBS Financial Services</span>
                <span style={{ fontSize: "13px", color: "#e9c349", paddingRight: "40px", opacity: 0.9 }}>✦</span>
                <span style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "13px", fontWeight: 600, color: "#000613", letterSpacing: "0.38em", textTransform: "uppercase", paddingRight: "40px", userSelect: "none" }}>Wealth · Clarity · Discipline</span>
                <span style={{ fontSize: "13px", color: "#e9c349", paddingRight: "40px", opacity: 0.9 }}>✦</span>
                <span style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "13px", fontWeight: 600, color: "#000613", letterSpacing: "0.38em", textTransform: "uppercase", paddingRight: "40px", userSelect: "none" }}>Trusted Since 2012</span>
                <span style={{ fontSize: "13px", color: "#e9c349", paddingRight: "40px", opacity: 0.9 }}>✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.8fr 1fr 1fr 1.3fr",
            gap: "44px",
            paddingBottom: "48px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Brand Column */}
          <div>
            <div style={{ marginBottom: "10px" }}>
              <Image
                src="/logo/Sbs-1.png"
                alt="SBS Financial Services"
                width={220}
                height={72}
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
            </div>
            <span style={{ fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#735c00", display: "block", marginBottom: "16px", fontWeight: 500 }}>
              Financial Services
            </span>
            <p style={{ fontSize: "12px", lineHeight: 1.78, color: "#43474e", fontWeight: 300, maxWidth: "220px", marginBottom: "22px" }}>
              SBS Financial Services delivers personalized financial advisory and wealth management solutions focused on long-term financial confidence and stability.
            </p>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "8px" }}>
              <a href="https://www.instagram.com/sbsfinancial?igsh=MW01ZG9pM29obW0xbg==" target="_blank" rel="noopener noreferrer" className="sbs-social-btn" title="Instagram">
                <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="#735c00" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="#735c00" strokeWidth="1.8" /><circle cx="17.5" cy="6.5" r="1.2" fill="#735c00" /></svg>
              </a>
              <a href="https://www.facebook.com/share/1ETodRg3J2/" target="_blank" rel="noopener noreferrer" className="sbs-social-btn" title="Facebook">
                <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
              </a>
              <a href="https://x.com/services5272" target="_blank" rel="noopener noreferrer" className="sbs-social-btn" title="Twitter / X">
                <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622z" /></svg>
              </a>
              <a href="https://www.linkedin.com/company/sbs-financials/" target="_blank" rel="noopener noreferrer" className="sbs-social-btn" title="LinkedIn">
                <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href="https://youtube.com/@sbsfinancials?si=dKQ9457BVXpHwCHK" target="_blank" rel="noopener noreferrer" className="sbs-social-btn" title="YouTube">
                <svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fbf3e4" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <span style={{ fontSize: "12px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#000613", fontWeight: 500, marginBottom: "20px", display: "block", position: "relative", paddingBottom: "10px", borderBottom: "none" }}>
              Quick Links
              <span style={{ position: "absolute", bottom: 0, left: 0, width: "22px", height: "1px", background: "#e9c349", display: "block" }} />
            </span>
            {["Home", "About", "Services", "Calculators", "Contact"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="sbs-footer-link">{item}</Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <span style={{ fontSize: "12px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#000613", fontWeight: 500, marginBottom: "20px", display: "block", position: "relative", paddingBottom: "10px" }}>
              Services
              <span style={{ position: "absolute", bottom: 0, left: 0, width: "22px", height: "1px", background: "#e9c349", display: "block" }} />
            </span>
            {["Mutual Funds", "SIP Planning", "Insurance", "Tax Planning", "Fixed Deposits", "Retirement Planning", "Wealth Management"].map((item) => (
              <Link key={item} href="/services" className="sbs-footer-link">{item}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <span style={{ fontSize: "12px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#000613", fontWeight: 500, marginBottom: "20px", display: "block", position: "relative", paddingBottom: "10px" }}>
              Contact
              <span style={{ position: "absolute", bottom: 0, left: 0, width: "22px", height: "1px", background: "#e9c349", display: "block" }} />
            </span>

            <div className="sbs-contact-item">
              <div className="sbs-contact-icon">
                {/* Replace SVG with: <Image src="/icons/location.png" width={14} height={14} alt="location" style={{position:"relative",zIndex:1}} /> */}
                <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <span style={{ fontSize: "12px", color: "#43474e", lineHeight: 1.65, fontWeight: 300 }}>
                D2 Harish Appartment, Part 2<br />
                Near Dhanvantari Garden<br />
                Shantivan, Paldi,<br />
                Ahmedabad, Gujarat 380007
              </span>
            </div>

            <div className="sbs-contact-item">
              <div className="sbs-contact-icon">
                {/* Replace SVG with: <Image src="/icons/phone.png" width={14} height={14} alt="phone" style={{position:"relative",zIndex:1}} /> */}
                <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.19 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" /></svg>
              </div>
              <span style={{ fontSize: "12px", color: "#43474e", lineHeight: 1.65, fontWeight: 300 }}>9081353523</span>
            </div>

            <div className="sbs-contact-item">
              <div className="sbs-contact-icon">
                {/* Replace SVG with: <Image src="/icons/mail.png" width={14} height={14} alt="mail" style={{position:"relative",zIndex:1}} /> */}
                <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </div>
              <span style={{ fontSize: "12px", color: "#735c00", lineHeight: 1.65, fontWeight: 300 }}>Sbsfin27@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(233,195,73,0.2)",
            padding: "18px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span style={{ fontSize: "11px", color: "rgba(67,71,78,0.5)" }}>
            © 2026 SBS Financial Services. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link href="/privacy-policy" className="sbs-footer-legal-link">Privacy Policy</Link>
            <Link href="/terms" className="sbs-footer-legal-link">Terms &amp; Conditions</Link>
            <Link href="/disclaimer" className="sbs-footer-legal-link">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </>
  );
}