"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, RefObject, TouchEvent } from "react";
import "./HeroBanner.css";

export interface NimcetHeroBannerLinks {
  cbt?: string;
  pdf?: string;
  waitlist?: string;
}

export interface NimcetHeroBannerProps {
  links?: NimcetHeroBannerLinks;
  /** Time each slide stays on screen, in milliseconds. */
  autoplayMs?: number;
  /** Stretch the banner edge to edge of the browser window (default true). */
  fullBleed?: boolean;
}

const SLIDE_COUNT = 2;

/** Sets a CSS custom property inline (animation delay, index, angle...). */
const vars = (v: Record<string, string | number>) => v as CSSProperties;

/* ------------------------------------------------------------------ */
/* Background canvas: grid, moving sine/cosine waves, and floating     */
/* mathematics symbols mixed with C programming tokens.                */
/* ------------------------------------------------------------------ */

const MATH_SYMBOLS = ["π", "∑", "√", "∫", "∞", "θ", "Δ", "±", "≈", "x²", "sin", "cos", "λ", "∂", "e"];
const C_TOKENS = [
  "#include", "int main()", "printf()", "for(;;)", "{ }", "->", "*ptr", "&x", "i++",
  "&&", "0x1F", "void", "while", "%d", "return 0;", "[ ]", "sizeof", "/* */",
];

interface Bit {
  x: number;
  y: number;
  size: number;
  text: string;
  speed: number;
  phase: number;
  isCode: boolean;
}

function useMathCanvas(
  heroRef: RefObject<HTMLElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  still: boolean,
) {
  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!hero || !canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let bits: Bit[] = [];
    let raf = 0;
    let resizeTimer = 0;

    const build = () => {
      const r = hero.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 28000) + 10;
      bits = Array.from({ length: count }, (_, k) => {
        const isCode = k % 3 === 2; // every third item is a C token
        const pool = isCode ? C_TOKENS : MATH_SYMBOLS;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          size: isCode ? 12 + Math.random() * 6 : 14 + Math.random() * 26,
          text: pool[Math.floor(k / 3) % pool.length],
          speed: 0.12 + Math.random() * 0.3,
          phase: Math.random() * 6.28,
          isCode,
        };
      });
    };

    const waves: Array<[string, number, number, number, number, number]> = [
      ["rgba(166,64,0,.4)", 0, 0.78, 0.06, 0.012, 1.1],
      ["rgba(23,23,23,.22)", 1.6, 0.82, 0.05, 0.017, -0.8],
    ];

    const draw = (ms: number) => {
      const t = ms / 1000;
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(23,23,23,.06)";
      ctx.lineWidth = 1;
      for (let gx = 0; gx < w; gx += 48) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += 48) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }

      for (const [color, ph, base, k, amp, sp] of waves) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let px = 0; px <= w; px += 6) {
          const y =
            h * base +
            Math.sin(px * k * 0.5 + t * sp * 1.4 + ph) * h * amp * 3 +
            Math.cos(px * 0.004 - t * 0.5) * 10;
          if (px) ctx.lineTo(px, y);
          else ctx.moveTo(px, y);
        }
        ctx.stroke();
      }

      ctx.textAlign = "center";
      for (const b of bits) {
        const y = ((b.y - t * b.speed * 30 + h * 2) % (h + 60)) - 30;
        const alpha = 0.1 + 0.08 * Math.sin(t * 0.8 + b.phase);
        ctx.font = b.isCode
          ? `600 ${b.size}px ui-monospace, Menlo, Consolas, monospace`
          : `italic ${b.size}px Georgia, serif`;
        ctx.fillStyle = b.isCode ? `rgba(23,23,23,${alpha})` : `rgba(166,64,0,${alpha})`;
        ctx.fillText(b.text, b.x + Math.sin(t * 0.4 + b.phase) * 14, y);
      }
      if (!still) raf = requestAnimationFrame(draw);
    };

    build();
    raf = requestAnimationFrame(draw);

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        if (still) draw(0);
      }, 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [heroRef, canvasRef, still]);
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function HeroBanner({
  links = {},
  autoplayMs = 5000,
  fullBleed = true,
}: NimcetHeroBannerProps) {
  const { cbt = "#cbt", pdf = "#pdf", waitlist = "#waitlist" } = links;

  const heroRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const touchX = useRef<number | null>(null);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion(); // only used to keep the background still

  useMathCanvas(heroRef, canvasRef, reduced);

  const go = useCallback((delta: number) => {
    setIndex((i) => (i + delta + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  // Autoplay: moves to the next slide after `autoplayMs`. It restarts after every
  // manual change (arrows, dots, swipe) and only pauses while a control has keyboard focus.
  // It keeps running when the OS asks for reduced motion because slides only cross-fade.
  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => go(1), autoplayMs);
    return () => window.clearTimeout(id);
  }, [index, paused, autoplayMs, go]);

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const slideClass = (k: number) => `nh-slide${index === k ? " nh-active" : ""}`;

  return (
    <section
      ref={heroRef}
      className={`nh-hero${fullBleed ? " nh-bleed" : ""}${paused ? " nh-paused" : ""}`}
      style={vars({ "--nh-t": `${autoplayMs}ms` })}
      aria-roledescription="carousel"
      aria-label="NIMCET preparation offers"
      onFocus={(e) => {
        // pause only for keyboard users; a mouse click on an arrow must not freeze autoplay
        if (e.target.matches(":focus-visible")) setPaused(true);
      }}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <canvas ref={canvasRef} className="nh-canvas" aria-hidden="true" />

      <div className="nh-slides">
        {/* ---------------- Slide 1: test series ---------------- */}
        <article
          className={slideClass(0)}
          aria-roledescription="slide"
          aria-label="1 of 2"
          aria-hidden={index !== 0}
        >
          <div>
            <span className="nh-tag nh-r" style={vars({ "--d": ".1s" })}>
              <i /> NIMCET Test Series
            </span>
            <h1 className="nh-title">
              <span className="nh-ln" style={vars({ "--i": 0 })}>
                <span>Practice like the</span>
              </span>
              <span className="nh-ln" style={vars({ "--i": 1 })}>
                <span>
                  <em>real exam.</em> Score
                </span>
              </span>
              <span className="nh-ln" style={vars({ "--i": 2 })}>
                <span>like a topper.</span>
              </span>
            </h1>
            <p className="nh-sub nh-r" style={vars({ "--d": ".7s" })}>
              Take full-length CBT mock tests on an exam-style interface, or study offline with
              print-ready PDF test papers. Pick the one that fits you, or get both.
            </p>
            <div className="nh-btns nh-r" style={vars({ "--d": ".9s" })}>
              <a className="nh-btn nh-btn-p" href={cbt}>
                💻 Buy CBT Test Series
              </a>
              <a className="nh-btn nh-btn-s" href={pdf}>
                📄 Buy PDF Test Series
              </a>
            </div>
            <div className="nh-chips nh-r" style={vars({ "--d": "1.05s" })}>
              <span>Exam-style interface</span>
              <span>Detailed solutions</span>
              <span>Print-ready PDFs</span>
            </div>
          </div>

          <div className="nh-art" aria-hidden="true">
            {/* CBT screen */}
            <div className="nh-card nh-c1">
              <div className="nh-lbl">
                CBT Test <b>LIVE</b>
              </div>
              <svg viewBox="0 0 260 170">
                <rect width="260" height="170" rx="12" fill="#171717" />
                <rect x="12" y="12" width="236" height="22" rx="6" fill="#2f2f2f" />
                <circle cx="26" cy="23" r="5" fill="#ff9d4d" />
                <text x="40" y="27" fill="#ffe3c3" fontSize="11" fontFamily="sans-serif">
                  Q.12 Mathematics
                </text>
                <text x="200" y="27" fill="#ff9d4d" fontSize="11" fontFamily="monospace">
                  02:14:36
                </text>
                <text x="20" y="62" fill="#fff" fontSize="15" fontFamily="Georgia,serif">
                  ∫₀¹ x² dx = ?
                </text>
                <g fontFamily="sans-serif" fontSize="11">
                  <rect x="20" y="78" width="100" height="26" rx="7" fill="#2f2f2f" />
                  <text x="30" y="95" fill="#ffe3c3">A) 1/2</text>
                  <rect x="130" y="78" width="100" height="26" rx="7" fill="#a64000" />
                  <text x="140" y="95" fill="#fff4e6" fontWeight="700">B) 1/3</text>
                  <rect x="20" y="112" width="100" height="26" rx="7" fill="#2f2f2f" />
                  <text x="30" y="129" fill="#ffe3c3">C) 2/3</text>
                  <rect x="130" y="112" width="100" height="26" rx="7" fill="#2f2f2f" />
                  <text x="140" y="129" fill="#ffe3c3">D) 1</text>
                </g>
                <rect x="20" y="148" width="220" height="6" rx="3" fill="#2f2f2f" />
                <rect x="20" y="148" width="120" height="6" rx="3" fill="#ff9d4d" />
              </svg>
            </div>

            {/* C programming card */}
            <div className="nh-card nh-c3">
              <div className="nh-lbl">
                main.c <b className="nh-c">C</b>
              </div>
              <div className="nh-code">
                <div style={vars({ "--n": 0 })}><span className="k">#include</span> <span className="s">&lt;stdio.h&gt;</span></div>
                <div style={vars({ "--n": 1 })}><span className="k">int</span> main(<span className="k">void</span>) {"{"}</div>
                <div style={vars({ "--n": 2 })}>{"  "}<span className="k">int</span> n = 10, sum = 0;</div>
                <div style={vars({ "--n": 3 })}>{"  "}<span className="k">for</span> (<span className="k">int</span> i = 1; i &lt;= n; i++)</div>
                <div style={vars({ "--n": 4 })}>{"    "}sum += i; <span className="m">/* ∑ i */</span></div>
                <div style={vars({ "--n": 5 })}>{"  "}printf(<span className="s">"%d"</span>, sum);</div>
                <div style={vars({ "--n": 6 })}>{"  "}<span className="k">return</span> 0;<span className="nh-caret" /></div>
                <div style={vars({ "--n": 7 })}>{"}"}</div>
              </div>
            </div>

            {/* PDF paper */}
            <div className="nh-card nh-c2">
              <div className="nh-lbl">
                PDF Papers <b className="nh-red">PDF</b>
              </div>
              <svg viewBox="0 0 200 190">
                <rect width="200" height="190" rx="10" fill="#fffaf4" />
                <rect x="14" y="14" width="90" height="10" rx="4" fill="#a64000" />
                <g fill="#e6d2bd">
                  <rect x="14" y="36" width="170" height="6" rx="3" />
                  <rect x="14" y="50" width="150" height="6" rx="3" />
                  <rect x="14" y="64" width="165" height="6" rx="3" />
                </g>
                <rect x="14" y="84" width="172" height="40" rx="8" fill="#ffe3c3" />
                <text x="26" y="110" fontSize="15" fill="#171717" fontFamily="Georgia,serif">
                  Σ n = n(n+1)/2
                </text>
                <g fill="#e6d2bd">
                  <rect x="14" y="138" width="160" height="6" rx="3" />
                  <rect x="14" y="152" width="120" height="6" rx="3" />
                </g>
                <circle cx="168" cy="166" r="14" fill="#ff5d5d" />
                <path d="M162 166l6 6 8-12" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </article>

        {/* ---------------- Slide 2: coming soon ---------------- */}
        <article
          className={slideClass(1)}
          aria-roledescription="slide"
          aria-label="2 of 2"
          aria-hidden={index !== 1}
        >
          <div>
            <span className="nh-tag nh-r" style={vars({ "--d": ".1s" })}>
              <i /> Coming Soon
            </span>
            <h1 className="nh-title">
              <span className="nh-ln" style={vars({ "--i": 0 })}>
                <span>
                  New <em>NIMCET 2027</em>
                </span>
              </span>
              <span className="nh-ln" style={vars({ "--i": 1 })}>
                <span>batch is on the way.</span>
              </span>
            </h1>
            <p className="nh-sub nh-r" style={vars({ "--d": ".6s" })}>
              Structured classes, regular practice and doubt support for the next attempt. Join the
              waitlist to hear first when admissions open.
            </p>
            <div className="nh-btns nh-r" style={vars({ "--d": ".8s" })}>
              <a className="nh-btn nh-btn-p" href={waitlist}>
                🔔 Notify me
              </a>
              <a className="nh-btn nh-btn-s" href={cbt}>
                Start with the test series
              </a>
            </div>
            <div className="nh-chips nh-r" style={vars({ "--d": "1s" })}>
              <span>Maths</span>
              <span>Logical Reasoning</span>
              <span>Computer Awareness</span>
              <span>English</span>
            </div>
          </div>

          <div className="nh-art" aria-hidden="true">
            <div className="nh-ring">
              <svg viewBox="0 0 380 380">
                <circle cx="190" cy="190" r="171" fill="none" stroke="rgba(23,23,23,.3)" strokeDasharray="4 8" />
                <circle cx="190" cy="190" r="120" fill="none" stroke="rgba(166,64,0,.45)" />
                <path
                  d="M20 190 Q 62 110 105 190 T 190 190 T 275 190 T 360 190"
                  fill="none"
                  stroke="#a64000"
                  strokeWidth="2"
                  opacity=".7"
                />
                <line x1="190" y1="14" x2="190" y2="366" stroke="rgba(23,23,23,.14)" />
                <line x1="14" y1="190" x2="366" y2="190" stroke="rgba(23,23,23,.14)" />
              </svg>

              {/* outer orbit: mathematics symbols alternating with C operators */}
              <div className="nh-orb">
                {[
                  ["π", 0, false],
                  ["{ }", 45, true],
                  ["∑", 90, false],
                  ["*p", 135, true],
                  ["√", 180, false],
                  ["&&", 225, true],
                  ["∫", 270, false],
                  ["i++", 315, true],
                ].map(([s, a, c]) => (
                  <span key={String(s)} className={c ? "nh-cs" : undefined} style={vars({ "--a": `${a}deg` })}>
                    <i>{s}</i>
                  </span>
                ))}
              </div>

              {/* inner orbit */}
              <div className="nh-orb nh-b">
                {[
                  ["θ", 45, false],
                  ["0x", 105, true],
                  ["∞", 165, false],
                  ["[ ]", 225, true],
                  ["Δ", 285, false],
                  ["->", 345, true],
                ].map(([s, a, c]) => (
                  <span key={String(s)} className={c ? "nh-cs" : undefined} style={vars({ "--a": `${a}deg` })}>
                    <i>{s}</i>
                  </span>
                ))}
              </div>

              <div className="nh-core">
                <strong>2027</strong>
                <small>NIMCET</small>
                <code>return 2027;</code>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* ---------------- controls ---------------- */}
      <div className="nh-nav">
        <button type="button" className="nh-arrow" aria-label="Previous slide" onClick={() => go(-1)}>
          ‹
        </button>
        <div className="nh-dots">
          {Array.from({ length: SLIDE_COUNT }, (_, k) => (
            <button
              key={`${k}-${index === k ? "on" : "off"}`} /* new key restarts the progress animation */
              type="button"
              className={`nh-dot${index === k ? " nh-on" : ""}`}
              aria-label={`Go to slide ${k + 1}`}
              aria-current={index === k ? "true" : undefined}
              onClick={() => setIndex(k)}
            />
          ))}
        </div>
        <button type="button" className="nh-arrow" aria-label="Next slide" onClick={() => go(1)}>
          ›
        </button>
      </div>
    </section>
  );
}