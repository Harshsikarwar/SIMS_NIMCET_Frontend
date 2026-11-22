"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import "./NimcetOverview.css";

const benefits = [
  {
    number: "01",
    title: "NIT Admission",
    description:
      "Get an opportunity to pursue MCA at participating National Institutes of Technology.",
    symbol: "∑",
    code: "admit(nit);",
  },
  {
    number: "02",
    title: "National Level Exam",
    description:
      "Compete with candidates from across India through a common entrance examination.",
    symbol: "π",
    code: "for (i = 0; i < n; i++)",
  },
  {
    number: "03",
    title: "Career Opportunities",
    description:
      "Get an opportunity to pursue MCA at participating National Institutes of Technology.",
    symbol: "∫",
    code: "return career;",
  },
  {
    number: "04",
    title: "Recognised Institutes",
    description:
      "Get an opportunity to pursue MCA at participating National Institutes of Technology.",
    symbol: "√",
    code: "if (nit) ok++;",
  },
];

/* Decorative background symbols. Fixed values (no Math.random) so the server
   and browser render the same markup and Next.js never reports a hydration mismatch. */
const floaters: Array<{ s: string; x: number; y: number; size: number; delay: number; code?: boolean }> = [
  { s: "π", x: 3, y: 10, size: 40, delay: 0 },
  { s: "#include", x: 24, y: 4, size: 15, delay: 1.2, code: true },
  { s: "∑", x: 47, y: 12, size: 34, delay: 2.1 },
  { s: "{ }", x: 71, y: 5, size: 22, delay: 0.6, code: true },
  { s: "∫", x: 93, y: 14, size: 42, delay: 1.7 },
  { s: "printf()", x: 7, y: 38, size: 15, delay: 2.6, code: true },
  { s: "√x", x: 90, y: 40, size: 30, delay: 0.3 },
  { s: "i++", x: 55, y: 34, size: 16, delay: 1.5, code: true },
  { s: "θ", x: 4, y: 62, size: 32, delay: 2.2 },
  { s: "->", x: 30, y: 58, size: 18, delay: 0.9, code: true },
  { s: "∞", x: 78, y: 60, size: 36, delay: 1.9 },
  { s: "0x1F", x: 95, y: 74, size: 15, delay: 0.4, code: true },
  { s: "Δ", x: 14, y: 84, size: 34, delay: 1.1 },
  { s: "&&", x: 42, y: 88, size: 18, delay: 2.4, code: true },
  { s: "x²", x: 66, y: 86, size: 30, delay: 0.7 },
  { s: "return 0;", x: 84, y: 92, size: 14, delay: 1.8, code: true },
];

/* Small chips that float around the hero image. */
const chips: Array<{ s: string; className: string; code?: boolean }> = [
  { s: "π", className: "chip-a" },
  { s: "∑", className: "chip-b" },
  { s: "{ }", className: "chip-c", code: true },
  { s: "√x", className: "chip-d" },
  { s: "int", className: "chip-e", code: true },
];

export default function NimcetOverview() {
  const overviewImage = "/images/nimcet_component_image.png";

  const benefitsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = benefitsRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");

    // Fallback for browsers without IntersectionObserver
    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Reveal when it enters the screen, reset when it leaves,
          // so the animation plays again on every scroll up/down.
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="nimcet-overview">
      {/* Decorative maths + C layer (behind the content) */}
      <div className="nimcet-overview-bg" aria-hidden="true">
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

      <div className="nimcet-overview-container">
        {/* Upper Section */}
        <div className="nimcet-overview-main">
          {/* Left Content */}
          <div className="nimcet-overview-content">
            <h1>What is NIMCET?</h1>

            <p>
              NIMCET (NIT MCA Common Entrance Test) is a national-level entrance
              examination for admission to the Master of Computer Applications
              (MCA) programme offered by participating National Institutes of
              Technology. It provides aspiring students with an opportunity to
              pursue postgraduate education in computer applications at
              participating NITs through a common admission process.
            </p>

            {/* C program + formula strip */}
            <div className="nimcet-code" aria-hidden="true">
              <div className="nimcet-code-bar">
                <i />
                <i />
                <i />
                <span>main.c</span>
              </div>
              <div className="nimcet-code-body">
                <div style={{ "--n": 0 } as CSSProperties}>
                  <b>int</b> main(<b>void</b>) {"{"}
                </div>
                <div style={{ "--n": 1 } as CSSProperties}>
                  {"  "}printf(<em>&quot;Hello, NIT!&quot;</em>);
                </div>
                <div style={{ "--n": 2 } as CSSProperties}>
                  {"  "}
                  <b>return</b> 0; <u>{"/* ∑ k = n(n+1)/2 */"}</u>
                </div>
                <div style={{ "--n": 3 } as CSSProperties}>
                  {"}"}
                  <span className="nimcet-caret" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="nimcet-overview-image">
            <Image
              src={overviewImage}
              alt="Books and graduation cap representing NIMCET preparation"
              width={650}
              height={480}
              sizes="(max-width: 640px) 90vw, (max-width: 1000px) 40vw, 32vw"
              className="nimcet-overview-img"
            />

            {chips.map((c) => (
              <span
                key={c.s}
                className={`nimcet-chip ${c.className}${c.code ? " is-code" : ""}`}
                aria-hidden="true"
              >
                {c.s}
              </span>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div ref={benefitsRef} className="nimcet-overview-benefits">
          <div className="nimcet-benefits-heading-wrap" data-reveal>
            <h2 className="nimcet-benefits-heading">
              WHY NIMCET?
              <span className="nimcet-benefits-comment" aria-hidden="true">
                {"/* 4 reasons */"}
              </span>
            </h2>
          </div>

          <div className="nimcet-benefits-grid">
            {benefits.map((benefit, index) => (
              <div
                className="nimcet-benefit-cell"
                key={benefit.number}
                data-reveal
                style={
                  {
                    // small stagger so cards in the same row don't pop together
                    "--reveal-delay": `${(index % 4) * 100}ms`,
                  } as CSSProperties
                }
              >
                <div className="nimcet-benefit-reveal">
                  <article className="nimcet-benefit-card">
                    <span className="nimcet-benefit-symbol" aria-hidden="true">
                      {benefit.symbol}
                    </span>

                    <div className="nimcet-benefit-meta">
                      <span className="nimcet-benefit-number">
                        {benefit.number}
                      </span>
                    </div>

                    <h3>{benefit.title}</h3>

                    <p>{benefit.description}</p>

                    <code className="nimcet-benefit-code" aria-hidden="true">
                      {benefit.code}
                    </code>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <footer className="nimcet-overview-footer">
          <p className="nimcet-footer-intro">For more information visit</p>

          <div className="nimcet-overview-links">
            <a
              href="https://nimcet.admissions.nic.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="nimcet-footer-link"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M10 13.5a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1.7 1.7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M14 10.5a5 5 0 0 0-7.1 0l-3 3a5 5 0 0 0 7.1 7.1l1.7-1.7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              Official site
            </a>

            <Link href="/nimcet-guide" className="nimcet-footer-link">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M10 13.5a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1.7 1.7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M14 10.5a5 5 0 0 0-7.1 0l-3 3a5 5 0 0 0 7.1 7.1l1.7-1.7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              Nimcet Guide
            </Link>
          </div>
        </footer>
      </div>
    </section>
  );
}