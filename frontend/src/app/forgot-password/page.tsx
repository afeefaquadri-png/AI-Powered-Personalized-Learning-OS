"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-[#0d1424] border border-white/[0.07] rounded-2xl p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-400">
                <path d="M3 8l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white mb-2">Check your email</h1>
            <p className="text-white/50 text-sm mb-1">We sent a password reset link to</p>
            <p className="text-white font-medium text-sm mb-5">{email}</p>
            <p className="text-white/30 text-xs mb-6">
              Click the link in the email to set a new password. Check your spam folder if you don&apos;t see it within a few minutes.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setSent(false); setEmail(""); }}
                className="w-full border border-white/[0.1] text-white/60 hover:text-white hover:border-white/20 py-2.5 rounded-xl text-sm font-medium transition"
              >
                Try a different email
              </button>
              <Link
                href="/login"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl text-sm font-medium transition text-center"
              >
                Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#0d1424] border border-white/[0.07] rounded-2xl p-8">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-5">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-blue-400">
              <path d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2h-1V6a4 4 0 00-4-4z" stroke="currentColor" strokeWidth="1.4" fill="none" />
              <circle cx="10" cy="13" r="1.5" fill="currentColor" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-center text-white mb-2">Forgot password?</h1>
          <p className="text-center text-white/40 text-sm mb-6">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>

          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-1">
                Email address
              </label>
              <input
                id="email" type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-blue-900/30"
            >
              {loading ? "Sending…" : "Send Reset Link"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-white/40">
            Remember your password?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
