"use client";

import { useEffect, useRef } from "react";

interface DiagramRendererProps {
  mermaidCode: string;
}

export default function DiagramRenderer({ mermaidCode }: DiagramRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      if (!containerRef.current || !mermaidCode.trim()) return;

      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "default",
          securityLevel: "loose",
        });

        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, mermaidCode);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch {
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = `<pre class="text-xs text-gray-500 overflow-auto">${mermaidCode}</pre>`;
        }
      }
    }

    render();
    return () => { cancelled = true; };
  }, [mermaidCode]);

  return (
    <div className="my-4 rounded-xl border border-gray-200 bg-gray-50 p-4 overflow-x-auto">
      <div ref={containerRef} className="flex justify-center" />
    </div>
  );
}
