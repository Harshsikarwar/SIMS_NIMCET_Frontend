
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Logo from "../../assets/images/SIMSRaipur.png";
import { checkAuth } from "@/utils/auth";

import "./Header.css";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "NIMCET Guide", href: "/nimcet_guide" },
  { name: "Test Series", href: "/test-series" },
  { name: "About", href: "/about" },
];

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

function getCsrfToken() {
  if (typeof document === "undefined") return "";

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith("csrftoken="));

  return cookie
    ? decodeURIComponent(cookie.split("=").slice(1).join("="))
    : "";
}

export default function Header() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Check authentication
  useEffect(() => {
    let active = true;

    async function verifyAuth() {
      const result = await checkAuth();

      if (!active) return;

      if (result.authenticated === true) {
        setIsAuthenticated(true);
      } else if (result.authenticated === false) {
        setIsAuthenticated(false);
      }

      setAuthLoading(false);
    }

    verifyAuth();

    // Listen for successful login
    const handleLoginSuccess = () => {
      setIsAuthenticated(true);
      setAuthLoading(false);
    };

    // Listen for successful logout
    const handleLogoutSuccess = () => {
      setIsAuthenticated(false);
      setAuthLoading(false);
    };

    window.addEventListener("login-success", handleLoginSuccess);
    window.addEventListener("logout-success", handleLogoutSuccess);

    return () => {
      active = false;

      window.removeEventListener("login-success", handleLoginSuccess);
      window.removeEventListener("logout-success", handleLogoutSuccess);
    };
  }, []);

  // Logout
  const handleLogout = async () => {
    if (logoutLoading) return;

    try {
      setLogoutLoading(true);

      const csrfToken = getCsrfToken();

      const response = await fetch(`${API_URL}/api/auth/logout/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(csrfToken && {
            "X-CSRFToken": csrfToken,
          }),
        },
      });

      if (!response.ok) {
        throw new Error("Unable to logout. Please try again.");
      }

      setIsAuthenticated(false);
      window.dispatchEvent(new Event("logout-success"));

      closeMenu();

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLogoutLoading(false);
    }
  };

  useEffect(() => {
    const handleAuthChanged = () => {
      setIsAuthenticated(true);
      setAuthLoading(false);
    };

    const handleLogoutSuccess = () => {
      setIsAuthenticated(false);
      setAuthLoading(false);
    };

    window.addEventListener("auth-changed", handleAuthChanged);
    window.addEventListener("logout-success", handleLogoutSuccess);

    checkAuth().then((result) => {
      if (result.authenticated !== null) {
        setIsAuthenticated(result.authenticated);
      }

      setAuthLoading(false);
    });

  return () => {
    window.removeEventListener("auth-changed", handleAuthChanged);
    window.removeEventListener("logout-success", handleLogoutSuccess);
  };
}, []);

  return (
    <header className="sims-header">
      <div className="header-container">

        {/* Logo */}
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

        {/* Mobile Menu Button */}
        <button
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Navigation */}
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

          {/* Authentication Button */}
          {!authLoading && (
            isAuthenticated ? (
              <button
                type="button"
                className="login-button"
                onClick={handleLogout}
                disabled={logoutLoading}
              >
                {logoutLoading ? "Logging out..." : "Logout"}
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="login-button"
                onClick={closeMenu}
              >
                Login
              </Link>
            )
          )}
        </nav>

      </div>
    </header>
  );
}
