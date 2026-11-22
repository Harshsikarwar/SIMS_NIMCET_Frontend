"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import "./NimcetOfferings.css";

type IconName =
  | "offline"
  | "online"
  | "book"
  | "video"
  | "doubt"
  | "weekly"
  | "review"
  | "unit"
  | "full";

interface Offering {
  title: string;
  description?: string;
  icon: IconName;
  color: string;
  /** Large faint maths symbol in the card corner */
  symbol?: string;
  /** One-line C snippet shown on the test cards */
  code?: string;
}

const offerings: Offering[] = [
  {
    title: "Offline Classes",
    icon: "offline",
    color: "blue",
    symbol: "∑",
  },
  {
    title: "Online Classes",
    icon: "online",
    color: "pink",
    symbol: "π",
  },
  {
    title: "Topic-Wise Complete Study Materials",
    description: "PYQs with detailed solutions",
    icon: "book",
    color: "green",
    symbol: "∫",
  },
  {
    title: "Recorded Classes Available",
    icon: "video",
    color: "purple",
    symbol: "θ",
  },
  {
    title: "Doubt Classes",
    icon: "doubt",
    color: "orange",
    symbol: "√",
  },
  {
    title: "Weekly 6-Days Classes",
    description: "Consistent learning and practice",
    icon: "weekly",
    color: "pink",
    symbol: "∞",
  },
];

const tests: Offering[] = [
  {
    title: "WRT",
    description: "Weekly Review Test",
    icon: "review",
    color: "blue",
    code: "week++; review();",
  },
  {
    title: "UWT",
    description: "Unit Wise Test",
    icon: "unit",
    color: "orange",
    code: "test(unit[i]);",
  },
  {
    title: "FLT",
    description: "Full Length Test",
    icon: "full",
    color: "pink",
    code: "return score;",
  },
];

/* Decorative background symbols. Fixed values (no Math.random) so the server
   and the browser render identical markup and Next.js has no hydration mismatch. */
const floaters: Array<{ s: string; x: number; y: number; size: number; delay: number; code?: boolean }> = [
  { s: "∑", x: 4, y: 5, size: 38, delay: 0 },
  { s: "#include", x: 30, y: 3, size: 15, delay: 1.4, code: true },
  { s: "π", x: 58, y: 7, size: 34, delay: 2.2 },
  { s: "int main()", x: 80, y: 4, size: 15, delay: 0.7, code: true },
  { s: "∫", x: 94, y: 16, size: 40, delay: 1.8 },
  { s: "{ }", x: 3, y: 28, size: 24, delay: 2.6, code: true },
  { s: "√x", x: 92, y: 36, size: 30, delay: 0.5 },
  { s: "printf()", x: 6, y: 52, size: 15, delay: 1.1, code: true },
  { s: "θ", x: 95, y: 55, size: 34, delay: 2.0 },
  { s: "i++", x: 3, y: 72, size: 17, delay: 0.3, code: true },
  { s: "∞", x: 90, y: 72, size: 38, delay: 1.6 },
  { s: "Δ", x: 12, y: 90, size: 32, delay: 2.4 },
  { s: "&&", x: 38, y: 93, size: 18, delay: 0.9, code: true },
  { s: "x²", x: 62, y: 91, size: 30, delay: 1.3 },
  { s: "return 0;", x: 82, y: 94, size: 14, delay: 2.8, code: true },
];

/* Scrolling band of formulas and C statements (decorative). */
const tickerItems = [
  "∑ n = n(n+1)/2",
  'printf("NIT");',
  "a² + b² = c²",
  "for (i = 0; i < n; i++)",
  "∫ x dx = x²/2",
  "if (score > cutoff)",
  "√(a² + b²)",
  "while (!ready) prepare();",
  "sin²θ + cos²θ = 1",
  "int rank = 1;",
];

const iconPaths: Record<IconName, string[]> = {
  offline: [
    "M3 4h18v12H3z",
    "M8 20h8",
    "M12 16v4",
    "M7 9h3M7 12h3",
    "M15 9h3M15 12h3",
  ],
  online: [
    "M3 5h18v12H3z",
    "M8 21h8",
    "M12 17v4",
    "M8 10h8",
    "M8 13h5",
  ],
  book: [
    "M12 7c-2-2-5-2-9-1v14c4-1 7-1 9 1",
    "M12 7c2-2 5-2 9-1v14c-4-1-7-1-9 1",
    "M12 7v14",
  ],
  video: [
    "M4 5h16v14H4z",
    "m10 9 5 3-5 3z",
  ],
  doubt: [
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
    "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
    "M20 8v6",
    "M20 18h.01",
  ],
  weekly: [
    "M4 4h16v17H4z",
    "M8 8h8M8 12h8M8 16h5",
    "m15 18 2 2 4-5",
  ],
  review: [
    "M6 3h12v18H6z",
    "M9 8h6M9 12h6M9 16h4",
    "M9 3v-1h6v1",
  ],
  unit: [
    "M6 3h12v18H6z",
    "M9 8h6M9 12h6M9 16h6",
  ],
  full: [
    "M4 20V11h4v9",
    "M10 20V5h4v15",
    "M16 20V9h4v11",
    "M2 20h20",
  ],
};

function OfferingIcon({ name }: { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="offering-icon-svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name].map((path, index) => (
        <path key={index} d={path} />
      ))}
    </svg>
  );
}

interface NimcetOfferingsProps {
  /** Where the enquiry button goes. Change this to your real enquiry route. */
  enquiryHref?: string;
}

export default function NimcetOfferings({
  enquiryHref = "/enquiry",
}: NimcetOfferingsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  /* Scroll Reveal Animation (repeats every time you scroll in/out) */
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (!("IntersectionObserver" in window)) return;

    const targets = section.querySelectorAll<HTMLElement>("[data-reveal]");

    // Content stays visible unless JS is ready to animate it
    section.classList.add("offerings-js-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Add when entering the screen, remove when leaving,
          // so the animation plays again on every scroll up/down.
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="nimcet-offerings" id="offerings">
      {/* Decorative maths + C layer (behind the content) */}
      <div className="offerings-bg" aria-hidden="true">
        {floaters.map((f) => (
          <span
            key={f.s}
            className={f.code ? "is-code" : undefined}
            style={
              {
                left: `${f.x}%`,
                top: `${f.y}%`,
                fontSize: `${f.size}px`,
                animationDelay: `${f.delay}s`,
              } as CSSProperties
            }
          >
            {f.s}
          </span>
        ))}
      </div>

      <div className="offerings-container">
        {/* Heading */}
        <div className="reveal-cell" data-reveal>
          <div className="reveal-item">
            <div className="offerings-heading">
              <span className="offerings-eyebrow">
                NIMCET 2027 PREPARATION
              </span>

              <h2>
                Everything You Need to
                <span> Crack NIMCET</span>
              </h2>

              <p>
                A complete preparation ecosystem with expert guidance,
                structured learning resources and exam-focused practice.
              </p>
            </div>
          </div>
        </div>

        {/* Batch Highlight */}
        <div className="reveal-cell" data-reveal>
          <div className="reveal-item">
            <div className="offerings-highlight">
              <span className="highlight-symbol" aria-hidden="true">
                ∑
              </span>

              <div className="offerings-highlight-content">
                <span className="highlight-label">NEW BATCH</span>

                <h3>Coming Soon...</h3>

                <p>Start your journey towards NIT with SIMS Raipur.</p>

                <code className="highlight-code" aria-hidden="true">
                  while (!ready) prepare();
                </code>
              </div>

              <div className="demo-highlight">
                <span className="demo-number">3</span>

                <div className="demo-highlight-copy">
                  <strong>Days</strong>
                  <span>Demo Classes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Offerings */}
        <div className="offerings-grid">
          {offerings.map((item, index) => (
            <div
              className="reveal-cell offering-cell"
              key={item.title}
              data-reveal
              style={
                {
                  "--reveal-delay": `${(index % 3) * 120}ms`,
                } as CSSProperties
              }
            >
              <div className="reveal-item reveal-fill">
                <article className="offering-card">
                  {item.symbol && (
                    <span className="offering-symbol" aria-hidden="true">
                      {item.symbol}
                    </span>
                  )}

                  <div className={`offering-icon ${item.color}`}>
                    <OfferingIcon name={item.icon} />
                  </div>

                  <div className="offering-content">
                    <h3>{item.title}</h3>

                    {item.description && <p>{item.description}</p>}
                  </div>

                  <span className="offering-arrow" aria-hidden="true">
                    ↗
                  </span>
                </article>
              </div>
            </div>
          ))}
        </div>

        {/* Formula + C ticker */}
        <div className="formula-ticker" aria-hidden="true">
          <div className="formula-track">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        </div>

        {/* Test Series */}
        <div className="tests-section">
          <div className="reveal-cell" data-reveal>
            <div className="reveal-item">
              <div className="tests-heading">
                <span>TEST SERIES</span>

                <h3>Practice. Evaluate. Improve.</h3>

                <p>Track your preparation with our structured test system.</p>
              </div>
            </div>
          </div>

          <div className="tests-grid">
            {tests.map((test, index) => (
              <div
                className="reveal-cell test-cell"
                key={test.title}
                data-reveal
                style={
                  {
                    "--reveal-delay": `${index * 150}ms`,
                  } as CSSProperties
                }
              >
                <div className="reveal-item reveal-fill">
                  <article className="test-card">
                    <div className={`offering-icon ${test.color}`}>
                      <OfferingIcon name={test.icon} />
                    </div>

                    <div className="test-content">
                      <h4>{test.title}</h4>
                      <p>{test.description}</p>
                      {test.code && (
                        <code className="test-code" aria-hidden="true">
                          {test.code}
                        </code>
                      )}
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enquiry */}
        <div className="reveal-cell" data-reveal>
          <div className="reveal-item">
            <div className="enquiry-section">
              <span className="enquiry-symbol" aria-hidden="true">
                π
              </span>

              <div className="enquiry-copy">
                <h3>Have questions about the NIMCET batch?</h3>
                <p>
                  Tell us what you need and our team will get back to you about
                  the new batch, demo classes and the test series.
                </p>
                <code className="enquiry-code" aria-hidden="true">
                  enquire(&quot;NIMCET&quot;);
                </code>
              </div>

              <Link href={enquiryHref} className="enquiry-button">
                Enquire now
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}