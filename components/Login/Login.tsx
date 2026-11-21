
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GuestOnly from "@/components/GuestOnly/GuestOnly";

import "./Login.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface ApiResponse {
  message?: string;
  detail?: string;
  redirectUrl?: string;
  redirect_url?: string;
}

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

  return (
    <GuestOnly>
    <main className="login-page">
      <section className="login-book">
        <div className="login-book-content">
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
