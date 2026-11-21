"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "./NimcetOverview.css";

const benefits = [
  {
    number: "01",
    title: "NIT Admission",
    description:
      "Get an opportunity to pursue MCA at participating National Institutes of Technology.",
  },
  {
    number: "02",
    title: "National Level Exam",
    description:
      "Compete with candidates from across India through a common entrance examination.",
  },
  {
    number: "03",
    title: "Career Opportunities",
    description:
      "Get an opportunity to pursue MCA at participating National Institutes of Technology.",
  },
  {
    number: "04",
    title: "Recognised Institutes",
    description:
      "Get an opportunity to pursue MCA at participating National Institutes of Technology.",
  },
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
          </div>
        </div>

        {/* Benefits Section */}
        <div ref={benefitsRef} className="nimcet-overview-benefits">
          <div className="nimcet-benefits-heading-wrap" data-reveal>
            <h2 className="nimcet-benefits-heading">WHY NIMCET?</h2>
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
                  } as React.CSSProperties
                }
              >
                <div className="nimcet-benefit-reveal">
                  <article className="nimcet-benefit-card">
                    <div className="nimcet-benefit-meta">
                      <span className="nimcet-benefit-number">
                        {benefit.number}
                      </span>
                    </div>

                    <h3>{benefit.title}</h3>

                    <p>{benefit.description}</p>
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