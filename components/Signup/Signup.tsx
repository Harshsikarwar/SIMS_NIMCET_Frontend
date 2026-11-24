"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import "./Signup.css";
import { useRouter } from "next/navigation";
import Script from "next/script";
import GuestOnly from "@/components/GuestOnly/GuestOnly";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

/* Google OAuth "Web application" client ID (public, safe in the browser).
   Add NEXT_PUBLIC_GOOGLE_CLIENT_ID to .env.local */
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

/* Same backend endpoint the Login page uses. It verifies the Google token,
   creates the account if the email is new, and sets the HttpOnly cookies. */
const GOOGLE_LOGIN_PATH = "/api/auth/google/";

type ApiResponse = {
  detail?: string;
  message?: string;
};

/* Minimal typing for Google Identity Services */
type GoogleIdApi = {
  initialize: (config: {
    client_id: string;
    callback: (response: { credential?: string }) => void;
    auto_select?: boolean;
  }) => void;
  renderButton: (element: HTMLElement, options: Record<string, unknown>) => void;
};

const getGoogleId = (): GoogleIdApi | undefined =>
  (window as unknown as { google?: { accounts?: { id?: GoogleIdApi } } }).google
    ?.accounts?.id;

/* Decorative floating symbols. Fixed values (no Math.random) so the server
   and the browser render identical markup and Next.js has no hydration mismatch. */
const floaters: Array<{ s: string; x: number; y: number; size: number; delay: number; code?: boolean }> = [
  { s: "π", x: 8, y: 18, size: 34, delay: 0 },
  { s: "∑", x: 86, y: 26, size: 32, delay: 1.4 },
  { s: "#include", x: 60, y: 9, size: 13, delay: 0.7, code: true },
  { s: "printf()", x: 6, y: 46, size: 13, delay: 2.1, code: true },
  { s: "∫", x: 90, y: 52, size: 36, delay: 0.4 },
  { s: "{ }", x: 10, y: 72, size: 22, delay: 1.8, code: true },
  { s: "√x", x: 78, y: 76, size: 28, delay: 1.1 },
  { s: "i++", x: 44, y: 92, size: 15, delay: 2.5, code: true },
  { s: "θ", x: 30, y: 34, size: 28, delay: 2.9 },
];

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [gsiLoaded, setGsiLoaded] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const googleBtnRef = useRef<HTMLDivElement | null>(null);

  // Common API request function
  const request = async (
    endpoint: string,
    payload: object
  ): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      credentials: "include",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data: ApiResponse = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.detail || data.message || "Something went wrong."
      );
    }

    return data;
  };

  // Send OTP
  const handleSendOTP = async () => {
    setError("");
    setMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const data = await request("/api/auth/resend-otp/", {
        email: normalizedEmail,
      });

      setOtpSent(true);

      setMessage(
        data.detail || data.message || "OTP sent successfully."
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    setError("");
    setMessage("");

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    setLoading(true);

    try {
      const data = await request("/api/auth/verify-email/", {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
      });

      setEmailVerified(true);
      setOtpSent(false);
      setOtp("");

      setMessage(
        data.detail || data.message || "Email verified successfully."
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invalid OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  // Create account and automatically log in
  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!emailVerified) {
      setError("Please verify your email first.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const data = await request("/api/auth/register/", {
        email: email.trim().toLowerCase(),
        password: password,
        confirm_password: confirmPassword,
      });

      // Django must set access_token and refresh_token cookies
      // before this registration request returns successfully.

      setMessage(
        data.detail || data.message || "Account created successfully."
      );

      // Notify the Header that registration/login has succeeded.
      window.dispatchEvent(new Event("auth-changed"));

      // Redirect to home page.
      router.replace("/");
      router.refresh();

    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Signup failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // Reset email verification if email changes
  const handleEmailChange = (value: string) => {
    setEmail(value);
    setOtpSent(false);
    setEmailVerified(false);
    setOtp("");
    setError("");
    setMessage("");
  };

  /* ---------------- Sign up with Google ---------------- */

  // Called by Google with a signed ID token once the user picks an account.
  // Google already verified the email, so no OTP is needed on this path.
  const handleGoogleCredential = async (credential?: string) => {
    if (loading) return;

    setError("");
    setMessage("");

    if (!credential) {
      setError("Google sign-up failed. Please try again.");
      return;
    }

    setLoading(true);

    try {
      await request(GOOGLE_LOGIN_PATH, { credential });

      // Django sets the HttpOnly cookies, same as the normal signup.
      window.dispatchEvent(new Event("auth-changed"));

      router.replace("/");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Google sign-up failed. Please try again."
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
    if (getGoogleId()) setGsiLoaded(true);
  }, []);

  // Set up and draw the official Google button once the script is ready
  useEffect(() => {
    if (!gsiLoaded || !GOOGLE_CLIENT_ID) return;

    const element = googleBtnRef.current;
    const googleId = getGoogleId();
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
        text: "signup_with",
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
        : "Google sign-up is not set up yet."
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

    <div className="signup-page">
      <form className="signup-card" onSubmit={handleSignup}>

        {/* Ongoing animated decoration: maths symbols, C tokens and sine waves */}
        <div className="signup-deco" aria-hidden="true">
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

          <svg className="signup-wave signup-wave-a" viewBox="0 0 800 60" preserveAspectRatio="none">
            <path d="M0 30 Q50 0 100 30 T200 30 T300 30 T400 30 T500 30 T600 30 T700 30 T800 30" />
          </svg>
          <svg className="signup-wave signup-wave-b" viewBox="0 0 800 60" preserveAspectRatio="none">
            <path d="M0 30 Q50 60 100 30 T200 30 T300 30 T400 30 T500 30 T600 30 T700 30 T800 30" />
          </svg>
        </div>

        <div className="signup-content">
          {/* SIMS NIMCET brand bar */}
          <div className="signup-brandbar" aria-hidden="true">
            <span className="signup-orbit">
              ∑
              <i>
                <b>π</b>
              </i>
              <i>
                <b>{"{ }"}</b>
              </i>
            </span>

            <span className="signup-brandtext">
              <strong>SIMS NIMCET</strong>
              <code className="signup-typed">
                <span>printf(&quot;SIMS NIMCET&quot;);</span>
              </code>
            </span>
          </div>

          <h2 className="signup-title">Sign up</h2>

          {/* Email verification */}
          <div className="signup-field">
            <label htmlFor="signup-email">Email address</label>

            <div className="signup-email-row">
              <input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                disabled={emailVerified || loading}
                autoComplete="email"
                required
              />

              <button
                type="button"
                className={`signup-verify-btn ${
                  emailVerified ? "verified" : ""
                }`}
                onClick={
                  emailVerified
                    ? undefined
                    : otpSent
                      ? handleVerifyOTP
                      : handleSendOTP
                }
                disabled={loading || emailVerified}
              >
                {loading
                  ? "Please wait..."
                  : emailVerified
                    ? "Verified ✓"
                    : otpSent
                      ? "Verify OTP"
                      : "Send OTP"}
              </button>
            </div>
          </div>

          {/* OTP input */}
          {otpSent && (
            <div className="signup-field">
              <label htmlFor="signup-otp">Enter OTP</label>

              <input
                id="signup-otp"
                type="text"
                inputMode="numeric"
                placeholder="Enter the OTP sent to your email"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                maxLength={6}
                autoComplete="one-time-code"
                disabled={loading}
                required
              />

              <button
                type="button"
                className="signup-resend"
                onClick={handleSendOTP}
                disabled={loading}
              >
                Resend OTP
              </button>
            </div>
          )}

          {emailVerified && (
            <p className="signup-verified-message">
              ✓ Your email address has been verified.
            </p>
          )}

          {/* Password */}
          <div className="signup-field">
            <label htmlFor="signup-password">Password</label>

            <div className="signup-password-wrapper">
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                disabled={loading}
                required
              />

              <button
                type="button"
                className="signup-show-password"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <span className="signup-hint">
              Use at least 8 characters.
            </span>
          </div>

          {/* Confirm password */}
          <div className="signup-field">
            <label htmlFor="signup-confirm-password">
              Confirm password
            </label>

            <input
              id="signup-confirm-password"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              disabled={loading}
              required
            />
          </div>

          {/* Messages */}
          {error && (
            <div className="signup-alert error" role="alert">{error}</div>
          )}

          {message && (
            <div className="signup-alert success">{message}</div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="signup-submit"
            disabled={loading || !emailVerified}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <div className="signup-divider">
            <span>or</span>
          </div>

          {/* Official Google button (rendered by Google) */}
          <div
            ref={googleBtnRef}
            className={`signup-google-slot${googleReady ? "" : " is-hidden"}${
              loading ? " is-disabled" : ""
            }`}
          />

          {/* Shown until Google's button is ready (or if no client ID is set) */}
          {!googleReady && (
            <button
              type="button"
              className="signup-google"
              onClick={handleGooglePlaceholder}
              disabled={loading}
            >
              <span className="google-symbol" aria-hidden="true">
                G
              </span>
              Sign up with Google
            </button>
          )}

          <p className="signup-login-link">
            Already have an account?{" "}
            <a href="/auth/login">Log in</a>
          </p>
        </div>
      </form>
    </div>
    </GuestOnly>
  );
}