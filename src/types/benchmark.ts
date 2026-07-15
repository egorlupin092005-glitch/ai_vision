export interface BenchmarkModel {
  model: string;
  provider: string;
  composite: number;
  coding: number;
  reasoning: number;
  knowledge: number;
  math: number;
  agentic: number;
  trend: number[];
}

export type BenchmarkTab = "composite" | "coding" | "reasoning" | "knowledge" | "math" | "agentic";

export const CATEGORIES: { key: BenchmarkTab; label: string }[] = [
  { key: "composite", label: "Overall" },
  { key: "coding", label: "Coding" },
  { key: "reasoning", label: "Reasoning" },
  { key: "knowledge", label: "Knowledge" },
  { key: "math", label: "Math" },
  { key: "agentic", label: "Agentic" },
];
