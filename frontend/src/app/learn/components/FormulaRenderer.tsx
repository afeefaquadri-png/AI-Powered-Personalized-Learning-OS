"use client";

import { useEffect, useRef } from "react";

interface FormulaRendererProps {
  latex: string;
  block?: boolean;
}

export default function FormulaRenderer({ latex, block = false }: FormulaRendererProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      if (!ref.current) return;
      try {
        const katex = (await import("katex")).default;
        if (!cancelled && ref.current) {
          katex.render(latex, ref.current, {
            displayMode: block,
            throwOnError: false,
          });
        }
      } catch {
        if (!cancelled && ref.current) {
          ref.current.textContent = latex;
        }
      }
    }

    render();
    return () => { cancelled = true; };
  }, [latex, block]);

  if (block) {
    return (
      <div className="my-4 overflow-x-auto text-center">
        <span ref={ref as React.RefObject<HTMLSpanElement>} className="text-gray-800" />
      </div>
    );
  }

  return <span ref={ref as React.RefObject<HTMLSpanElement>} className="text-gray-800" />;
}
