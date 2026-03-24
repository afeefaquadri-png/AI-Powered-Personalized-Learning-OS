"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { apiGet } from "@/lib/api";

interface Chapter {
  id: string;
  order_index: number;
  title: string;
  description: string;
  status: "locked" | "available" | "in_progress" | "completed";
}

interface CurriculumResponse {
  subject_id: string;
  subject_name: string;
  chapters: Chapter[];
}

const statusConfig = {
  locked: { icon: "🔒", label: "Locked", color: "text-gray-400 bg-gray-50 border-gray-200" },
  available: { icon: "▶️", label: "Start", color: "text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100" },
  in_progress: { icon: "📖", label: "Continue", color: "text-yellow-700 bg-yellow-50 border-yellow-200 hover:bg-yellow-100" },
  completed: { icon: "✅", label: "Review", color: "text-green-700 bg-green-50 border-green-200 hover:bg-green-100" },
};

export default function SubjectPage({ params }: { params: { subjectId: string } }) {
  const router = useRouter();
  const { user, loading: authLoading } = useSupabaseAuth();
  const [curriculum, setCurriculum] = useState<CurriculumResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.push("/login"); return; }

    apiGet<CurriculumResponse>(`/api/curriculum/${params.subjectId}`)
      .then(setCurriculum)
      .catch(() => setError("Failed to load curriculum. Please go back and try again."))
      .finally(() => setLoading(false));
  }, [user, authLoading, params.subjectId, router]);

  if (authLoading || loading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/dashboard" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  if (!curriculum) return null;

  const completedCount = curriculum.chapters.filter((c) => c.status === "completed").length;

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Back + header */}
        <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">
          ← Dashboard
        </Link>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{curriculum.subject_name}</h1>
          <p className="text-gray-500 mt-1">
            {completedCount} of {curriculum.chapters.length} chapters completed
          </p>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(completedCount / (curriculum.chapters.length || 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Chapter list */}
        <div className="space-y-3">
          {curriculum.chapters.map((chapter) => {
            const cfg = statusConfig[chapter.status];
            const isClickable = chapter.status !== "locked";

            const content = (
              <div
                className={`bg-white rounded-xl border p-5 flex items-center gap-4 transition ${
                  isClickable ? "cursor-pointer hover:shadow-md" : "opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg flex-shrink-0">
                  {chapter.order_index}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{chapter.title}</h3>
                  <p className="text-sm text-gray-500 truncate mt-0.5">{chapter.description}</p>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full border flex-shrink-0 ${cfg.color}`}>
                  {cfg.icon} {cfg.label}
                </span>
              </div>
            );

            return isClickable ? (
              <Link
                key={chapter.id}
                href={`/learn/${params.subjectId}/${chapter.id}`}
              >
                {content}
              </Link>
            ) : (
              <div key={chapter.id}>{content}</div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
