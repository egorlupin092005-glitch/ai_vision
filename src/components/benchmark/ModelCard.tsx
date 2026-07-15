"use client";

import React from "react";
import GlassCard from "@/components/glass/GlassCard";
import type { BenchmarkModel, BenchmarkTab } from "@/types/benchmark";

interface Props {
  model: BenchmarkModel;
  rank: number;
  category: BenchmarkTab;
}

const MEDALS = ["#FFD700", "#C0C0C0", "#CD7F32"];

function getScore(model: BenchmarkModel, category: BenchmarkTab): number {
  if (category === "composite") return model.composite;
  return model[category] ?? 0;
}

export default function ModelCard({ model, rank, category }: Props) {
  const score = getScore(model, category);
  const sparkline = model.trend;
  const min = Math.min(...sparkline);
  const max = Math.max(...sparkline);
  const range = max - min || 1;
  const normalized = sparkline.map((v) => ((v - min) / range) * 36);
  const points = normalized.map((v, i) => `${(i / (normalized.length - 1)) * 100},${36 - v}`).join(" ");
  const trendUp = sparkline[sparkline.length - 1] > sparkline[0];

  return (
    <GlassCard>
      <div className="flex items-start justify-between mb-3">
        <span className="text-lg font-bold font-mono" style={{ color: MEDALS[rank - 1] }}>
          #{rank}
        </span>
        <span className="pill text-[10px]">{model.provider}</span>
      </div>

      <h3 className="text-base font-semibold text-text-primary mb-3 leading-tight">
        {model.model}
      </h3>

      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-3xl font-mono font-bold text-text-primary tracking-tight">
          {score.toFixed(1)}
        </span>
        <span className="text-xs font-mono text-text-muted">
          {category === "composite" ? "composite" : category}
        </span>
      </div>

      <div className="relative">
        <svg viewBox="0 0 100 36" className="w-full h-9">
          <defs>
            <linearGradient id={`grad-${rank}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          <polyline
            points={points.replace(/,/g, " ")}
            fill="none"
            stroke={trendUp ? "rgba(52,199,89,0.6)" : "rgba(255,59,48,0.6)"}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="absolute top-0 right-0">
          <span className={`text-xs font-mono ${trendUp ? "text-accent-success" : "text-accent-error"}`}>
            {trendUp ? "↑" : "↓"}
          </span>
        </div>
      </div>
    </GlassCard>
  );
}
