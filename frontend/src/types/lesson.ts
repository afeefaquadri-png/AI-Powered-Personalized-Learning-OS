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
