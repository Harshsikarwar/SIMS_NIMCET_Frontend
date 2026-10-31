
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/images/SIMSRaipur.png";
import "./Header.css";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "NIMCET Guide", href: "/NimcetGuide" },
  { name: "Test Series", href: "/test-series" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sims-header">
      <div className="header-container">
        <Link
          href="/"
          className="header-logo"
          aria-label="SIMS Raipur Home"
          onClick={closeMenu}
        >
          <Image
            src={Logo}
            alt="SIMS Raipur"
            width={150}
            height={85}
            priority
            className="logo-image"
          />
          <h3 className="logo-text">SIMS Raipur</h3>
        </Link>

        <button
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="main-navigation"
          className={`header-nav ${menuOpen ? "nav-open" : ""}`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="nav-link"
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/login"
            className="login-button"
            onClick={closeMenu}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
