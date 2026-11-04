
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Add your logo path here.
  const logoSrc = "";

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (normalizedEmail.length > 254 || password.length > 128) {
      setError("Invalid email or password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          password,
        }),
      });

      const data: { message?: string; redirectUrl?: string } =
        await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed. Please check your credentials."
        );
      }

      // Only allow safe local redirect paths.
      const redirectUrl =
        data.redirectUrl &&
        data.redirectUrl.startsWith("/") &&
        !data.redirectUrl.startsWith("//")
          ? data.redirectUrl
          : "/";

      window.location.assign(redirectUrl);
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

  const handleGoogleLogin = () => {
    // Replace with your backend's Google OAuth start URL.
    window.location.assign("/api/auth/google");
  };

  return (
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
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={loading}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="login-forgot">
                <Link href="/forgot-password">Forgot password?</Link>
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
              <span>OR</span>
            </div>

            <button
              type="button"
              className="login-google"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <span className="google-symbol">G</span>
              Continue with Google
            </button>

            <p className="login-signup">
              Don&apos;t have an account?{" "}
              <Link href="/signup">Signup</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
