export interface ChapterSummary {
  id: string | null;
  order_index: number;
  title: string;
  description: string;
  status: "locked" | "available" | "in_progress" | "completed";
}

export interface Curriculum {
  subject_id: string;
  subject_name: string;
  chapters: ChapterSummary[];
}
