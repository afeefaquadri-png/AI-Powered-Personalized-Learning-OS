"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { supabase } from "@/lib/supabase";

export default function Nav() {
  const router = useRouter();
  const { user, loading } = useSupabaseAuth();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <nav className="bg-white border-b px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-10">
      <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
        <span className="text-xl font-bold text-blue-600">LearnOS</span>
        <span className="hidden sm:block text-xs text-gray-400 font-normal">AI Learning</span>
      </Link>

      <div className="flex items-center gap-3">
        {!loading && (
          <>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm text-gray-600 hover:text-gray-900 hidden sm:block"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
