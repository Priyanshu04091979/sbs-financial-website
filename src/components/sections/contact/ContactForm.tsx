"use client";

import { Playfair_Display } from "next/font/google";
import { Send, Check, Loader2 } from "lucide-react";
import { useState, useRef, type FormEvent } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["italic", "normal"],
});

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/", icon: LinkedinIcon },
  { name: "Instagram", href: "https://instagram.com/", icon: InstagramIcon },
  { name: "X", href: "https://x.com/", icon: XIcon },
  { name: "Facebook", href: "https://facebook.com/", icon: FacebookIcon },
];

type FormState = {
  name: string;
  company: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  company: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
};

// ─── Security: Strict allowlist of permitted field keys ──────────────────────
// Prevents Prototype Pollution: dynamic key access via e.target.name is limited
// to only these exact keys. An attacker-injected field named "__proto__" or
// "constructor" will be silently ignored instead of polluting Object.prototype.
const ALLOWED_FIELDS = new Set<keyof FormState>([
  "name", "company", "phone", "email", "subject", "message",
]);

// ─── Security: Strict email regex ────────────────────────────────────────────
// HTML5 type="email" can be bypassed via JavaScript. This regex enforces RFC
// 5322-style format on the client as an additional validation layer.
const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

// ─── Security: Output sanitization before network dispatch ───────────────────
// Strips HTML tags (<script>, <img>, etc.), carriage-return / newline chars
// (prevent HTTP header injection & log injection), and trims whitespace.
// React JSX already escapes values for DOM rendering (XSS-safe by default),
// but this layer also sanitizes what leaves the browser toward the backend.
function sanitize(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")          // strip all HTML/SVG tags
    .replace(/[\r\n\t]/g, " ")        // collapse control characters
    .replace(/[&<>"'`]/g, (c) =>      // HTML-encode special chars
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" }[c] ?? c)
    )
    .trim();
}

// ─── Security: Rate limiting ──────────────────────────────────────────────────
// Prevents spam / brute-force submission. Stores last-submit timestamp in
// module scope (persists for the lifetime of the React component tree).
let lastSubmitTime = 0;
const RATE_LIMIT_MS = 30_000; // 30 seconds between submissions

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  // ── Honeypot: bot trap ──────────────────────────────────────────────────────
  // Real users never see or fill this hidden field. Bots that blindly fill all
  // inputs will populate it, triggering a silent reject on submit.
  const [honeypot, setHoneypot] = useState("");

  // ── Prototype-Pollution-safe change handler ──────────────────────────────────
  // Only updates state if the field name is in the strict ALLOWED_FIELDS set.
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    if (!ALLOWED_FIELDS.has(name as keyof FormState)) return; // reject unknown keys
    setForm((prev) => ({ ...prev, [name as keyof FormState]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPhoneError(null);
    setEmailError(null);
    setRateLimitError(null);

    // ── Bot trap: silently reject if honeypot is filled ─────────────────────
    if (honeypot.length > 0) return;

    // ── Rate limiting ────────────────────────────────────────────────────────
    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      const remaining = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
      setRateLimitError(`Please wait ${remaining}s before submitting again.`);
      return;
    }

    // ── Phone validation ─────────────────────────────────────────────────────
    if (!form.phone || form.phone.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      return;
    }

    // ── Strict email validation ──────────────────────────────────────────────
    if (!EMAIL_REGEX.test(form.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setStatus("sending");
    lastSubmitTime = Date.now();

    try {
      const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE";

      // ── Sanitize every field before dispatch ─────────────────────────────
      // Prevents injection of HTML, script tags, newline-based header injection,
      // and log-forging payloads from reaching the Google Apps Script endpoint.
      const safe = {
        name: sanitize(form.name),
        company: sanitize(form.company),
        phone: sanitize(form.phone),
        email: sanitize(form.email),
        subject: sanitize(form.subject),
        message: sanitize(form.message),
      };

      // URLSearchParams ensures values are percent-encoded (no raw injection).
      // Dual-key mapping supports both lowercase and capitalized Google Sheet headers.
      const params = new URLSearchParams();
      (Object.entries(safe) as [string, string][]).forEach(([key, val]) => {
        params.append(key, val);
        params.append(key.charAt(0).toUpperCase() + key.slice(1), val);
      });

      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: params,
      });

      setStatus("sent");
      setForm(initialForm);
    } catch (error) {
      console.error("[ContactForm] Submit error:", error);
      setStatus("error");
    }
  }

  // ── Scroll-triggered animations ────────────────────────────────────────────
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Shared animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
  };
  const slideLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };
  const slideRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="w-full bg-white">
      <style dangerouslySetInnerHTML={{
        __html: `
        .split {
          max-width: 1100px;
          margin: 0 auto;
          padding: 70px 32px 90px;
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 32px;
        }
        @media (max-width: 780px) {
          .split {
            grid-template-columns: 1fr;
          }
        }

        .info-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          min-height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
        }
        .info-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(170deg, rgba(0,6,19,0.82) 0%, rgba(0,31,63,0.66) 100%);
        }

        .glass-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(233,195,73,0.35);
          backdrop-filter: blur(16px) saturate(150%);
          -webkit-backdrop-filter: blur(16px) saturate(150%);
          border-radius: 16px;
          padding: 38px 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
        .glass-inner .block-item {
          margin-bottom: 30px;
        }
        .glass-inner .block-item:last-child {
          margin-bottom: 0;
        }
        .glass-inner h3 {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-weight: 500;
          font-size: 19px;
          color: #fed65b;
          margin: 0 0 10px;
        }
        .glass-inner p {
          font-size: 13.5px;
          color: rgba(255,248,239,0.85);
          line-height: 1.7;
          margin: 0;
        }

        .social-row {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 6px;
        }
        .social-row a {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(233,195,73,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background .25s cubic-bezier(0.22,1,0.36,1), transform .25s cubic-bezier(0.22,1,0.36,1);
        }
        .social-row a:hover {
          background: rgba(233,195,73,0.18);
          transform: translateY(-2px);
        }
        .social-row svg {
          width: 16px;
          height: 16px;
          stroke: #fed65b;
        }

        .form-side h2 {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-style: italic;
          font-weight: 500;
          font-size: 32px;
          color: #000613;
          margin: 0 0 16px;
        }
        .form-side > p {
          font-size: 14px;
          color: #43474e;
          line-height: 1.75;
          margin: 0 0 32px;
          max-width: 520px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-bottom: 22px;
        }
        @media (max-width: 520px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
        .form-side label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #1e1b13;
          margin-bottom: 8px;
          text-align: left;
        }
        .form-side label .req {
          color: #74777f;
          font-weight: 400;
        }
        .form-side input, .form-side textarea {
          width: 100%;
          border: 1px solid #c4c6cf;
          border-radius: 6px;
          padding: 12px 14px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #1e1b13;
          background: #ffffff;
          outline: none;
          transition: border-color .25s cubic-bezier(0.22,1,0.36,1), box-shadow .25s cubic-bezier(0.22,1,0.36,1);
        }
        .form-side input:focus, .form-side textarea:focus {
          border-color: #e9c349;
          box-shadow: 0 0 0 3px rgba(233,195,73,0.25);
        }
        .form-side textarea {
          min-height: 130px;
          resize: vertical;
        }
        .form-side .full {
          margin-bottom: 22px;
        }
        .submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background-color: #000613;
          color: #fed65b;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 15px 44px;
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          transition: background-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }
        .submit-btn:hover:not(:disabled) {
          background-color: #001f3f;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
        }
        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .submit-btn:disabled {
          background-color: #c4c6cf;
          color: #74777f;
          cursor: not-allowed;
        }
      ` }} />

      <div ref={sectionRef} className="split">

        {/* Left: Info Card with Background Image and Glassmorphism */}
        <motion.div
          className="info-card shadow-sm"
          variants={slideLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Inner Glass Card */}
          <div className="glass-inner">

            <motion.div className="block-item" variants={fadeUp} custom={0} initial="hidden" animate={isInView ? "visible" : "hidden"}>
              <h3>Location</h3>
              <p>
                10th Floor – 1003, Span Trade Centre
                <br />
                Paldi, Ahmedabad, Gujarat
              </p>
            </motion.div>

            <motion.div className="block-item" variants={fadeUp} custom={1} initial="hidden" animate={isInView ? "visible" : "hidden"}>
              <h3>Contact Info</h3>
              <p>
                advisors@sbsfinancials.in
                <br />
                +91 98765 43210
              </p>
            </motion.div>

            <motion.div className="block-item" variants={fadeUp} custom={2} initial="hidden" animate={isInView ? "visible" : "hidden"}>
              <h3>Follow Us</h3>
              <div className="social-row">
                {socialLinks.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* Right: Form Side with AnimatePresence success animation */}
        <motion.div
          className="form-side flex flex-col justify-center min-h-[460px]"
          variants={slideRight}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <AnimatePresence mode="wait">
            {status !== "sent" ? (
              <motion.div
                key="contact-form-side"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h2>Send a message.</h2>
                <p style={{ marginBottom: "28px" }}>
                  Use the button above to book your free consultation. For other inquiries, fill out the form below and we&apos;ll get back to you within 48 hours.
                </p>

                <form onSubmit={handleSubmit} style={{ marginTop: "8px" }}>
                  <div className="form-row">
                    <div>
                      <label>Name <span className="req">(required)</span></label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        maxLength={40}
                        onChange={(e) => {
                          const raw = e.target.value;
                          const cleaned = raw.replace(/[^a-zA-Z\s]/g, "").slice(0, 40);
                          setForm((prev) => ({ ...prev, name: cleaned }));
                          if (raw.replace(/[^a-zA-Z\s]/g, "") !== raw) {
                            setNameError("Only letters and spaces are allowed");
                          } else {
                            setNameError(null);
                          }
                        }}
                        placeholder="e.g. Urwal Shah"
                        required
                      />
                      <p style={{ fontSize: "11px", color: form.name.length >= 40 ? "#e53e3e" : "#888", margin: "3px 0 0", textAlign: "right" }}>{form.name.length}/40</p>
                      {nameError && (
                        <p className="mt-1 text-red-500 text-xs font-medium" style={{ margin: "2px 0 0" }}>{nameError}</p>
                      )}
                    </div>
                    <div>
                      <label>Company</label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        maxLength={40}
                        onChange={handleChange}
                        placeholder="e.g. SBS Financials Pvt. Ltd."
                      />
                      <p style={{ fontSize: "11px", color: form.company.length >= 40 ? "#e53e3e" : "#888", margin: "3px 0 0", textAlign: "right" }}>{form.company.length}/40</p>
                    </div>
                  </div>

                  <div className="form-row">
                    <div>
                      <label>Phone <span className="req">(required)</span></label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                          setForm((prev) => ({ ...prev, phone: val }));
                          if (val.length === 10) setPhoneError(null);
                        }}
                        placeholder="e.g. 98765 43210"
                        required
                      />
                      {phoneError && (
                        <p className="mt-1 text-red-500 text-xs font-medium" style={{ margin: "4px 0 0" }}>{phoneError}</p>
                      )}
                    </div>
                    <div>
                      <label>Email <span className="req">(required)</span></label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="e.g. you@example.com"
                        autoComplete="email"
                        required
                      />
                      {emailError && (
                        <p className="mt-1 text-red-500 text-xs font-medium" style={{ margin: "4px 0 0" }}>{emailError}</p>
                      )}
                    </div>
                  </div>

                  <div className="full">
                    <label>Subject <span className="req">(required)</span></label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      maxLength={40}
                      onChange={handleChange}
                      placeholder="e.g. Investment Planning Inquiry"
                      required
                    />
                    <p style={{ fontSize: "11px", color: form.subject.length >= 40 ? "#e53e3e" : "#888", margin: "3px 0 0", textAlign: "right" }}>{form.subject.length}/40</p>
                  </div>

                  <div className="full">
                    <label>Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      maxLength={100}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                    />
                    <p style={{ fontSize: "11px", color: form.message.length >= 100 ? "#e53e3e" : "#888", margin: "3px 0 0", textAlign: "right" }}>{form.message.length}/100</p>
                  </div>

                  {/* ── Honeypot bot trap (visually hidden, never filled by real users) ── */}
                  <input
                    type="text"
                    name="_trap"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
                    autoComplete="off"
                  />

                  {/* ── Rate limit error ── */}
                  {rateLimitError && (
                    <p className="text-red-500 text-xs font-medium" style={{ marginBottom: "8px" }}>{rateLimitError}</p>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="submit-btn"
                    >
                      <AnimatePresence mode="wait">
                        {(status === "idle" || status === "error") && (
                          <motion.div
                            key="send"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center gap-2.5"
                          >
                            {status === "error" ? "TRY AGAIN" : "SEND MESSAGE"}
                            <Send className="w-4 h-4 text-[#fed65b] stroke-[2]" />
                          </motion.div>
                        )}
                        {status === "sending" && (
                          <motion.div
                            key="sending"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center gap-2.5"
                          >
                            SENDING...
                            <Loader2 className="animate-spin w-4 h-4" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col items-center justify-center text-center py-10"
              >
                <div className="w-16 h-16 rounded-full bg-[#fed65b]/10 border border-[#fed65b]/20 flex items-center justify-center mb-6">
                  <Send className="w-7 h-7 text-[#fed65b] stroke-[1.5]" />
                </div>
                <h2 className={`${playfair.className} text-[32px] font-medium text-[#000613] mb-3`} style={{ fontStyle: "normal" }}>
                  Thank You
                </h2>
                <p className="text-gray-600 text-sm max-w-sm leading-relaxed mb-6">
                  We&apos;ll get back to you within 48 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-xs font-semibold tracking-wider text-[#000613] hover:text-[#001f3f] underline uppercase cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4l16 16M20 4 4 20" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
    </svg>
  );
}