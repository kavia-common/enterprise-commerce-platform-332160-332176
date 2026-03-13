"use client";

import React, { useState, useCallback } from "react";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { loginUser } from "@/lib/api";

/**
 * Regex pattern for validating email format.
 * Requires: local-part@domain with at least one dot in the domain.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Represents a single field-level validation error.
 */
interface FieldErrors {
  email?: string;
  password?: string;
}

/**
 * Login page with client-side form validation.
 *
 * Validation rules:
 * - Email and password fields cannot be empty.
 * - Email must match a valid email format.
 * - Clear inline validation messages are shown beneath each field.
 * - A general error banner is shown for server-side auth failures.
 */
// PUBLIC_INTERFACE
export default function LoginPage() {
  // Form field state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * Validates all form fields and returns whether the form is valid.
   * Sets inline error messages for each invalid field.
   */
  const validateForm = useCallback((): boolean => {
    const errors: FieldErrors = {};

    // Email validation
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errors.email = "Email address is required.";
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address (e.g. user@example.com).";
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 1) {
      errors.password = "Password cannot be empty.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [email, password]);

  /**
   * Clears the error for a specific field when the user starts typing.
   */
  const clearFieldError = (field: keyof FieldErrors) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
    // Also clear general error when user edits fields
    if (generalError) {
      setGeneralError("");
    }
  };

  /**
   * Handles form submission — validates fields, then calls the login API.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");

    // Run client-side validation
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await loginUser({
        email: email.trim(),
        password,
      });

      // Login successful
      setIsSuccess(true);
      setGeneralError("");

      // Store token in localStorage for subsequent authenticated requests
      if (result?.data?.token) {
        localStorage.setItem("auth_token", result.data.token);
        localStorage.setItem("auth_user", JSON.stringify(result.data.user));
      }

      // Redirect to homepage after brief success indication
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err: unknown) {
      // Display the server error message
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setGeneralError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Page heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#262626] tracking-[-0.01em] mb-2">
            Welcome Back
          </h1>
          <p className="text-[15px] text-[#737373]">
            Sign in to your account to continue shopping.
          </p>
        </div>

        {/* Login card */}
        <div className="bg-white rounded-xl shadow-[var(--shadow-md)] p-8">
          {/* General error banner */}
          {generalError && (
            <div
              className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6"
              role="alert"
              aria-live="polite"
            >
              <AlertCircle size={20} className="text-red-500 mt-0.5 shrink-0" aria-hidden="true" />
              <p className="text-sm leading-relaxed">{generalError}</p>
            </div>
          )}

          {/* Success banner */}
          {isSuccess && (
            <div
              className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-6"
              role="status"
              aria-live="polite"
            >
              <svg
                className="w-5 h-5 text-green-500 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm font-medium">Login successful! Redirecting…</p>
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit} noValidate aria-label="Login form">
            {/* Email field */}
            <div className="mb-5">
              <label
                htmlFor="login-email"
                className="block text-sm font-medium text-[#404040] mb-1.5"
              >
                Email Address <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A3A3] pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearFieldError("email");
                  }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                  className={`w-full h-12 pl-11 pr-4 text-base text-[#262626] bg-white border rounded-lg outline-none transition-all duration-200 placeholder:text-[#A3A3A3] ${
                    fieldErrors.email
                      ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/20"
                      : "border-[#E5E5E5] focus:border-[#1A1A2E] focus:ring-2 focus:ring-[#1A1A2E]/10"
                  }`}
                />
              </div>
              {fieldErrors.email && (
                <p
                  id="email-error"
                  className="flex items-center gap-1.5 mt-1.5 text-[13px] text-[#EF4444]"
                  role="alert"
                >
                  <AlertCircle size={14} className="shrink-0" aria-hidden="true" />
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="mb-6">
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-[#404040] mb-1.5"
              >
                Password <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A3A3] pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearFieldError("password");
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-invalid={!!fieldErrors.password}
                  aria-describedby={fieldErrors.password ? "password-error" : undefined}
                  className={`w-full h-12 pl-11 pr-12 text-base text-[#262626] bg-white border rounded-lg outline-none transition-all duration-200 placeholder:text-[#A3A3A3] ${
                    fieldErrors.password
                      ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/20"
                      : "border-[#E5E5E5] focus:border-[#1A1A2E] focus:ring-2 focus:ring-[#1A1A2E]/10"
                  }`}
                />
                {/* Toggle password visibility */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-[#404040] transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p
                  id="password-error"
                  className="flex items-center gap-1.5 mt-1.5 text-[13px] text-[#EF4444]"
                  role="alert"
                >
                  <AlertCircle size={14} className="shrink-0" aria-hidden="true" />
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Forgot password link */}
            <div className="flex justify-end mb-6">
              <a
                href="/forgot-password"
                className="text-sm text-[#E94560] hover:text-[#D63851] font-medium transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="w-full h-12 bg-[#E94560] text-white text-sm font-semibold uppercase tracking-[0.05em] rounded-lg hover:bg-[#D63851] hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(233,69,96,0.3)] active:translate-y-0 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in…
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#E5E5E5]" />
            <span className="text-xs text-[#A3A3A3] uppercase tracking-wide">or</span>
            <div className="flex-1 h-px bg-[#E5E5E5]" />
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-[#525252]">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="text-[#E94560] hover:text-[#D63851] font-semibold transition-colors"
            >
              Create Account
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
