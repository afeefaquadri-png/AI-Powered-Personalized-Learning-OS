// Subject visual backgrounds and SVG decorations for dashboard cards

export interface SubjectVisual {
  bg: string;
  accent: string;
  svg: React.ReactNode;
}

export const SUBJECT_VISUALS: Record<string, SubjectVisual> = {
  Mathematics: {
    bg: "from-blue-950/80 to-indigo-950/80",
    accent: "text-blue-400",
    svg: (
      <svg viewBox="0 0 200 120" fill="none" className="w-full h-full opacity-30">
        <path d="M0 80 Q50 20 100 60 Q150 100 200 40" stroke="#60a5fa" strokeWidth="2" fill="none" />
        <path d="M0 100 Q50 40 100 80 Q150 120 200 60" stroke="#818cf8" strokeWidth="1.5" fill="none" />
        <path d="M0 60 Q50 0 100 40 Q150 80 200 20" stroke="#38bdf8" strokeWidth="1" fill="none" />
        <circle cx="100" cy="60" r="4" fill="#60a5fa" />
        <circle cx="50" cy="35" r="2.5" fill="#818cf8" />
        <circle cx="150" cy="85" r="2.5" fill="#38bdf8" />
      </svg>
    ),
  },
  Physics: {
    bg: "from-violet-950/80 to-purple-950/80",
    accent: "text-violet-400",
    svg: (
      <svg viewBox="0 0 200 120" fill="none" className="w-full h-full opacity-30">
        <ellipse cx="100" cy="60" rx="80" ry="30" stroke="#a78bfa" strokeWidth="1.5" />
        <ellipse cx="100" cy="60" rx="80" ry="30" stroke="#c4b5fd" strokeWidth="1" transform="rotate(60 100 60)" />
        <ellipse cx="100" cy="60" rx="80" ry="30" stroke="#7c3aed" strokeWidth="1" transform="rotate(120 100 60)" />
        <circle cx="100" cy="60" r="8" fill="#a78bfa" opacity="0.8" />
        <circle cx="180" cy="60" r="4" fill="#c4b5fd" />
        <circle cx="20" cy="60" r="3" fill="#7c3aed" />
      </svg>
    ),
  },
  Chemistry: {
    bg: "from-emerald-950/80 to-teal-950/80",
    accent: "text-emerald-400",
    svg: (
      <svg viewBox="0 0 200 120" fill="none" className="w-full h-full opacity-30">
        <path d="M80 60 L100 30 L120 60 L120 90 L100 105 L80 90 Z" stroke="#34d399" strokeWidth="1.5" fill="none" />
        <path d="M100 30 L100 10" stroke="#34d399" strokeWidth="1.5" />
        <path d="M120 60 L140 50" stroke="#34d399" strokeWidth="1.5" />
        <path d="M120 90 L140 100" stroke="#34d399" strokeWidth="1.5" />
        <path d="M80 90 L60 100" stroke="#34d399" strokeWidth="1.5" />
        <path d="M80 60 L60 50" stroke="#34d399" strokeWidth="1.5" />
        <circle cx="100" cy="10" r="4" fill="#6ee7b7" />
        <circle cx="144" cy="50" r="4" fill="#6ee7b7" />
        <circle cx="144" cy="100" r="4" fill="#6ee7b7" />
        <circle cx="56" cy="100" r="4" fill="#6ee7b7" />
        <circle cx="56" cy="50" r="4" fill="#6ee7b7" />
        <circle cx="100" cy="110" r="4" fill="#6ee7b7" />
      </svg>
    ),
  },
  English: {
    bg: "from-amber-950/80 to-orange-950/80",
    accent: "text-amber-400",
    svg: (
      <svg viewBox="0 0 200 120" fill="none" className="w-full h-full opacity-30">
        <rect x="50" y="15" width="100" height="90" rx="4" stroke="#fbbf24" strokeWidth="1.5" />
        <path d="M100 15 L100 105" stroke="#f59e0b" strokeWidth="1" />
        <path d="M65 40 L95 40M65 55 L95 55M65 70 L95 70M65 85 L88 85" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M105 40 L135 40M105 55 L135 55M105 70 L128 70" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  Biology: {
    bg: "from-green-950/80 to-lime-950/80",
    accent: "text-green-400",
    svg: (
      <svg viewBox="0 0 200 120" fill="none" className="w-full h-full opacity-30">
        <path d="M100 10 Q140 30 140 60 Q140 90 100 110 Q60 90 60 60 Q60 30 100 10Z" stroke="#4ade80" strokeWidth="1.5" fill="none" />
        <path d="M100 10 Q60 30 60 60 Q60 90 100 110" stroke="#86efac" strokeWidth="1" />
        <circle cx="100" cy="60" r="5" fill="#4ade80" opacity="0.8" />
      </svg>
    ),
  },
  "Computer Science": {
    bg: "from-cyan-950/80 to-sky-950/80",
    accent: "text-cyan-400",
    svg: (
      <svg viewBox="0 0 200 120" fill="none" className="w-full h-full opacity-30">
        <rect x="30" y="25" width="140" height="80" rx="6" stroke="#22d3ee" strokeWidth="1.5" />
        <path d="M55 65 L75 45 L90 60 L105 40 L120 55 L135 35 L150 50" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="75" cy="45" r="2.5" fill="#67e8f9" />
        <circle cx="105" cy="40" r="2.5" fill="#67e8f9" />
        <circle cx="135" cy="35" r="2.5" fill="#67e8f9" />
      </svg>
    ),
  },
};

export const DEFAULT_VISUAL: SubjectVisual = {
  bg: "from-slate-900/80 to-slate-800/80",
  accent: "text-slate-400",
  svg: (
    <svg viewBox="0 0 200 120" fill="none" className="w-full h-full opacity-20">
      <path d="M40 90 L80 40 L120 70 L160 30" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="80" cy="40" r="4" fill="#94a3b8" />
      <circle cx="120" cy="70" r="4" fill="#94a3b8" />
      <circle cx="160" cy="30" r="4" fill="#94a3b8" />
    </svg>
  ),
};

export function getVisual(name: string): SubjectVisual {
  return SUBJECT_VISUALS[name] ?? DEFAULT_VISUAL;
}
