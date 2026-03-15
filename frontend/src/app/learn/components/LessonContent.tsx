"use client";

interface LessonContentProps {
  contentHtml: string;
  diagrams: string[];
  formulas: string[];
  keyConcepts: string[];
  summary: string;
}

export default function LessonContent({ contentHtml, diagrams, formulas, keyConcepts, summary }: LessonContentProps) {
  // TODO: Render lesson content with Mermaid diagrams and KaTeX formulas
  return (
    <div className="prose max-w-none">
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
