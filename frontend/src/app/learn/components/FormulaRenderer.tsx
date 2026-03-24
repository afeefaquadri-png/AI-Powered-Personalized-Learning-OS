"use client";

interface FormulaRendererProps {
  latex: string;
  block?: boolean;
}

export default function FormulaRenderer({ latex, block = false }: FormulaRendererProps) {
  // TODO: Render LaTeX formulas via KaTeX
  return (
    <span className={block ? "block my-4 text-center" : "inline"}>
      {latex}
    </span>
  );
}
