"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function ActivityPanel({ chapterId }: { chapterId: string }) {
  const params = useParams();
  const subjectId = params?.subjectId as string;

  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">📝</span>
        <h3 className="font-semibold text-green-900">Chapter Quiz</h3>
      </div>
      <p className="text-sm text-green-700 mb-4">
        Ready to test your understanding? Take the AI-generated quiz for this chapter.
        Your answers will be evaluated with detailed feedback.
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
