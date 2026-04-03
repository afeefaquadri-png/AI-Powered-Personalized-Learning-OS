"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { apiGet, apiPost, invalidateCache } from "@/lib/api";

interface Question {
  id: string;
  type: "multiple_choice" | "short_answer" | "problem";
  question: string;
  options?: string[];
  hint?: string;
}

interface ActivityData {
  activity_id: string;
  type: string;
  status: string;
  prompt: {
    title: string;
    instructions: string;
    questions: Question[];
  };
}

interface QuestionFeedback {
  question_id: string;
  status: "correct" | "incorrect" | "partial";
  correct_answer: string;
  explanation: string;
  student_answer_note: string;
}

interface ChapterReference {
  topic: string;
  why: string;
  what_to_do: string;
}

interface EvaluationResult {
  score: number;
  correctness: { overall: string; details: Record<string, string> };
  feedback: string;
  guidance: string;
  question_feedback: QuestionFeedback[];
  chapter_references: ChapterReference[];
  study_plan: string[];
  strengths: string[];
  areas_for_improvement: string[];
}

export default function ActivityPage({
  params,
}: {
  params: { subjectId: string; chapterId: string };
}) {
  const router = useRouter();
  const { user, loading: authLoading } = useSupabaseAuth();
  const [activity, setActivity] = useState<ActivityData | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<"quiz" | "submitted" | "evaluated">("quiz");

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.push("/login"); return; }

    let pollTimer: ReturnType<typeof setInterval> | null = null;

    async function loadActivity() {
      try {
        const data = await apiGet<ActivityData & { status?: string }>(`/api/activities/${params.chapterId}/activity`, 0);
        if (data.status === "generating") {
          // Poll every 5s until quiz is ready
          pollTimer = setInterval(async () => {
            try {
              const polled = await apiGet<ActivityData & { status?: string }>(`/api/activities/${params.chapterId}/activity`, 0);
              if (polled.status !== "generating") {
                clearInterval(pollTimer!); pollTimer = null;
                setActivity(polled as ActivityData);
                if (polled.status === "evaluated") setPhase("evaluated");
                else if (polled.status === "submitted") setPhase("submitted");
                setLoading(false);
              }
            } catch {
              clearInterval(pollTimer!); pollTimer = null;
              setError("Failed to generate quiz. Please go back and try again.");
              setLoading(false);
            }
          }, 5000);
        } else {
          setActivity(data);
          if (data.status === "evaluated") setPhase("evaluated");
          else if (data.status === "submitted") setPhase("submitted");
          setLoading(false);
        }
      } catch {
        setError("No quiz available yet. Open the lesson first to generate content.");
        setLoading(false);
      }
    }

    loadActivity();
    return () => { if (pollTimer) clearInterval(pollTimer); };
  }, [user, authLoading, params.chapterId, router]);

  function setResponse(questionId: string, value: string) {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  }

  async function handleSubmit() {
    if (!activity) return;
    const unanswered = activity.prompt.questions.filter((q) => !responses[q.id]);
    if (unanswered.length > 0) {
      setError(`Please answer all questions. (${unanswered.length} remaining)`);
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      await apiPost(`/api/activities/${activity.activity_id}/submit`, { responses });
      setPhase("submitted");

      // Immediately evaluate
      const result = await apiPost<EvaluationResult>(
        `/api/activities/${activity.activity_id}/evaluate`,
        {}
      );
      setEvaluation(result);
      setPhase("evaluated");
      // Invalidate cached progress and curriculum so dashboard updates immediately
      invalidateCache("/api/progress");
      invalidateCache("/api/curriculum");
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center flex-col gap-3">
        <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full" />
        <p className="text-sm text-gray-500">Generating your quiz…</p>
      </div>
    );
  }

  if (error && !activity) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">📝</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            href={`/learn/${params.subjectId}/${params.chapterId}`}
            className="text-blue-600 hover:underline text-sm"
          >
            ← Go back to the lesson
          </Link>
        </div>
      </div>
    );
  }

  if (!activity) return null;

  const scoreColor =
    (evaluation?.score ?? 0) >= 80
      ? "text-green-600"
      : (evaluation?.score ?? 0) >= 60
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={`/learn/${params.subjectId}/${params.chapterId}`}
            className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block"
          >
            ← Back to Lesson
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{activity.prompt.title}</h1>
          <p className="text-gray-500 text-sm mt-1">{activity.prompt.instructions}</p>
        </div>

        {/* Evaluation results */}
        {phase === "evaluated" && evaluation && (
          <div className="space-y-5 mb-6">
            {/* Score card */}
            <div className="bg-white rounded-2xl border shadow-sm p-6 text-center">
              <div className={`text-6xl font-bold ${scoreColor}`}>{evaluation.score}%</div>
              <div className={`text-base font-semibold mt-1 capitalize ${scoreColor}`}>
                {evaluation.correctness.overall}
              </div>
              <p className="text-gray-600 text-sm mt-3 max-w-md mx-auto">{evaluation.feedback}</p>

              {/* Strengths */}
              {evaluation.strengths?.length > 0 && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {evaluation.strengths.map((s, i) => (
                    <span key={i} className="text-xs bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-1">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Per-question breakdown */}
            {evaluation.question_feedback?.length > 0 && (
              <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 border-b bg-gray-50">
                  <h3 className="font-semibold text-gray-800 text-sm">Question Breakdown</h3>
                </div>
                <div className="divide-y">
                  {evaluation.question_feedback.map((qf, i) => (
                    <div key={qf.question_id} className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold ${
                          qf.status === "correct" ? "bg-green-100 text-green-700" :
                          qf.status === "partial" ? "bg-amber-100 text-amber-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {qf.status === "correct" ? "✓" : qf.status === "partial" ? "~" : "✗"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Q{i + 1}</span>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              qf.status === "correct" ? "bg-green-50 text-green-700" :
                              qf.status === "partial" ? "bg-amber-50 text-amber-700" :
                              "bg-red-50 text-red-700"
                            }`}>
                              {qf.status === "correct" ? "Correct" : qf.status === "partial" ? "Partial" : "Incorrect"}
                            </span>
                          </div>
                          {qf.student_answer_note && (
                            <p className="text-sm text-gray-600 mb-2">{qf.student_answer_note}</p>
                          )}
                          {qf.status !== "correct" && (
                            <div className="bg-blue-50 rounded-lg px-3 py-2 text-sm text-blue-800">
                              <span className="font-semibold">Correct answer: </span>{qf.correct_answer}
                            </div>
                          )}
                          {qf.explanation && (
                            <p className="text-xs text-gray-500 mt-2">{qf.explanation}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chapter references — what to re-read */}
            {evaluation.chapter_references?.length > 0 && (
              <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 border-b bg-amber-50">
                  <h3 className="font-semibold text-amber-900 text-sm">📖 What to Focus On in the Chapter</h3>
                </div>
                <div className="divide-y">
                  {evaluation.chapter_references.map((ref, i) => (
                    <div key={i} className="px-5 py-4">
                      <p className="text-sm font-semibold text-gray-800 mb-0.5">{ref.topic}</p>
                      <p className="text-xs text-gray-500 mb-2">{ref.why}</p>
                      <p className="text-sm text-amber-800 bg-amber-50 rounded-lg px-3 py-2">{ref.what_to_do}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Study plan */}
            {evaluation.study_plan?.length > 0 && (
              <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 border-b bg-violet-50">
                  <h3 className="font-semibold text-violet-900 text-sm">🎯 Your Study Plan</h3>
                </div>
                <div className="px-5 py-4 space-y-3">
                  {evaluation.study_plan.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3">
              <Link
                href={`/learn/${params.subjectId}/${params.chapterId}`}
                className="flex-1 text-center border border-gray-300 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
              >
                ← Review Lesson
              </Link>
              <Link
                href={`/learn/${params.subjectId}`}
                className="flex-1 text-center bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
              >
                Next Chapter →
              </Link>
            </div>
          </div>
        )}

        {/* Questions */}
        {phase !== "evaluated" && (
          <div className="space-y-5">
            {activity.prompt.questions.map((question, idx) => (
              <div key={question.id} className="bg-white rounded-2xl border shadow-sm p-5">
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-gray-900 text-sm font-medium leading-relaxed">{question.question}</p>
                </div>

                {question.type === "multiple_choice" && question.options && (
                  <div className="space-y-2 ml-10">
                    {question.options.map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name={question.id}
                          value={option.charAt(0)}
                          onChange={(e) => setResponse(question.id, e.target.value)}
                          checked={responses[question.id] === option.charAt(0)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {(question.type === "short_answer" || question.type === "problem") && (
                  <div className="ml-10">
                    {question.hint && (
                      <p className="text-xs text-amber-600 mb-2">💡 Hint: {question.hint}</p>
                    )}
                    <textarea
                      rows={3}
                      value={responses[question.id] ?? ""}
                      onChange={(e) => setResponse(question.id, e.target.value)}
                      placeholder="Write your answer here…"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                )}
              </div>
            ))}

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {phase === "submitted" && !evaluation && (
              <div className="text-center py-6 text-gray-500">
                <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-3" />
                <p className="text-sm">Evaluating your answers…</p>
              </div>
            )}

            {phase === "quiz" && (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {submitting ? "Submitting…" : "Submit Answers"}
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
