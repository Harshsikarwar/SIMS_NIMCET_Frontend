"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import "./TestSeriesCatalog.css";

type IconName = "cbt" | "pdf" | "combo" | "pyq";

export interface TestSeriesItem {
  slug: string;
  title: string;
  /** Short label shown in the top-left tag */
  tag: string;
  description: string;
  features: string[];
  icon: IconName;
  /** Optional. When set, the price is shown above the button. */
  price?: string;
  /** Optional struck-through price */
  oldPrice?: string;
  /** Faint maths symbol in the card corner */
  symbol: string;
  /** One-line C snippet shown on the card */
  code: string;
  /** Dark card that stands out from the other three */
  featured?: boolean;
  href: string;
  cta?: string;
}

/* Replace the text, prices and links below with your real details. */
const defaultItems: TestSeriesItem[] = [
  {
    slug: "cbt",
    title: "CBT Test Series",
    tag: "Online",
    description:
      "Full-length mock tests on an exam-style computer based interface, with instant results.",
    features: [
      "Exam-style CBT interface",
      "Instant score and analysis",
      "Detailed solutions",
    ],
    icon: "cbt",
    symbol: "∑",
    code: "mode = CBT;",
    href: "/test-series/cbt",
  },
  {
    slug: "pdf",
    title: "PDF Test Series",
    tag: "Offline",
    description:
      "Print-ready test papers you can solve on paper, at your own pace, anywhere.",
    features: [
      "Print-ready papers",
      "Answer key with solutions",
      "Study without internet",
    ],
    icon: "pdf",
    symbol: "π",
    code: "export(pdf);",
    href: "/test-series/pdf",
  },
  {
    slug: "combo",
    title: "CBT + PDF Combo",
    tag: "Both formats",
    description:
      "Practise on screen and on paper with one plan that includes both test series.",
    features: [
      "Everything in CBT Test Series",
      "Everything in PDF Test Series",
      "One plan, both formats",
    ],
    icon: "combo",
    symbol: "∫",
    code: "bundle(cbt, pdf);",
    featured: true,
    href: "/test-series/combo",
  },
  {
    slug: "pyq",
    title: "PYQ Solutions",
    tag: "Previous years",
    description:
      "Previous year questions with detailed, step-by-step solutions to learn the exam pattern.",
    features: [
      "Topic-wise PYQs",
      "Detailed solutions",
      "Understand the exam pattern",
    ],
    icon: "pyq",
    symbol: "√",
    code: "solve(pyq);",
    href: "/test-series/pyq",
  },
];

/* Decorative background symbols. Fixed values (no Math.random) so the server
   and the browser render identical markup and Next.js has no hydration mismatch. */
const floaters: Array<{ s: string; x: number; y: number; size: number; delay: number; code?: boolean }> = [
  { s: "π", x: 3, y: 6, size: 38, delay: 0 },
  { s: "#include", x: 26, y: 3, size: 15, delay: 1.3, code: true },
  { s: "∑", x: 52, y: 8, size: 34, delay: 2.1 },
  { s: "{ }", x: 76, y: 4, size: 24, delay: 0.6, code: true },
  { s: "∫", x: 94, y: 14, size: 40, delay: 1.7 },
  { s: "printf()", x: 4, y: 46, size: 15, delay: 2.5, code: true },
  { s: "θ", x: 95, y: 48, size: 34, delay: 0.8 },
  { s: "i++", x: 3, y: 74, size: 17, delay: 1.5, code: true },
  { s: "√x", x: 91, y: 76, size: 30, delay: 2.3 },
  { s: "Δ", x: 20, y: 92, size: 32, delay: 0.4 },
  { s: "&&", x: 46, y: 94, size: 18, delay: 1.9, code: true },
  { s: "x²", x: 68, y: 92, size: 30, delay: 1.1 },
  { s: "return 0;", x: 84, y: 95, size: 14, delay: 2.7, code: true },
];

const iconPaths: Record<IconName, string[]> = {
  cbt: ["M3 5h18v12H3z", "M8 21h8", "M12 17v4", "M8 10h8", "M8 13h5"],
  pdf: ["M6 3h12v18H6z", "M9 8h6M9 12h6M9 16h4"],
  combo: ["M4 8h12v12H4z", "M8 4h12v12h-4", "m7 14 2 2 4-4"],
  pyq: [
    "M12 7c-2-2-5-2-9-1v14c4-1 7-1 9 1",
    "M12 7c2-2 5-2 9-1v14c-4-1-7-1-9 1",
    "M12 7v14",
  ],
};

function CatalogIcon({ name }: { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="catalog-icon-svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

interface NimcetTestSeriesCatalogProps {
  items?: TestSeriesItem[];
}

export default function TestSeriesCatalog({
  items = defaultItems,
}: NimcetTestSeriesCatalogProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  /* Scroll reveal (repeats every time you scroll in/out) */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const targets = section.querySelectorAll<HTMLElement>("[data-reveal]");

    // Content stays visible unless JS is ready to animate it
    section.classList.add("catalog-js-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="nimcet-catalog" id="test-series">
      {/* Decorative maths + C layer (behind the content) */}
      <div className="catalog-bg" aria-hidden="true">
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

      <div className="catalog-container">
        {/* Heading */}
        <div className="catalog-reveal-cell" data-reveal>
          <div className="catalog-reveal-item">
            <div className="catalog-heading">
              <span className="catalog-eyebrow">NIMCET TEST SERIES</span>

              <h2>
                Choose the Series That
                <span> Fits Your Preparation</span>
              </h2>

              <p>
                Practise on screen, on paper, or both. Every series follows the
                NIMCET pattern and comes with detailed solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Catalog grid */}
        <div className="catalog-grid">
          {items.map((item, index) => (
            <div
              className="catalog-reveal-cell catalog-cell"
              key={item.slug}
              data-reveal
              style={
                {
                  "--reveal-delay": `${(index % 4) * 110}ms`,
                } as CSSProperties
              }
            >
              <div className="catalog-reveal-item catalog-fill">
                <article
                  className={`catalog-card${item.featured ? " is-featured" : ""}`}
                >
                  <span className="catalog-symbol" aria-hidden="true">
                    {item.symbol}
                  </span>

                  <div className="catalog-card-top">
                    <div className="catalog-icon">
                      <CatalogIcon name={item.icon} />
                    </div>
                    <span className="catalog-tag">{item.tag}</span>
                  </div>

                  <h3>{item.title}</h3>

                  <p className="catalog-desc">{item.description}</p>

                  <ul className="catalog-features">
                    {item.features.map((feature) => (
                      <li key={feature}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="m5 12.5 4.5 4.5L19 7.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <code className="catalog-code" aria-hidden="true">
                    {item.code}
                  </code>

                  <div className="catalog-card-bottom">
                    {item.price && (
                      <div className="catalog-price">
                        <strong>{item.price}</strong>
                        {item.oldPrice && <s>{item.oldPrice}</s>}
                      </div>
                    )}

                    <Link href={item.href} className="catalog-button">
                      {item.cta ?? "View details"}
                      <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </article>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}