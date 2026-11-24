
"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import "./Footer.css";

/* ------------------------------------------------------------------ */
/* Edit your links here                                                */
/* ------------------------------------------------------------------ */

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "NIMCET Guide", href: "/nimcet-guide" },
  { label: "Test Series", href: "/test-series" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* TODO: Replace placeholder URLs with your real links */

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/your-handle",
    icon: "instagram" as const,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/91XXXXXXXXXX",
    icon: "whatsapp" as const,
  },
];

const otherSites = [
  {
    label: "SIMS Main Website",
    note: "Visit the main SIMS site",
    href: "https://your-sims-website.com",
  },
  {
    label: "GATE Exam Site",
    note: "GATE preparation by SIMS",
    href: "https://your-gate-website.com",
  },
];

/* ------------------------------------------------------------------ */
/* Decorative background symbols                                      */
/* Fixed values prevent hydration mismatch                            */
/* ------------------------------------------------------------------ */

const floaters: Array<{
  s: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  code?: boolean;
}> = [
  { s: "π", x: 4, y: 12, size: 36, delay: 0 },
  { s: "#include", x: 24, y: 6, size: 14, delay: 1.2, code: true },
  { s: "∑", x: 48, y: 14, size: 32, delay: 2.0 },
  { s: "{ }", x: 70, y: 8, size: 22, delay: 0.5, code: true },
  { s: "∫", x: 93, y: 18, size: 38, delay: 1.6 },
  { s: "printf()", x: 6, y: 66, size: 14, delay: 2.4, code: true },
  { s: "√x", x: 91, y: 62, size: 28, delay: 0.9 },
  { s: "i++", x: 36, y: 74, size: 16, delay: 1.8, code: true },
  { s: "θ", x: 60, y: 70, size: 30, delay: 0.3 },
  { s: "x²", x: 80, y: 78, size: 28, delay: 2.2 },
];

/* ------------------------------------------------------------------ */
/* Social Icons                                                        */
/* ------------------------------------------------------------------ */

function SocialIcon({
  name,
}: {
  name: "instagram" | "whatsapp";
}) {
  const common = {
    viewBox: "0 0 24 24",
    className: "ft-social-svg",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  if (name === "instagram") {
    return (
      <svg {...common}>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <g transform="translate(6.6 6.4) scale(0.5)">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Footer Component                                                    */
/* ------------------------------------------------------------------ */

interface NimcetFooterProps {
  /** Path of your logo inside /public */
  logoSrc?: string;
  brandName?: string;
  brandTagline?: string;
}

export default function Footer({
  logoSrc = "/images/logo.png",
  brandName = "SIMS Raipur",
  brandTagline = "NIMCET Preparation",
}: NimcetFooterProps) {
  const footerRef = useRef<HTMLElement | null>(null);

  const [logoFailed, setLogoFailed] = useState(false);

  // Avoid reading the current date during prerendering.
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  /* -------------------------------------------------------------- */
  /* Scroll reveal animation                                         */
  /* -------------------------------------------------------------- */

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    if (!("IntersectionObserver" in window)) return;

    const targets =
      footer.querySelectorAll<HTMLElement>("[data-reveal]");

    footer.classList.add("ft-js-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            "is-visible",
            entry.isIntersecting
          );
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* -------------------------------------------------------------- */
  /* Animation delay helper                                          */
  /* -------------------------------------------------------------- */

  const delay = (n: number): CSSProperties =>
    ({
      "--reveal-delay": `${n}ms`,
    }) as CSSProperties;

  return (
    <footer ref={footerRef} className="nimcet-footer">
      {/* Decorative maths + C layer */}
      <div className="ft-bg" aria-hidden="true">
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

      <div className="ft-container">
        <div className="ft-grid">
          {/* Logo + About */}

          <div
            className="ft-cell ft-cell-brand"
            data-reveal
            style={delay(0)}
          >
            <div className="ft-col">
              <Link
                href="/"
                className="ft-logo"
                aria-label={`${brandName} home`}
              >
                {logoFailed ? (
                  <span
                    className="ft-logo-fallback"
                    aria-hidden="true"
                  >
                    ∑
                  </span>
                ) : (
                  <Image
                    src={logoSrc}
                    alt={`${brandName} logo`}
                    width={64}
                    height={64}
                    className="ft-logo-img"
                    onError={() => setLogoFailed(true)}
                  />
                )}

                <span className="ft-logo-text">
                  <strong>{brandName}</strong>
                  <small>{brandTagline}</small>
                </span>
              </Link>

              <p className="ft-about">
                Guidance, classes and test series to help you reach
                your goal of an MCA seat at an NIT.
              </p>

              <code className="ft-code" aria-hidden="true">
                int goal = NIT;
              </code>
            </div>
          </div>

          {/* Quick Links */}

          <nav
            className="ft-cell"
            data-reveal
            style={delay(120)}
            aria-label="Quick links"
          >
            <div className="ft-col">
              <h4>Quick Links</h4>

              <ul className="ft-links ft-links-quick">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <span
                        className="ft-arrow"
                        aria-hidden="true"
                      >
                        →
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Social Links */}

          <div
            className="ft-cell"
            data-reveal
            style={delay(240)}
          >
            <div className="ft-col">
              <h4>Follow Us</h4>

              <ul className="ft-social">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ft-social-link"
                    >
                      <span className="ft-social-icon">
                        <SocialIcon name={social.icon} />
                      </span>

                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Other Sites */}

          <div
            className="ft-cell"
            data-reveal
            style={delay(360)}
          >
            <div className="ft-col">
              <h4>Our Other Sites</h4>

              <ul className="ft-sites">
                {otherSites.map((site) => (
                  <li key={site.label}>
                    <a
                      href={site.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ft-site-link"
                    >
                      <span className="ft-site-text">
                        <strong>{site.label}</strong>
                        <small>{site.note}</small>
                      </span>

                      <span
                        className="ft-site-arrow"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}

      <div className="ft-bottom">
        <div className="ft-bottom-inner">
          <p>
            © {year} {brandName}. All rights reserved.
          </p>

          <div className="ft-bottom-right">
            <code aria-hidden="true">return 0;</code>

            <button
              type="button"
              className="ft-top"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              aria-label="Back to top"
            >
              Back to top
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
