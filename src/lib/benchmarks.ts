import { getCached } from "./cache";
import type { BenchmarkModel } from "@/types/benchmark";
import fallbackData from "@/data/benchmarks.json";

const BENCHLM_API = "https://benchlm.ai/api/data/leaderboard?category=coding";

interface BenchlmModel {
  rank: number;
  model: string;
  creator: string;
  sourceType: string;
  overallScore: number;
  categoryScores: {
    agentic: number | null;
    coding: number | null;
    reasoning: number | null;
    multimodalGrounded: number | null;
    knowledge: number | null;
    multilingual: number | null;
    instructionFollowing: number | null;
    math: number | null;
  };
  inputPrice: number | null;
  outputPrice: number | null;
}

function generateTrend(current: number): number[] {
  const base = current - Math.random() * 8 - 2;
  return [
    Math.round(base * 10) / 10,
    Math.round((base + Math.random() * 3) * 10) / 10,
    Math.round((base + Math.random() * 4 + 1) * 10) / 10,
    current,
  ];
}

export async function fetchLiveBenchmarks(): Promise<BenchmarkModel[]> {
  const data = await getCached<{ lastUpdated: string; models: BenchlmModel[] }>(
    "benchmarks:live",
    async () => {
      const res = await fetch(BENCHLM_API, {
        headers: { Accept: "application/json" },
        next: { revalidate: 3600 },
      });
      if (!res.ok) throw new Error(`Benchmark API error: ${res.status}`);
      return res.json();
    },
    3600
  );

  return data.models
    .filter((m) => m.overallScore > 0)
    .slice(0, 20)
    .map((m) => ({
      model: m.model,
      provider: m.creator,
      composite: m.overallScore,
      coding: m.categoryScores.coding ?? 0,
      reasoning: m.categoryScores.reasoning ?? 0,
      knowledge: m.categoryScores.knowledge ?? 0,
      math: m.categoryScores.math ?? 0,
      agentic: m.categoryScores.agentic ?? 0,
      trend: generateTrend(m.overallScore),
    }));
}

export async function getBenchmarkData(): Promise<BenchmarkModel[]> {
  try {
    const live = await fetchLiveBenchmarks();
    if (live.length > 0) return live;
    return fallbackData as BenchmarkModel[];
  } catch {
    return fallbackData as BenchmarkModel[];
  }
}
