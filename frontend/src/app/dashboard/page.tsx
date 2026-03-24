"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { apiGet, apiPost, ApiError } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import ProgressBar from "@/components/ProgressBar";
import { SUBJECT_EMOJIS } from "@/lib/constants";
import type { SubjectProgress, ProgressResponse, StudentProfile } from "@/types/student";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useSupabaseAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [subjects, setSubjects] = useState<SubjectProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.push("/login"); return; }

    async function load() {
      try {
        const prof = await apiGet<StudentProfile>("/api/onboarding/profile");
        setProfile(prof);
        if (!prof.onboarding_completed) {
          router.push("/onboarding");
          return;
        }
      } catch (err) {
        if (err instanceof ApiError) {
          if (err.status === 404) { router.push("/onboarding"); return; }
          if (err.status === 401) { router.push("/login"); return; }
        }
        setError("Failed to load profile. Please refresh.");
        setLoading(false);
        return;
      }

      try {
        const progress = await apiGet<ProgressResponse>(`/api/progress/${user!.id}`);
        setSubjects(progress.subjects);
      } catch (err) {
        if (!(err instanceof ApiError && err.status === 404)) {
          setError("Failed to load progress. Please refresh.");
        }
      }

      setLoading(false);
    }

    load();
  }, [user, authLoading, router]);

  // Supabase Realtime — re-fetch progress when student_progress table changes
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`progress:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "student_progress",
          filter: `student_id=eq.${user.id}`,
        },
        async () => {
          try {
            const progress = await apiGet<ProgressResponse>(`/api/progress/${user.id}`);
            setSubjects(progress.subjects);
          } catch {
            // Silently ignore — stale data is acceptable
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  async function handleGenerateCurriculum(subjectName: string) {
    setGenerating(subjectName);
    setError(null);
    try {
      await apiPost("/api/curriculum/generate", {
        subject_name: subjectName,
        difficulty_level: "beginner",
        board: profile?.board ?? null,
        grade: profile?.grade ?? null,
      });
      const progress = await apiGet<ProgressResponse>(`/api/progress/${user!.id}`);
      setSubjects(progress.subjects);
    } catch {
      setError(`Failed to generate curriculum for ${subjectName}. Please try again.`);
    } finally {
      setGenerating(null);
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  const pendingSubjects = profile?.interests?.filter(
    (interest) => !subjects.some((s) => s.subject_name === interest)
  ) ?? [];

  // Aggregate strengths and weaknesses across all subjects
  const allStrengths = subjects.flatMap((s) => s.strengths ?? []);
  const allWeaknesses = subjects.flatMap((s) => s.weaknesses ?? []);

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back{profile?.name ? `, ${profile.name}` : ""}! 👋
          </h1>
          {profile?.grade && (
            <p className="text-gray-500 mt-1">
              Grade {profile.grade}
              {profile.board && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                  {profile.board}
                </span>
              )}
              {" · Keep up the great work!"}
            </p>
          )}
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Active subjects with curricula */}
        {subjects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Subjects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <div
                  key={subject.subject_id}
                  className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-2xl">
                        {SUBJECT_EMOJIS[subject.subject_name] ?? "📚"}
                      </span>
                      <h3 className="font-semibold text-gray-900 mt-1">{subject.subject_name}</h3>
                    </div>
                    {subject.average_score !== null && (
                      <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {Math.round(subject.average_score)}%
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <ProgressBar
                      value={subject.chapters_completed}
                      max={subject.total_chapters || 1}
                      label={`${subject.chapters_completed} / ${subject.total_chapters} chapters`}
                    />
                  </div>
                  <Link
                    href={`/learn/${subject.subject_id}`}
                    className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                  >
                    {subject.chapters_completed === 0 ? "Start Learning" : "Continue"}
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Subjects from interests that have no curriculum yet */}
        {pendingSubjects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Ready to Start</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingSubjects.map((subjectName) => (
                <div
                  key={subjectName}
                  className="bg-white rounded-2xl border border-dashed border-gray-300 p-5"
                >
                  <span className="text-2xl">{SUBJECT_EMOJIS[subjectName] ?? "📚"}</span>
                  <h3 className="font-semibold text-gray-900 mt-1 mb-1">{subjectName}</h3>
                  <p className="text-xs text-gray-400 mb-4">
                    No curriculum yet. Click below to generate one with AI.
                  </p>
                  <button
                    onClick={() => handleGenerateCurriculum(subjectName)}
                    disabled={generating === subjectName}
                    className="w-full text-center border border-blue-600 text-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 disabled:opacity-50 transition"
                  >
                    {generating === subjectName ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full" />
                        Generating curriculum…
                      </span>
                    ) : (
                      "✨ Generate Curriculum"
                    )}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {subjects.length === 0 && pendingSubjects.length === 0 && !error && (
          <div className="text-center py-16 text-gray-500">
            <div className="text-5xl mb-4">📚</div>
            <p className="font-medium">No subjects yet.</p>
            <Link href="/onboarding" className="mt-4 inline-block text-blue-600 hover:underline text-sm">
              Complete onboarding to add subjects →
            </Link>
          </div>
        )}

        {/* Learning Profile — shown once activity evaluations have populated strengths/weaknesses */}
        {(allStrengths.length > 0 || allWeaknesses.length > 0) && (
          <section className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Learning Profile</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allStrengths.length > 0 && (
                <div className="bg-green-50 rounded-2xl border border-green-100 p-5">
                  <h3 className="font-semibold text-green-900 mb-3 text-sm uppercase tracking-wide">
                    Strengths
                  </h3>
                  <ul className="space-y-1.5">
                    {allStrengths.map((s, i) => (
                      <li key={i} className="text-sm text-green-800 flex gap-2 items-start">
                        <span className="text-green-500 mt-0.5">✓</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {allWeaknesses.length > 0 && (
                <div className="bg-amber-50 rounded-2xl border border-amber-100 p-5">
                  <h3 className="font-semibold text-amber-900 mb-3 text-sm uppercase tracking-wide">
                    Areas to Improve
                  </h3>
                  <ul className="space-y-1.5">
                    {allWeaknesses.map((w, i) => (
                      <li key={i} className="text-sm text-amber-800 flex gap-2 items-start">
                        <span className="text-amber-500 mt-0.5">→</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
