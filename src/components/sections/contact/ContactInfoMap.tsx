"use client";

import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal"],
});

export default function ContactInfoMap() {
  const mapSrc =
    "https://maps.google.com/maps?q=Span+Trade+Centre,+Paldi,+Ahmedabad,+Gujarat&output=embed&z=17";

  return (
    <section className="map-section">
      <style dangerouslySetInnerHTML={{ __html: `
        .map-section {
          padding: 10px 32px 100px;
          background: #ffffff;
        }
        .map-section .map-wrap {
          max-width: 1100px;
          margin: 0 auto;
        }
        .map-heading {
          text-align: center;
          margin-bottom: 14px;
        }
        .map-heading .eyebrow {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .2em;
          color: #735c00;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .map-heading h2 {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-weight: 500;
          font-size: 30px;
          color: #000613;
          margin: 0;
        }

        .map-shell {
          position: relative;
          margin-top: 40px;
          border-radius: 24px;
          overflow: hidden;
          background: #000613;
          min-height: 440px;
        }
        .map-shell iframe {
          width: 100%;
          height: 440px;
          border: 0;
          display: block;
          filter: saturate(0.85) contrast(1.05);
        }

        /* gold viewfinder corners */
        .corner {
          position: absolute;
          width: 46px;
          height: 46px;
          border: 2px solid #e9c349;
          pointer-events: none;
          z-index: 3;
        }
        .corner.tl {
          top: 18px;
          left: 18px;
          border-right: none;
          border-bottom: none;
          border-radius: 6px 0 0 0;
        }
        .corner.tr {
          top: 18px;
          right: 18px;
          border-left: none;
          border-bottom: none;
          border-radius: 0 6px 0 0;
        }
        .corner.bl {
          bottom: 18px;
          left: 18px;
          border-right: none;
          border-top: none;
          border-radius: 0 0 0 6px;
        }
        .corner.br {
          bottom: 18px;
          right: 18px;
          border-left: none;
          border-top: none;
          border-radius: 0 0 6px 0;
        }
        @media (max-width: 600px) {
          .corner {
            display: none;
          }
        }

        /* pulsing pin, purely decorative */
        .pulse-pin {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          z-index: 2;
          pointer-events: none;
        }
        .pulse-pin .dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #e9c349;
          box-shadow: 0 0 0 0 rgba(233,195,73,0.7);
          animation: pulse 2.2s infinite;
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(233,195,73,0.55);
          }
          70% {
            box-shadow: 0 0 0 26px rgba(233,195,73,0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(233,195,73,0);
          }
        }

        /* floating glass info card on the map */
        .map-info-card {
          position: absolute;
          top: 24px;
          left: 24px;
          z-index: 4;
          width: 260px;
          background: rgba(0,6,19,0.55);
          border: 1px solid rgba(233,195,73,0.4);
          backdrop-filter: blur(14px) saturate(150%);
          -webkit-backdrop-filter: blur(14px) saturate(150%);
          border-radius: 14px;
          padding: 24px 22px;
        }
        @media (max-width: 600px) {
          .map-info-card {
            position: static;
            width: auto;
            margin: 18px;
          }
        }
        .map-info-card h4 {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-weight: 500;
          font-size: 17px;
          color: #fed65b;
          margin: 0 0 12px;
        }
        .map-info-card .row {
          display: flex;
          gap: 10px;
          margin-bottom: 12px;
          font-size: 12.5px;
          color: rgba(255,248,239,0.9);
          line-height: 1.6;
        }
        .map-info-card .row:last-of-type {
          margin-bottom: 18px;
        }
        .map-info-card svg {
          width: 15px;
          height: 15px;
          stroke: #e9c349;
          flex: 0 0 auto;
          margin-top: 1px;
        }
        .map-info-card .ghost-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #000613;
          background: #fed65b;
          padding: 9px 16px;
          border-radius: 24px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: .06em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background .25s ease;
        }
        .map-info-card .ghost-link:hover {
          background: rgba(254,214,91,0.9);
        }
      `}} />

      <div className="map-wrap">
        <div className="map-heading">
          <div className="eyebrow">Find Us</div>
          <h2>Visit Our Office</h2>
        </div>

        <div className="map-shell">
          <div className="corner tl"></div>
          <div className="corner tr"></div>
          <div className="corner bl"></div>
          <div className="corner br"></div>

          <div className="pulse-pin"><div className="dot"></div></div>

          <div className="map-info-card">
            <h4>SBS Financials</h4>
            <div className="row">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              10th Floor – 1003, Span Trade Centre, Paldi, Ahmedabad, Gujarat
            </div>
            <div className="row">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              Mon – Sat, 9 AM – 6 PM
            </div>
            <a 
              className="ghost-link" 
              href="https://maps.app.goo.gl/M6ahJaF8J2FDFHG48"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
            </a>
          </div>

          <iframe
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SBS Financials Office Location"
          >
          </iframe>
        </div>
      </div>
    </section>
  );
}