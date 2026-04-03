import Link from "next/link";
import { cn } from "@/lib/utils";
import { getVisual } from "./subject-visuals";
import type { SubjectProgress } from "@/types/student";

interface SubjectCardProps {
  subject: SubjectProgress;
  onGenerate: (name: string) => void;
  generating: string | null;
}

function StatusBadge({ pct, isReady }: { pct: number; isReady: boolean }) {
  if (!isReady) return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-white/30 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
      Pending
    </span>
  );
  if (pct === 100) return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      Completed
    </span>
  );
  if (pct > 0) return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
      In Progress
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
      Not Started
    </span>
  );
}

export default function SubjectCard({ subject, onGenerate, generating }: SubjectCardProps) {
  const visual = getVisual(subject.subject_name);
  const pct = subject.total_chapters > 0
    ? Math.round((subject.chapters_completed / subject.total_chapters) * 100)
    : 0;
  const isReady = subject.total_chapters > 0;
  const isGenerating = generating === subject.subject_name;

  return (
    <div className="group bg-[#0d1424] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.18] transition-all duration-300 hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1">
      {/* Visual header */}
      <div className={cn("relative h-32 bg-gradient-to-br overflow-hidden", visual.bg)}>
        <div className="absolute inset-0 p-4 transition-transform duration-500 group-hover:scale-105">
          {visual.svg}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4">
          <span className={cn("text-xs font-semibold uppercase tracking-wider", visual.accent)}>
            {subject.subject_name}
          </span>
        </div>
        {isReady && (
          <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-bold text-white/80">
            {pct}%
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        {isReady ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <StatusBadge pct={pct} isReady={isReady} />
              {subject.average_score !== null && (
                <span className="text-xs font-semibold text-white/50">
                  ⭐ {Math.round(subject.average_score)}%
                </span>
              )}
            </div>
            <p className="text-xs text-white/30 mb-3">
              {subject.chapters_completed} / {subject.total_chapters} chapters
            </p>
            <div className="h-1.5 bg-white/[0.06] rounded-full mb-4 overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-700",
                  pct === 100
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                    : "bg-gradient-to-r from-blue-500 to-blue-400"
                )}
                style={{ width: `${pct}%` }}
              />
            </div>
            <Link
              href={`/learn/${subject.subject_id}`}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                pct === 100
                  ? "bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/20"
                  : pct > 0
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 hover:shadow-blue-700/40"
                  : "bg-white/[0.07] hover:bg-white/[0.12] text-white border border-white/10"
              )}
            >
              {pct === 100 ? "Review" : pct === 0 ? "Start Learning" : "Continue"} →
            </Link>
          </>
        ) : (
          <>
            <div className="mb-2">
              <StatusBadge pct={pct} isReady={false} />
            </div>
            <p className="text-xs text-white/30 mb-3">
              {isGenerating ? "Building your personalized curriculum…" : "AI curriculum not generated yet"}
            </p>
            <button
              onClick={() => onGenerate(subject.subject_name)}
              disabled={isGenerating}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                "bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/30"
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
