"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import GuestOnly from "@/components/GuestOnly/GuestOnly";

import "./Login.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

/* Google OAuth "Web application" client ID (public, safe in the browser).
   Add NEXT_PUBLIC_GOOGLE_CLIENT_ID to .env.local */
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

/* Backend endpoint that receives the Google ID token and sets the
   HttpOnly access/refresh cookies, exactly like /api/auth/login/ does. */
const GOOGLE_LOGIN_PATH = "/api/auth/google/";

interface ApiResponse {
  message?: string;
  detail?: string;
  redirectUrl?: string;
  redirect_url?: string;
}

/* Minimal typing for Google Identity Services */
interface GoogleIdApi {
  initialize: (config: {
    client_id: string;
    callback: (response: { credential?: string }) => void;
    auto_select?: boolean;
  }) => void;
  renderButton: (element: HTMLElement, options: Record<string, unknown>) => void;
}

declare global {
  interface Window {
    google?: { accounts: { id: GoogleIdApi } };
  }
}

/* Decorative floating symbols. Fixed values (no Math.random) so the server
   and the browser render identical markup and Next.js has no hydration mismatch. */
const floaters: Array<{ s: string; x: number; y: number; size: number; delay: number; code?: boolean }> = [
  { s: "π", x: 8, y: 22, size: 34, delay: 0 },
  { s: "∑", x: 84, y: 30, size: 32, delay: 1.4 },
  { s: "#include", x: 62, y: 12, size: 13, delay: 0.7, code: true },
  { s: "printf()", x: 6, y: 52, size: 13, delay: 2.1, code: true },
  { s: "∫", x: 88, y: 56, size: 36, delay: 0.4 },
  { s: "{ }", x: 14, y: 76, size: 22, delay: 1.8, code: true },
  { s: "√x", x: 74, y: 80, size: 28, delay: 1.1 },
  { s: "i++", x: 46, y: 90, size: 15, delay: 2.5, code: true },
  { s: "θ", x: 30, y: 38, size: 28, delay: 2.9 },
];

function getCsrfToken(): string {
  if (typeof document === "undefined") return "";

  const csrfCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("csrftoken="));

  return csrfCookie
    ? decodeURIComponent(csrfCookie.split("=").slice(1).join("="))
    : "";
}

function getSafeRedirectUrl(value?: string): string {
  if (!value || typeof window === "undefined") return "/";

  try {
    const url = new URL(value, window.location.origin);

    if (
      url.origin !== window.location.origin ||
      value.startsWith("//") ||
      value.includes("\\")
    ) {
      return "/";
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [gsiLoaded, setGsiLoaded] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const googleBtnRef = useRef<HTMLDivElement | null>(null);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (
      normalizedEmail.length > 254 ||
      password.length > 128 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      setError("Please enter valid login credentials.");
      return;
    }

    try {
      setLoading(true);

      const csrfToken = getCsrfToken();

      const response = await fetch(`${API_URL}/api/auth/login/`, {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(csrfToken && {
            "X-CSRFToken": csrfToken,
          }),
        },
        body: JSON.stringify({
          email: normalizedEmail,
          password,
        }),
      });

      const contentType = response.headers.get("content-type") || "";

      let data: ApiResponse = {};

      if (contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch {
          throw new Error("Invalid response received from the server.");
        }
      }

      if (!response.ok) {
        throw new Error(
          data.detail ||
            data.message ||
            (response.status === 401
              ? "Incorrect email or password."
              : "Login failed. Please try again.")
        );
      }

      // Django must set the HttpOnly access and refresh cookies.
      // Never store JWT tokens in localStorage or sessionStorage.

      const redirectUrl = getSafeRedirectUrl(
        data.redirectUrl || data.redirect_url
      );

      // Notify other components that login was successful.
      window.dispatchEvent(new Event("auth-changed"));

      router.replace(redirectUrl);
      router.refresh();

    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Login with Google ---------------- */

  // Called by Google with a signed ID token once the user picks an account.
  // The token is verified by Django, which then sets the same HttpOnly cookies.
  const handleGoogleCredential = async (credential?: string) => {
    if (loading) return;

    if (!credential) {
      setError("Google sign-in failed. Please try again.");
      return;
    }

    setError("");

    try {
      setLoading(true);

      const csrfToken = getCsrfToken();

      const response = await fetch(`${API_URL}${GOOGLE_LOGIN_PATH}`, {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(csrfToken && {
            "X-CSRFToken": csrfToken,
          }),
        },
        body: JSON.stringify({ credential }),
      });

      const contentType = response.headers.get("content-type") || "";

      let data: ApiResponse = {};

      if (contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch {
          throw new Error("Invalid response received from the server.");
        }
      }

      if (!response.ok) {
        throw new Error(
          data.detail ||
            data.message ||
            "Google sign-in failed. Please try again."
        );
      }

      const redirectUrl = getSafeRedirectUrl(
        data.redirectUrl || data.redirect_url
      );

      window.dispatchEvent(new Event("auth-changed"));

      router.replace(redirectUrl);
      router.refresh();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Keep the newest handler available to the Google callback
  const googleHandlerRef = useRef(handleGoogleCredential);
  useEffect(() => {
    googleHandlerRef.current = handleGoogleCredential;
  });

  // If the Google script was already loaded (client-side navigation)
  useEffect(() => {
    if (window.google?.accounts?.id) setGsiLoaded(true);
  }, []);

  // Set up and draw the official Google button once the script is ready
  useEffect(() => {
    if (!gsiLoaded || !GOOGLE_CLIENT_ID) return;

    const element = googleBtnRef.current;
    const googleId = window.google?.accounts?.id;
    if (!element || !googleId) return;

    googleId.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response) => googleHandlerRef.current(response.credential),
      auto_select: false,
    });

    let lastWidth = 0;

    const draw = () => {
      const width = Math.min(400, Math.max(200, Math.round(element.clientWidth)));
      if (width === lastWidth) return;
      lastWidth = width;

      element.innerHTML = "";
      googleId.renderButton(element, {
        type: "standard",
        theme: "outline",
        size: "large",
        shape: "pill",
        text: "continue_with",
        logo_alignment: "left",
        width,
      });
      setGoogleReady(true);
    };

    draw();

    // Redraw if the card changes size (rotating the phone, resizing the window)
    let timer = 0;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(draw, 150);
    });
    observer.observe(element);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [gsiLoaded]);

  const handleGooglePlaceholder = () => {
    setError(
      GOOGLE_CLIENT_ID
        ? "Google is still loading. Please try again in a moment."
        : "Google sign-in is not set up yet."
    );
  };

  return (
    <GuestOnly>
    {GOOGLE_CLIENT_ID && (
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setGsiLoaded(true)}
      />
    )}

    <main className="login-page">
      <section className="login-book">
        {/* Ongoing animated decoration: maths symbols, C tokens and sine waves */}
        <div className="login-deco" aria-hidden="true">
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

          <svg className="login-wave login-wave-a" viewBox="0 0 800 60" preserveAspectRatio="none">
            <path d="M0 30 Q50 0 100 30 T200 30 T300 30 T400 30 T500 30 T600 30 T700 30 T800 30" />
          </svg>
          <svg className="login-wave login-wave-b" viewBox="0 0 800 60" preserveAspectRatio="none">
            <path d="M0 30 Q50 60 100 30 T200 30 T300 30 T400 30 T500 30 T600 30 T700 30 T800 30" />
          </svg>
        </div>

        <div className="login-book-content">
          {/* SIMS NIMCET brand bar */}
          <div className="login-brandbar" aria-hidden="true">
            <span className="login-orbit">
              ∑
              <i>
                <b>π</b>
              </i>
              <i>
                <b>{"{ }"}</b>
              </i>
            </span>

            <span className="login-brandtext">
              <strong>SIMS NIMCET</strong>
              <code className="login-typed">
                <span>printf(&quot;SIMS NIMCET&quot;);</span>
              </code>
            </span>
          </div>

          <div className="login-form-wrapper">
            <h2>Login</h2>

            <form onSubmit={handleLogin} className="login-form">
              <label htmlFor="login-email">Email</label>

              <input
                id="login-email"
                type="email"
                name="email"
                autoComplete="username"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={254}
                required
                disabled={loading}
              />

              <label htmlFor="login-password">Password</label>

              <div className="login-password-field">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength={128}
                  required
                  disabled={loading}
                />

                <button
                  type="button"
                  className="login-show-password"
                  onClick={() =>
                    setShowPassword((value) => !value)
                  }
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  disabled={loading}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="login-forgot">
                <Link href="/auth/forgot-password">
                  Forgot password?
                </Link>
              </div>

              {error && (
                <p className="login-error" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="login-submit"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            <div className="login-divider">
              <span>or</span>
            </div>

            {/* Official Google button (rendered by Google) */}
            <div
              ref={googleBtnRef}
              className={`login-google-slot${googleReady ? "" : " is-hidden"}${
                loading ? " is-disabled" : ""
              }`}
            />

            {/* Shown until Google's button is ready (or if no client ID is set) */}
            {!googleReady && (
              <button
                type="button"
                className="login-google"
                onClick={handleGooglePlaceholder}
                disabled={loading}
              >
                <span className="google-symbol" aria-hidden="true">
                  G
                </span>
                Continue with Google
              </button>
            )}

            <p className="login-signup">
              Don't have an account?{" "}
              <Link href="/auth/signup">Signup</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
    </GuestOnly>
  );
}