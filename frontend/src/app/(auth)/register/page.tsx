"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    // If Supabase requires email confirmation, session is null until confirmed
    if (!data.session) {
      setEmailSent(true);
      setLoading(false);
      return;
    }
    // Session available immediately (email confirmation disabled) — go to onboarding
    router.push("/onboarding");
  }

  async function handleResend() {
    setResending(true);
    setResendMsg(null);
    const { error } = await supabase.auth.resend({ type: "signup", email });
    setResending(false);
    setResendMsg(error ? "Failed to resend. Please try again." : "Confirmation email resent! Check your inbox.");
  }

  if (emailSent) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-[#0d1424] border border-white/[0.07] rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">📬</div>
            <h1 className="text-2xl font-bold text-white mb-2">Check your email</h1>
            <p className="text-white/50 text-sm mb-2">
              We sent a confirmation link to
            </p>
            <p className="text-white font-medium text-sm mb-4">{email}</p>
            <p className="text-white/40 text-xs mb-6">
              Click the link in the email to activate your account, then come back to sign in. Check your spam folder if you don&apos;t see it.
            </p>

            {resendMsg && (
              <p className={`text-xs mb-4 ${resendMsg.includes("resent") ? "text-green-400" : "text-red-400"}`}>
                {resendMsg}
              </p>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={handleResend}
                disabled={resending}
                className="w-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 py-2.5 rounded-xl text-sm font-medium transition disabled:opacity-50"
              >
                {resending ? "Resending…" : "Resend confirmation email"}
              </button>
              <Link
                href="/login"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl text-sm font-medium transition text-center"
              >
                Go to sign in
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
          <h1 className="text-2xl font-bold text-center text-white mb-2">Create your account</h1>
          <p className="text-center text-white/40 text-sm mb-6">Join LearnOS — it&apos;s free</p>

          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-1">Email address</label>
              <input
                id="email" type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/60 mb-1">Password</label>
              <input
                id="password" type="password" required value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
                placeholder="At least 8 characters"
              />
            </div>
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-white/60 mb-1">Confirm password</label>
              <input
                id="confirm" type="password" required value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-blue-900/30"
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/40">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
