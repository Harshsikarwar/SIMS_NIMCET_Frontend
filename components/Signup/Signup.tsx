
"use client";

import { FormEvent, useState } from "react";
import "./Signup.css";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

type ApiResponse = {
  detail?: string;
  message?: string;
};

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

  const request = async (endpoint: string, payload: object) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

  const handleSendOTP = async () => {
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const data = await request("/api/auth/resend-otp/", {
        email: email.trim().toLowerCase(),
      });

      setOtpSent(true);
      setMessage(data.detail || data.message || "OTP sent successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send OTP.");
    } finally {
      setLoading(false);
    }
  };

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
      setMessage(data.detail || data.message || "Email verified successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

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
        password:password,
        confirm_password:password,
      });

      setMessage(data.detail || data.message || "Account created successfully.");
      router.push("/");
      // Redirect after successful registration if required.
      // window.location.href = "/auth/login";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setOtpSent(false);
    setEmailVerified(false);
    setOtp("");
    setError("");
    setMessage("");
  };

  return (
    <div className="signup-page">
      <form className="signup-card" onSubmit={handleSignup}>
        <div className="signup-heading">
          <span className="signup-eyebrow">SIMS RAIPUR</span>
          <h1>Create your account</h1>
          <p>Start your NIMCET preparation journey with us.</p>
        </div>

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
              onClick={emailVerified ? undefined : otpSent ? handleVerifyOTP : handleSendOTP}
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
          <span className="signup-hint">Use at least 8 characters.</span>
        </div>

        <div className="signup-field">
          <label htmlFor="signup-confirm-password">Confirm password</label>
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

        {error && <div className="signup-alert error">{error}</div>}
        {message && <div className="signup-alert success">{message}</div>}

        <button
          type="submit"
          className="signup-submit"
          disabled={loading || !emailVerified}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="signup-login-link">
          Already have an account? <a href="/auth/login">Log in</a>
        </p>
      </form>
    </div>
  );
}
