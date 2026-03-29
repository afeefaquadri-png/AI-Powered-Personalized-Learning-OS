import Link from "next/link";
import { cn } from "@/lib/utils";
import { getVisual } from "./subject-visuals";
import type { SubjectProgress } from "@/types/student";

interface SubjectCardProps {
  subject: SubjectProgress;
  onGenerate: (name: string) => void;
  generating: string | null;
}

export default function SubjectCard({ subject, onGenerate, generating }: SubjectCardProps) {
  const visual = getVisual(subject.subject_name);
  const pct = subject.total_chapters > 0
    ? Math.round((subject.chapters_completed / subject.total_chapters) * 100)
    : 0;
  const isReady = subject.total_chapters > 0;
  const isGenerating = generating === subject.subject_name;

  return (
    <div className="group bg-[#0d1424] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.14] transition-all duration-200 hover:shadow-xl hover:shadow-black/30">
      {/* Visual header */}
      <div className={cn("relative h-32 bg-gradient-to-br overflow-hidden", visual.bg)}>
        <div className="absolute inset-0 p-4">
          {visual.svg}
        </div>
        <div className="absolute bottom-3 left-4">
          <span className={cn("text-xs font-semibold uppercase tracking-wider", visual.accent)}>
            {subject.subject_name}
          </span>
        </div>
        {isReady && (
          <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-medium text-white/70">
            {pct}%
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        {isReady ? (
          <>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-white/40">
                {subject.chapters_completed} / {subject.total_chapters} chapters
              </span>
              {subject.average_score !== null && (
                <span className="text-xs font-semibold text-white/60">
                  Score: {Math.round(subject.average_score)}%
                </span>
              )}
            </div>
            <div className="h-1 bg-white/[0.06] rounded-full mb-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
            <Link
              href={`/learn/${subject.subject_id}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-white/[0.06] hover:bg-white/[0.1] text-white transition-colors duration-150"
            >
              {pct === 0 ? "Start Learning" : "Continue"} →
            </Link>
          </>
        ) : (
          <>
            <p className="text-xs text-white/30 mb-3">
              {isGenerating ? "Building your curriculum…" : "Curriculum not generated yet"}
            </p>
            <button
              onClick={() => onGenerate(subject.subject_name)}
              disabled={isGenerating}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                "bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isGenerating ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Generating…
                </>
              ) : (
                <><span className="opacity-70">✦</span> Build Curriculum</>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
