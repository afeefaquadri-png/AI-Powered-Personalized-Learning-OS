"use client";

interface DiagramRendererProps {
  mermaidCode: string;
}

export default function DiagramRenderer({ mermaidCode }: DiagramRendererProps) {
  // TODO: Render Mermaid.js diagrams
  return (
    <div className="my-4 rounded border p-4 bg-gray-50">
      <pre>{mermaidCode}</pre>
    </div>
  );
}
