"use client";

import React, { useState } from "react";
import { ArrowUpDown, TrendingUp, TrendingDown, Minus, Code, Brain, BookOpen, Calculator, Bot } from "lucide-react";
import type { BenchmarkModel, BenchmarkTab } from "@/types/benchmark";

interface Props {
  data: BenchmarkModel[];
  category: BenchmarkTab;
}

type SortKey = "model" | "composite" | "provider";

function getScore(model: BenchmarkModel, category: BenchmarkTab): number {
  if (category === "composite") return model.composite;
  return model[category] ?? 0;
}

function TrendIcon({ trend }: { trend: number[] }) {
  const last = trend[trend.length - 1];
  const first = trend[0];
  if (last > first) return <TrendingUp size={12} className="text-accent-success" />;
  if (last < first) return <TrendingDown size={12} className="text-accent-error" />;
  return <Minus size={12} className="text-text-muted" />;
}

const CATEGORY_MINIS: Record<string, React.ReactNode> = {
  coding: <Code size={11} />,
  reasoning: <Brain size={11} />,
  knowledge: <BookOpen size={11} />,
  math: <Calculator size={11} />,
  agentic: <Bot size={11} />,
};

export default function LeaderboardTable({ data, category }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("composite");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  const sorted = [...data].sort((a, b) => {
    const m = sortOrder === "desc" ? 1 : -1;
    if (sortKey === "model") return m * a.model.localeCompare(b.model);
    if (sortKey === "provider") return m * a.provider.localeCompare(b.provider);
    return m * (getScore(a, category) - getScore(b, category));
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-subtle">
            <th className="text-left pb-3 pr-2 font-normal w-8">
              <span className="text-xs font-mono text-text-muted uppercase tracking-wider">#</span>
            </th>
            <th className="text-left pb-3 pr-3 font-normal">
              <button
                onClick={() => handleSort("model")}
                className={`inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider transition-colors ${
                  sortKey === "model" ? "text-text-primary" : "text-text-muted hover:text-text-secondary"
                }`}
              >
                Model
                <ArrowUpDown size={11} />
              </button>
            </th>
            <th className="text-left pb-3 pr-3 font-normal hidden sm:table-cell">
              <button
                onClick={() => handleSort("provider")}
                className={`inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider transition-colors ${
                  sortKey === "provider" ? "text-text-primary" : "text-text-muted hover:text-text-secondary"
                }`}
              >
                Provider
                <ArrowUpDown size={11} />
              </button>
            </th>
            <th className="text-right pb-3 pr-3 font-normal">
              <span className="text-xs font-mono text-text-muted uppercase tracking-wider flex items-center gap-1 justify-end">
                {category !== "composite" && CATEGORY_MINIS[category]}
                {category === "composite" ? "Score" : category}
              </span>
            </th>
            <th className="text-right pb-3 font-normal w-10">
              <span className="text-xs font-mono text-text-muted uppercase tracking-wider">Trend</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((entry, i) => {
            const score = getScore(entry, category);
            return (
              <tr
                key={entry.model}
                className="border-b border-border-subtle last:border-0 transition-colors hover:bg-glass-bg-hover"
              >
                <td className="py-2.5 pr-2 text-xs font-mono text-text-muted">{i + 1}</td>
                <td className="py-2.5 pr-3">
                  <span className="font-medium text-text-primary text-sm">{entry.model}</span>
                </td>
                <td className="py-2.5 pr-3 hidden sm:table-cell">
                  <span className="pill text-[10px]">{entry.provider}</span>
                </td>
                <td className="py-2.5 pr-3 text-right">
                  <span className="font-mono font-semibold text-text-primary tabular-nums">
                    {score.toFixed(1)}
                  </span>
                </td>
                <td className="py-2.5 text-right">
                  <div className="flex items-center justify-end">
                    <TrendIcon trend={entry.trend} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
