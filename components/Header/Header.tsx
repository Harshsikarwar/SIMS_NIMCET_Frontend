"use client";

import { useState } from "react";
import Link from "next/link";
import "./Header.css";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "NIMCET Guide", href: "/nimcet-guide" },
  { name: "Test Series", href: "/test-series" },
  { name: "About SIMS", href: "/about" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sims-header">
      <nav className="sims-nav">
        {/* Logo and Organisation Name */}
        <Link
          href="/"
          className="sims-brand"
          onClick={() => setMenuOpen(false)}
        >
          <span className="sims-logo">S</span>

          <span className="sims-brand-text">
            <span className="sims-brand-name">
              SIMS-NIMCET
            </span>

            <span className="sims-brand-tagline">
              Your NIMCET Success Partner
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="sims-desktop-links">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="sims-nav-link"
            >
              {link.name}
            </Link>
          ))}

          <Link href="/login" className="sims-login">
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`sims-menu-btn ${
            menuOpen ? "active" : ""
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`sims-sidebar ${
          menuOpen ? "sidebar-open" : ""
        }`}
        inert={!menuOpen}
      >
        <div className="sims-sidebar-heading">
          <span>Explore SIMS</span>

          <button
            type="button"
            className="sims-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        <div className="sims-mobile-links">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="sims-mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
              <span>&rarr;</span>
            </Link>
          ))}

          <Link
            href="/login"
            className="sims-mobile-login"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}