"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import "./ExploreSubjects.css";

type IconName = "math" | "logic" | "computer" | "english";

interface Subject {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  topics: string[];
  /** Mathematics shown in the formula panel */
  formula: string;
  formulaNote: string;
  /** C program lines shown in the code panel */
  code: string[];
  /** Large faint maths symbol */
  symbol: string;
  icon: IconName;
}

/* Edit the text, topics and snippets here. */
const subjects: Subject[] = [
  {
    id: "mathematics",
    number: "01",
    title: "Mathematics",
    tagline: "Algebra to calculus",
    description:
      "The base of the whole paper. Strong concepts and fast, accurate calculation make the difference between a good score and a great one.",
    topics: [
      "Sets & Relations",
      "Functions",
      "Algebra",
      "Matrices & Determinants",
      "Trigonometry",
      "Coordinate Geometry",
      "Calculus",
      "Probability & Statistics",
    ],
    formula: "∫ x² dx = x³/3 + C",
    formulaNote: "Integration: never forget the constant C",
    code: [
      "#include <math.h>",
      "double d = sqrt(x*x + y*y);",
      'printf("%.2f", d);',
    ],
    symbol: "∑",
    icon: "math",
  },
  {
    id: "reasoning",
    number: "02",
    title: "Analytical Ability & Logical Reasoning",
    tagline: "Think. Spot. Solve.",
    description:
      "Tests how clearly you think. Patterns, puzzles and data questions reward practice far more than memorising.",
    topics: [
      "Number & Letter Series",
      "Coding–Decoding",
      "Blood Relations",
      "Seating Arrangement",
      "Syllogisms",
      "Data Interpretation",
      "Puzzles",
    ],
    formula: "2, 6, 12, 20, … → n(n + 1)",
    formulaNote: "Find the rule behind the series",
    code: [
      "for (n = 1; n <= 4; n++)",
      '  printf("%d ", n * (n + 1));',
      "// 2 6 12 20",
    ],
    symbol: "∴",
    icon: "logic",
  },
  {
    id: "computer",
    number: "03",
    title: "Computer Awareness",
    tagline: "Bits, memory and code",
    description:
      "Questions on how computers work. Short and scoring when your fundamentals are clear, and a natural fit for future MCA students.",
    topics: [
      "Number Systems",
      "Computer Organisation",
      "Operating Systems",
      "Networking Basics",
      "Programming Concepts",
      "Boolean Algebra",
    ],
    formula: "1011₂ = 11₁₀",
    formulaNote: "Binary to decimal conversion",
    code: [
      "int bits = 8;",
      "int max = (1 << bits) - 1;",
      "// max = 255",
    ],
    symbol: "⊕",
    icon: "computer",
  },
  {
    id: "english",
    number: "04",
    title: "General English",
    tagline: "Read. Write. Understand.",
    description:
      "A quick section to protect your score. Steady vocabulary and grammar practice keeps these marks safe.",
    topics: [
      "Vocabulary",
      "Grammar",
      "Reading Comprehension",
      "Sentence Correction",
      "Synonyms & Antonyms",
      "Fill in the Blanks",
    ],
    formula: "word ∈ Vocabulary",
    formulaNote: "Every new word grows your set",
    code: [
      'char *w = "fluent";',
      'printf("%s: %d", w, (int)strlen(w));',
    ],
    symbol: "∈",
    icon: "english",
  },
];

/* Decorative background symbols. Fixed values (no Math.random) so the server
   and the browser render identical markup and Next.js has no hydration mismatch. */
const floaters: Array<{ s: string; x: number; y: number; size: number; delay: number; code?: boolean }> = [
  { s: "π", x: 3, y: 7, size: 38, delay: 0 },
  { s: "#include", x: 27, y: 3, size: 15, delay: 1.3, code: true },
  { s: "∑", x: 54, y: 6, size: 34, delay: 2.1 },
  { s: "{ }", x: 78, y: 4, size: 24, delay: 0.6, code: true },
  { s: "∫", x: 94, y: 15, size: 40, delay: 1.7 },
  { s: "printf()", x: 3, y: 48, size: 15, delay: 2.5, code: true },
  { s: "θ", x: 96, y: 52, size: 34, delay: 0.8 },
  { s: "i++", x: 4, y: 76, size: 17, delay: 1.5, code: true },
  { s: "√x", x: 92, y: 80, size: 30, delay: 2.3 },
  { s: "Δ", x: 22, y: 93, size: 32, delay: 0.4 },
  { s: "&&", x: 47, y: 95, size: 18, delay: 1.9, code: true },
  { s: "x²", x: 70, y: 93, size: 30, delay: 1.1 },
  { s: "return 0;", x: 85, y: 96, size: 14, delay: 2.7, code: true },
];

const iconPaths: Record<IconName, string[]> = {
  math: [
    "M5 3h14v18H5z",
    "M8 7h8",
    "M8 11h2M12 11h2M16 11h0",
    "M8 15h2M12 15h2M16 15h0",
    "M8 18h2M12 18h2",
  ],
  logic: [
    "M9 18h6",
    "M10 21h4",
    "M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z",
  ],
  computer: ["M3 4h18v12H3z", "M8 20h8", "M12 16v4", "m9.5 8-2 2 2 2", "m14.5 8 2 2-2 2"],
  english: ["M3 19 8 5l5 14", "M5 14h6", "M18 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", "M21 12v7"],
};

function SubjectIcon({ name }: { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="es-icon-svg"
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

/* Tiny C syntax highlighter for the code panel. */
const TOKEN =
  /(\/\/.*$|"[^"]*"|#include|<[a-z.]+>|\b(?:int|double|char|for|return|float|while|if)\b|\b\d+\b)/;

function CodeLine({ line }: { line: string }) {
  return (
    <>
      {line.split(TOKEN).map((part, i) => {
        if (!part) return null;
        let cls = "";
        if (part.startsWith("//")) cls = "es-c";
        else if (part.startsWith('"') || /^<[a-z.]+>$/.test(part)) cls = "es-s";
        else if (part === "#include" || /^(int|double|char|for|return|float|while|if)$/.test(part))
          cls = "es-k";
        else if (/^\d+$/.test(part)) cls = "es-n";
        return cls ? (
          <span key={i} className={cls}>
            {part}
          </span>
        ) : (
          part
        );
      })}
    </>
  );
}

interface ExploreSubjectsProps {
  /** Where the "Explore full syllabus" button goes. */
  syllabusHref?: string;
}

export default function ExploreSubjects({
  syllabusHref = "/nimcet-guide",
}: ExploreSubjectsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [activeId, setActiveId] = useState(subjects[0].id);
  const [justLeft, setJustLeft] = useState<string | null>(null);
  const [interacted, setInteracted] = useState(false);

  const active = subjects.find((s) => s.id === activeId) ?? subjects[0];
  const others = subjects.filter((s) => s.id !== active.id);

  const select = (id: string) => {
    if (id === activeId) return;
    setJustLeft(activeId);
    setActiveId(id);
    setInteracted(true);
  };

  /* Scroll reveal: the animation plays every time a block enters the screen
     and resets when it leaves, so it repeats when you scroll up and down. */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const targets = section.querySelectorAll<HTMLElement>("[data-reveal]");

    // Content stays visible unless JS is ready to animate it
    section.classList.add("es-js-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -50px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="explore-subjects" id="subjects">
      {/* Decorative maths + C layer (behind the content) */}
      <div className="es-bg" aria-hidden="true">
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

      <div className="es-container">
        {/* Heading */}
        <div className="es-reveal es-heading-wrap" data-reveal>
          <div className="es-heading">
            <span className="es-eyebrow">NIMCET SYLLABUS</span>

            <h2>
              Explore NIMCET
              <span> Subjects</span>
            </h2>

            <p>
              Four sections make up the paper. Pick a subject to see what it
              covers.
            </p>
          </div>
        </div>

        <div className="es-stage">
          {/* ---------- Selected subject (large, left) ---------- */}
          <div className="es-left es-reveal-left" data-reveal>
            <article
              className="es-main"
              aria-live="polite"
              aria-label={`${active.title} details`}
            >
              <span className="es-main-symbol" aria-hidden="true">
                {active.symbol}
              </span>

              <div key={active.id} className={`es-content${interacted ? " es-anim" : ""}`}>
                <div className="es-main-top es-step" style={{ "--d": "0ms" } as CSSProperties}>
                  <span className="es-number">{active.number}</span>
                  <span className="es-line" />
                  <span className="es-icon">
                    <SubjectIcon name={active.icon} />
                  </span>
                </div>

                <span className="es-tagline es-step" style={{ "--d": "60ms" } as CSSProperties}>
                  {active.tagline}
                </span>

                <h3 className="es-step" style={{ "--d": "110ms" } as CSSProperties}>
                  {active.title}
                </h3>

                <p className="es-desc es-step" style={{ "--d": "170ms" } as CSSProperties}>
                  {active.description}
                </p>

                <ul className="es-topics es-step" style={{ "--d": "230ms" } as CSSProperties}>
                  {active.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>

                <div className="es-panels es-step" style={{ "--d": "300ms" } as CSSProperties}>
                  <div className="es-formula" aria-hidden="true">
                    <span className="es-panel-label">Maths</span>
                    <strong>{active.formula}</strong>
                    <small>{active.formulaNote}</small>
                  </div>

                  <div className="es-code" aria-hidden="true">
                    <span className="es-panel-label">main.c</span>
                    <div className="es-pre">
                      {active.code.map((line, i) => (
                        <div key={i}>
                          <CodeLine line={line} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* ---------- Other subjects (small bundle, right) ---------- */}
          <div className="es-right" data-reveal>
            <p className="es-hint">
              <span aria-hidden="true">{"// "}</span>
              Choose another subject
            </p>

            <ul className="es-bundle">
              {others.map((subject, index) => (
                <li
                  key={subject.id}
                  className={`es-slot${justLeft === subject.id ? " es-pop" : ""}`}
                  style={
                    {
                      "--i": index,
                      zIndex: others.length - index,
                    } as CSSProperties
                  }
                >
                  <button
                    type="button"
                    className="es-mini"
                    onClick={() => select(subject.id)}
                    aria-label={`Show ${subject.title}`}
                  >
                    <span className="es-mini-symbol" aria-hidden="true">
                      {subject.symbol}
                    </span>
                    <span className="es-mini-number">{subject.number}</span>
                    <span className="es-mini-text">
                      <strong>{subject.title}</strong>
                      <small>{subject.tagline}</small>
                    </span>
                    <span className="es-mini-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Full syllabus button */}
        <div className="es-reveal es-cta-wrap" data-reveal>
          <div className="es-cta">
            <p className="es-cta-text">
              Want every topic, section by section?
            </p>

            <Link href={syllabusHref} className="es-cta-button">
              Explore full syllabus
              <span aria-hidden="true">↗</span>
            </Link>

            <code className="es-cta-code" aria-hidden="true">
              open(&quot;syllabus&quot;);
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}