"use client";

import { useEffect, useRef } from "react";
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
}

const offerings: Offering[] = [
  {
    title: "Offline Classes",
    icon: "offline",
    color: "blue",
  },
  {
    title: "Online Classes",
    icon: "online",
    color: "pink",
  },
  {
    title: "Topic-Wise Complete Study Materials",
    description: "PYQs with detailed solutions",
    icon: "book",
    color: "green",
  },
  {
    title: "Recorded Classes Available",
    icon: "video",
    color: "purple",
  },
  {
    title: "Doubt Classes",
    icon: "doubt",
    color: "orange",
  },
  {
    title: "Weekly 6-Days Classes",
    description: "Consistent learning and practice",
    icon: "weekly",
    color: "pink",
  },
];

const tests: Offering[] = [
  {
    title: "WRT",
    description: "Weekly Review Test",
    icon: "review",
    color: "blue",
  },
  {
    title: "UWT",
    description: "Unit Wise Test",
    icon: "unit",
    color: "orange",
  },
  {
    title: "FLT",
    description: "Full Length Test",
    icon: "full",
    color: "pink",
  },
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

export default function NimcetOfferings() {
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
              <div className="offerings-highlight-content">
                <span className="highlight-label">NEW BATCH</span>

                <h3>Coming Soon...</h3>

                <p>Start your journey towards NIT with SIMS Raipur.</p>
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
                } as React.CSSProperties
              }
            >
              <div className="reveal-item reveal-fill">
                <article className="offering-card">
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
                  } as React.CSSProperties
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
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}