"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Exchange the OAuth code for a session — Supabase handles this automatically
    // when detectSessionInUrl is true (default for browser client).
    // We just need to wait for onAuthStateChange to fire.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        // Password reset link — hand off to the reset page
        router.replace("/auth/reset-password");
        return;
      }
      if (session && event === "SIGNED_IN") {
        // New Google user → onboarding; returning user → dashboard
        const createdAt = new Date(session.user.created_at).getTime();
        const lastSignIn = new Date(session.user.last_sign_in_at ?? session.user.created_at).getTime();
        const isNewUser = Math.abs(lastSignIn - createdAt) < 5000;
        router.replace(isNewUser ? "/onboarding" : "/dashboard");
      }
    });

    // Also handle the case where the session is already set (e.g. page reload)
    supabase.auth.getSession().then(({ data: { session }, error: err }) => {
      if (err) {
        setError(err.message);
        return;
      }
      if (session) {
        router.replace("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (error) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-400 text-sm mb-4">Sign-in failed: {error}</p>
          <a href="/login" className="text-blue-400 hover:text-blue-300 text-sm">← Back to login</a>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-white/60 text-sm">Signing you in…</p>
      </div>
    </main>
  );
}
