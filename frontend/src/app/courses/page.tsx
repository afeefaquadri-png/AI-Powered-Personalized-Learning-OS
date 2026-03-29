"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { apiGet, ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { ProgressResponse, SubjectProgress } from "@/types/student";

// ─── Course data per subject ───────────────────────────────────────────────────

interface ExternalCourse {
  title: string;
  provider: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  url: string;
  description: string;
  providerColor: string;
}

const COURSES_BY_SUBJECT: Record<string, ExternalCourse[]> = {
  Mathematics: [
    {
      title: "Khan Academy Math",
      provider: "Khan Academy",
      level: "Beginner",
      duration: "Self-paced",
      url: "https://www.khanacademy.org/math",
      description: "Complete K–12 math curriculum with practice exercises and videos.",
      providerColor: "bg-green-500/15 text-green-400 border-green-500/20",
    },
    {
      title: "Mathematics for Machine Learning",
      provider: "Coursera",
      level: "Intermediate",
      duration: "~4 months",
      url: "https://www.coursera.org/specializations/mathematics-machine-learning",
      description: "Linear algebra, multivariate calculus, and PCA — foundation for data science.",
      providerColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    },
    {
      title: "Essence of Linear Algebra",
      provider: "YouTube (3Blue1Brown)",
      level: "Beginner",
      duration: "~4 hours",
      url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
      description: "Visual, intuitive introduction to linear algebra concepts.",
      providerColor: "bg-red-500/15 text-red-400 border-red-500/20",
    },
    {
      title: "Introduction to Calculus",
      provider: "edX (MIT)",
      level: "Intermediate",
      duration: "~13 weeks",
      url: "https://www.edx.org/course/calculus-1a-differentiation",
      description: "Rigorous single-variable calculus from MIT OpenCourseWare.",
      providerColor: "bg-violet-500/15 text-violet-400 border-violet-500/20",
    },
  ],
  Physics: [
    {
      title: "Khan Academy Physics",
      provider: "Khan Academy",
      level: "Beginner",
      duration: "Self-paced",
      url: "https://www.khanacademy.org/science/physics",
      description: "Forces, waves, energy, and electricity with worked examples.",
      providerColor: "bg-green-500/15 text-green-400 border-green-500/20",
    },
    {
      title: "The Feynman Lectures on Physics",
      provider: "Caltech (Free)",
      level: "Advanced",
      duration: "Self-paced",
      url: "https://www.feynmanlectures.caltech.edu/",
      description: "Legendary physics lectures by Nobel laureate Richard Feynman, free online.",
      providerColor: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    },
    {
      title: "How Things Work: An Introduction to Physics",
      provider: "Coursera (UVA)",
      level: "Beginner",
      duration: "~5 weeks",
      url: "https://www.coursera.org/learn/how-things-work",
      description: "Physics of everyday objects — bicycles, roller coasters, and more.",
      providerColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    },
    {
      title: "MIT 8.01 Classical Mechanics",
      provider: "MIT OpenCourseWare",
      level: "Advanced",
      duration: "Self-paced",
      url: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/",
      description: "Full undergraduate mechanics course with problem sets and exams.",
      providerColor: "bg-violet-500/15 text-violet-400 border-violet-500/20",
    },
  ],
  Chemistry: [
    {
      title: "Khan Academy Chemistry",
      provider: "Khan Academy",
      level: "Beginner",
      duration: "Self-paced",
      url: "https://www.khanacademy.org/science/chemistry",
      description: "Atoms, periodic table, reactions, and thermodynamics with exercises.",
      providerColor: "bg-green-500/15 text-green-400 border-green-500/20",
    },
    {
      title: "General Chemistry I",
      provider: "edX (MIT)",
      level: "Intermediate",
      duration: "~14 weeks",
      url: "https://www.edx.org/course/principles-of-chemical-science",
      description: "MIT's Principles of Chemical Science — structure and properties of matter.",
      providerColor: "bg-violet-500/15 text-violet-400 border-violet-500/20",
    },
    {
      title: "Crash Course Chemistry",
      provider: "YouTube",
      level: "Beginner",
      duration: "~10 hours",
      url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtPHzzYuWy6fYEaX9mQQ8oGr",
      description: "Fast-paced, entertaining intro to high school and AP Chemistry topics.",
      providerColor: "bg-red-500/15 text-red-400 border-red-500/20",
    },
    {
      title: "Organic Chemistry",
      provider: "Khan Academy",
      level: "Advanced",
      duration: "Self-paced",
      url: "https://www.khanacademy.org/science/organic-chemistry",
      description: "Functional groups, reactions, and mechanisms for organic chemistry.",
      providerColor: "bg-green-500/15 text-green-400 border-green-500/20",
    },
  ],
  Biology: [
    {
      title: "Khan Academy Biology",
      provider: "Khan Academy",
      level: "Beginner",
      duration: "Self-paced",
      url: "https://www.khanacademy.org/science/biology",
      description: "Cells, genetics, evolution, and ecology with interactive exercises.",
      providerColor: "bg-green-500/15 text-green-400 border-green-500/20",
    },
    {
      title: "Introduction to Biology",
      provider: "edX (MIT)",
      level: "Beginner",
      duration: "~16 weeks",
      url: "https://www.edx.org/course/introduction-to-biology-the-secret-of-life-3",
      description: "MIT's popular 7.00x — biochemistry, genetics, recombinant DNA, and genomics.",
      providerColor: "bg-violet-500/15 text-violet-400 border-violet-500/20",
    },
    {
      title: "Crash Course Biology",
      provider: "YouTube",
      level: "Beginner",
      duration: "~12 hours",
      url: "https://www.youtube.com/playlist?list=PL3EED4C1D684D3ADF",
      description: "40-episode series covering the full high school biology curriculum.",
      providerColor: "bg-red-500/15 text-red-400 border-red-500/20",
    },
    {
      title: "Genetics and Society: A Course for Educators",
      provider: "Coursera",
      level: "Intermediate",
      duration: "~6 weeks",
      url: "https://www.coursera.org/learn/genetics-society",
      description: "Modern genetics — CRISPR, gene editing, and ethical considerations.",
      providerColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    },
  ],
  English: [
    {
      title: "English Grammar and Essay Writing",
      provider: "Coursera (UC Berkeley)",
      level: "Beginner",
      duration: "~5 months",
      url: "https://www.coursera.org/specializations/english-for-science-technology-engineering-math",
      description: "Academic writing skills for STEM fields — clear, structured communication.",
      providerColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    },
    {
      title: "English for Career Development",
      provider: "Coursera (UPenn)",
      level: "Beginner",
      duration: "~4 weeks",
      url: "https://www.coursera.org/learn/careerdevelopment",
      description: "Professional English skills — writing, speaking, and career vocabulary.",
      providerColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    },
    {
      title: "Khan Academy Grammar",
      provider: "Khan Academy",
      level: "Beginner",
      duration: "Self-paced",
      url: "https://www.khanacademy.org/humanities/grammar",
      description: "Grammar fundamentals — sentences, punctuation, and parts of speech.",
      providerColor: "bg-green-500/15 text-green-400 border-green-500/20",
    },
    {
      title: "The Craft of Plot",
      provider: "Coursera (Wesleyan)",
      level: "Intermediate",
      duration: "~4 weeks",
      url: "https://www.coursera.org/learn/craft-of-plot",
      description: "Creative writing fundamentals — story structure, character, and conflict.",
      providerColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    },
  ],
  "Computer Science": [
    {
      title: "CS50: Introduction to Computer Science",
      provider: "edX (Harvard)",
      level: "Beginner",
      duration: "~12 weeks",
      url: "https://cs50.harvard.edu/x/",
      description: "Harvard's legendary intro to CS — scratch, C, Python, SQL, and web development.",
      providerColor: "bg-violet-500/15 text-violet-400 border-violet-500/20",
    },
    {
      title: "Python for Everybody",
      provider: "Coursera (Michigan)",
      level: "Beginner",
      duration: "~8 months",
      url: "https://www.coursera.org/specializations/python",
      description: "Full Python specialization — data structures, web scraping, and databases.",
      providerColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    },
    {
      title: "Khan Academy Computing",
      provider: "Khan Academy",
      level: "Beginner",
      duration: "Self-paced",
      url: "https://www.khanacademy.org/computing",
      description: "Computer science, programming, and internet fundamentals for beginners.",
      providerColor: "bg-green-500/15 text-green-400 border-green-500/20",
    },
    {
      title: "Algorithms Specialization",
      provider: "Coursera (Stanford)",
      level: "Advanced",
      duration: "~4 months",
      url: "https://www.coursera.org/specializations/algorithms",
      description: "Tim Roughgarden's definitive algorithms course — divide & conquer, graphs, NP.",
      providerColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    },
  ],
  History: [
    {
      title: "Khan Academy World History",
      provider: "Khan Academy",
      level: "Beginner",
      duration: "Self-paced",
      url: "https://www.khanacademy.org/humanities/world-history",
      description: "From the Big Bang to the modern era — comprehensive world history.",
      providerColor: "bg-green-500/15 text-green-400 border-green-500/20",
    },
    {
      title: "The Modern World: Global History Since 1760",
      provider: "Coursera (Virginia)",
      level: "Beginner",
      duration: "~10 weeks",
      url: "https://www.coursera.org/learn/modern-world",
      description: "How the world transformed from 1760 to the present day.",
      providerColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    },
    {
      title: "Crash Course World History",
      provider: "YouTube",
      level: "Beginner",
      duration: "~15 hours",
      url: "https://www.youtube.com/playlist?list=PLBDA2E52FB1EF80C9",
      description: "John Green's engaging 42-episode world history series.",
      providerColor: "bg-red-500/15 text-red-400 border-red-500/20",
    },
  ],
  Geography: [
    {
      title: "Our Earth's Future",
      provider: "Coursera (ANU)",
      level: "Beginner",
      duration: "~6 weeks",
      url: "https://www.coursera.org/learn/earth-environment",
      description: "Climate change, ecosystems, and the future of our planet.",
      providerColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    },
    {
      title: "Khan Academy Geography",
      provider: "Khan Academy",
      level: "Beginner",
      duration: "Self-paced",
      url: "https://www.khanacademy.org/humanities/ap-human-geography",
      description: "AP Human Geography — population, culture, political geography.",
      providerColor: "bg-green-500/15 text-green-400 border-green-500/20",
    },
    {
      title: "Geography Now (World Countries)",
      provider: "YouTube",
      level: "Beginner",
      duration: "Self-paced",
      url: "https://www.youtube.com/@GeographyNow",
      description: "Country-by-country geography breakdowns in an entertaining format.",
      providerColor: "bg-red-500/15 text-red-400 border-red-500/20",
    },
  ],
  Economics: [
    {
      title: "Khan Academy Economics",
      provider: "Khan Academy",
      level: "Beginner",
      duration: "Self-paced",
      url: "https://www.khanacademy.org/economics-finance-domain",
      description: "Micro and macroeconomics, finance, and market structures.",
      providerColor: "bg-green-500/15 text-green-400 border-green-500/20",
    },
    {
      title: "Economics for Non-Economists",
      provider: "Coursera (HSE)",
      level: "Beginner",
      duration: "~7 weeks",
      url: "https://www.coursera.org/learn/economics-for-non-economists",
      description: "How economic thinking applies to everyday decisions and policy.",
      providerColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    },
    {
      title: "Crash Course Economics",
      provider: "YouTube",
      level: "Beginner",
      duration: "~8 hours",
      url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtPGfCfSMJJhMpMp63f4wKdX",
      description: "35 episodes covering macro, micro, global trade, and financial systems.",
      providerColor: "bg-red-500/15 text-red-400 border-red-500/20",
    },
  ],
};

const DEFAULT_COURSES: ExternalCourse[] = [
  {
    title: "Learning How to Learn",
    provider: "Coursera (UCSD)",
    level: "Beginner",
    duration: "~4 weeks",
    url: "https://www.coursera.org/learn/learning-how-to-learn",
    description: "Science-backed techniques to learn anything faster and more effectively.",
    providerColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  },
  {
    title: "Khan Academy",
    provider: "Khan Academy",
    level: "Beginner",
    duration: "Self-paced",
    url: "https://www.khanacademy.org",
    description: "World-class education for anyone, anywhere — free and comprehensive.",
    providerColor: "bg-green-500/15 text-green-400 border-green-500/20",
  },
];

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Intermediate: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Advanced: "text-red-400 bg-red-500/10 border-red-500/20",
};

function CourseCard({ course }: { course: ExternalCourse }) {
  return (
    <a
      href={course.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-[#0d1424] border border-white/[0.07] rounded-2xl p-5 flex flex-col gap-3 hover:border-white/[0.18] hover:bg-[#111c35] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full border", course.providerColor)}>
          {course.provider}
        </span>
        <span className={cn("text-[11px] font-medium px-2 py-0.5 rounded-full border", LEVEL_COLORS[course.level])}>
          {course.level}
        </span>
      </div>

      {/* Title + description */}
      <div className="flex-1">
        <h3 className="font-semibold text-white text-sm leading-snug mb-1.5 group-hover:text-blue-300 transition-colors">
          {course.title}
        </h3>
        <p className="text-xs text-white/40 leading-relaxed">{course.description}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-white/[0.05]">
        <span className="text-xs text-white/30 flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M6 3.5v2.5l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          {course.duration}
        </span>
        <span className="text-xs text-blue-400 group-hover:text-blue-300 flex items-center gap-1 transition-colors">
          Open →
        </span>
      </div>
    </a>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function CoursesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useSupabaseAuth();
  const [subjects, setSubjects] = useState<SubjectProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSubject, setActiveSubject] = useState<string>("All");

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.push("/login"); return; }

    apiGet<ProgressResponse>(`/api/progress/${user.id}`)
      .then((data) => setSubjects(data.subjects))
      .catch((err) => {
        if (!(err instanceof ApiError && err.status === 404)) {
          console.error(err);
        }
      })
      .finally(() => setLoading(false));
  }, [user, authLoading, router]);

  // Build the list of subject names with courses
  const subjectNames = subjects
    .map((s) => s.subject_name)
    .filter((name) => COURSES_BY_SUBJECT[name]);

  const tabs = ["All", ...subjectNames];

  // Determine which courses to show
  const visibleSections: { subject: string; courses: ExternalCourse[] }[] =
    activeSubject === "All"
      ? subjectNames.length > 0
        ? subjectNames.map((name) => ({
            subject: name,
            courses: COURSES_BY_SUBJECT[name] ?? DEFAULT_COURSES,
          }))
        : [{ subject: "Recommended", courses: DEFAULT_COURSES }]
      : [
          {
            subject: activeSubject,
            courses: COURSES_BY_SUBJECT[activeSubject] ?? DEFAULT_COURSES,
          },
        ];

  if (authLoading || loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#080d1a]">
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
          <div className="h-8 w-48 bg-white/[0.07] rounded animate-pulse" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 w-24 bg-white/[0.05] rounded-full animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-44 bg-white/[0.04] rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#080d1a]">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Recommended Courses</h1>
          <p className="text-sm text-white/40 mt-1">
            Handpicked external resources that complement your subjects
          </p>
        </div>

        {/* Subject filter tabs */}
        {tabs.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubject(tab)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
                  activeSubject === tab
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-900/30"
                    : "text-white/50 border-white/10 hover:text-white/80 hover:border-white/20 bg-white/[0.03]"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Course sections */}
        <div className="space-y-10">
          {visibleSections.map(({ subject, courses }) => (
            <section key={subject}>
              {activeSubject === "All" && (
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-base font-semibold text-white">{subject}</h2>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                  <Link
                    href={`/learn/${subjects.find((s) => s.subject_name === subject)?.subject_id ?? ""}`}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Go to subject →
                  </Link>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {courses.map((course, i) => (
                  <CourseCard key={i} course={course} />
                ))}
              </div>
            </section>
          ))}
        </div>

      </div>
    </div>
  );
}
