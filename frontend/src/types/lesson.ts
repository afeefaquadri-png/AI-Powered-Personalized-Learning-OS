export interface LessonContent {
  chapter_id: string;
  title: string;
  content_html: string;
  diagrams: string[];
  formulas: string[];
  key_concepts: string[];
  summary: string;
}

export interface ChatMessage {
  role: "student" | "tutor";
  content: string;
}

export interface ActivityQuestion {
  id: string;
  type: "multiple_choice" | "short_answer" | "problem";
  question: string;
  options?: string[];
  hint?: string;
  correct_answer?: string;
  explanation?: string;
  expected_concepts?: string[];
}

export interface ActivityPrompt {
  type: string;
  title: string;
  instructions: string;
  questions: ActivityQuestion[];
}

export interface Activity {
  activity_id: string;
  type: string;
  status: "pending" | "submitted" | "evaluated";
  latest_score: number | null;
  prompt: ActivityPrompt;
}

export interface ActivityEvaluation {
  score: number;
  correctness: {
    overall: string;
    details: Record<string, string>;
  };
  feedback: string;
  guidance: string;
  strengths?: string[];
  areas_for_improvement?: string[];
}
