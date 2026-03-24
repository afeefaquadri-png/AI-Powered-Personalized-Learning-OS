export interface Student {
  id: string;
  name: string;
  grade: string;
  background: string | null;
  interests: string[];
  marksheet_path: string | null;
  onboarding_completed: boolean;
}

export interface StudentProfile extends Student {
  board: string | null;
  learning_goals: string | null;
}

export interface OnboardingData {
  name: string;
  grade: string;
  board: string | null;
  background: string | null;
  interests: string[];
  learning_goals: string | null;
}

export interface SubjectProgress {
  subject_id: string;
  subject_name: string;
  chapters_completed: number;
  total_chapters: number;
  average_score: number | null;
  strengths: string[];
  weaknesses: string[];
}

export interface ProgressResponse {
  student_id: string;
  subjects: SubjectProgress[];
}
