"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { apiGet } from "@/lib/api";
import type { Activity } from "@/types/lesson";

interface ActivityPanelProps {
  chapterId: string;
}

export default function ActivityPanel({ chapterId }: ActivityPanelProps) {
  const params = useParams();
  const subjectId = params?.subjectId as string;
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!chapterId) return;
    setLoading(true);
    setNotFound(false);

    apiGet<Activity>(`/api/activities/${chapterId}/activity`)
      .then((data) => setActivity(data))
      .catch((err) => {
        if (err?.status === 404) setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [chapterId]);

  if (loading) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex items-center gap-3">
        <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />
        <span className="text-sm text-gray-500">Checking quiz status…</span>
      </div>
    );
  }

  // No activity generated yet — lesson content must be viewed first
  if (notFound || !activity) {
    return (
      <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">📝</span>
          <h3 className="font-semibold text-gray-700">Chapter Quiz</h3>
        </div>
        <p className="text-sm text-gray-500">
          Read through the lesson above to unlock the chapter quiz. It will be generated automatically.
        </p>
      </div>
    );
  }

  // Activity submitted but not yet evaluated
  if (activity.status === "submitted") {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <div className="flex items-center gap-3">
          <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full" />
          <div>
            <h3 className="font-semibold text-blue-900">Quiz Submitted</h3>
            <p className="text-sm text-blue-700 mt-0.5">
              Your answers are being evaluated by AI. Refresh in a moment.
            </p>
          </div>
        </div>
        {subjectId && (
          <Link
            href={`/learn/${subjectId}/${chapterId}/activity`}
            className="mt-4 inline-block text-blue-700 text-sm font-medium hover:underline"
          >
            View submission →
          </Link>
        )}
      </div>
    );
  }

  // Activity already evaluated — show score summary
  if (activity.status === "evaluated" && activity.latest_score !== null) {
    const score = activity.latest_score;
    const scoreColor =
      score >= 90
        ? "text-green-700 bg-green-100 border-green-200"
        : score >= 70
        ? "text-blue-700 bg-blue-100 border-blue-200"
        : score >= 50
        ? "text-yellow-700 bg-yellow-100 border-yellow-200"
        : "text-red-700 bg-red-100 border-red-200";

    const scoreBg =
      score >= 90
        ? "bg-green-50 border-green-200"
        : score >= 70
        ? "bg-blue-50 border-blue-200"
        : score >= 50
        ? "bg-yellow-50 border-yellow-200"
        : "bg-red-50 border-red-200";

    const scoreLabel =
      score >= 90 ? "Excellent!" : score >= 70 ? "Good job!" : score >= 50 ? "Keep practicing" : "Review recommended";

    return (
      <div className={`rounded-xl border p-5 ${scoreBg}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{score >= 70 ? "🎉" : "📝"}</span>
            <div>
              <h3 className="font-semibold text-gray-900">Quiz Complete</h3>
              <p className="text-xs text-gray-500">{scoreLabel}</p>
            </div>
          </div>
          <span className={`text-xl font-bold px-3 py-1 rounded-full border ${scoreColor}`}>
            {score}%
          </span>
        </div>
        {subjectId && (
          <div className="flex gap-2 mt-3">
            <Link
              href={`/learn/${subjectId}/${chapterId}/activity`}
              className="flex-1 text-center bg-white border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
            >
              Review Answers
            </Link>
            {score < 70 && (
              <Link
                href={`/learn/${subjectId}/${chapterId}`}
                className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                Revisit Lesson
              </Link>
            )}
          </div>
        )}
      </div>
    );
  }

  // Activity is pending — ready to start
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">📝</span>
        <h3 className="font-semibold text-green-900">Chapter Quiz Ready</h3>
      </div>
      <p className="text-sm text-green-700 mb-4">
        Test your understanding with an AI-generated quiz. Your answers will be evaluated with detailed feedback.
      </p>
      {subjectId && (
        <Link
          href={`/learn/${subjectId}/${chapterId}/activity`}
          className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
        >
          Start Quiz →
        </Link>
      )}
    </div>
  );
}
