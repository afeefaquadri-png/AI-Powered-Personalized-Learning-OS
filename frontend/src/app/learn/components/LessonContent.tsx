"use client";

import DiagramRenderer from "./DiagramRenderer";
import FormulaRenderer from "./FormulaRenderer";

interface LessonContentProps {
  contentHtml: string;
  diagrams: string[];
  formulas: string[];
  keyConcepts: string[];
  summary: string;
}

export default function LessonContent({
  contentHtml,
  diagrams,
  formulas,
  keyConcepts,
  summary,
}: LessonContentProps) {
  return (
    <article className="prose prose-gray max-w-none">
      {/* Main content */}
      <div
        className="leading-relaxed"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Diagrams */}
      {diagrams.length > 0 && (
        <section className="not-prose mt-6">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Diagrams</h3>
          <div className="space-y-4">
            {diagrams.map((diagram, i) => (
              <DiagramRenderer key={i} mermaidCode={diagram} />
            ))}
          </div>
        </section>
      )}

      {/* Formulas */}
      {formulas.length > 0 && (
        <section className="not-prose mt-6">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Key Formulas</h3>
          <div className="space-y-3">
            {formulas.map((formula, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                <FormulaRenderer latex={formula} block />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key concepts */}
      {keyConcepts.length > 0 && (
        <section className="not-prose mt-6">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Key Concepts</h3>
          <ul className="space-y-2">
            {keyConcepts.map((concept, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-blue-500 mt-0.5 flex-shrink-0">•</span>
                <span>{concept}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Summary */}
      {summary && (
        <section className="not-prose mt-6 bg-blue-50 border border-blue-100 rounded-xl p-5">
          <h3 className="text-base font-semibold text-blue-900 mb-2">Chapter Summary</h3>
          <p className="text-sm text-blue-800 leading-relaxed">{summary}</p>
        </section>
      )}
    </article>
  );
}
