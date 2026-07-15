"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { BenchmarkModel, BenchmarkTab } from "@/types/benchmark";

interface Props {
  data: BenchmarkModel[];
  category: BenchmarkTab;
}

function getScore(model: BenchmarkModel, category: BenchmarkTab): number {
  if (category === "composite") return model.composite;
  return model[category] ?? 0;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card rounded-xl px-4 py-3 text-sm">
      <p className="text-text-muted font-mono text-xs mb-1">{payload[0].name}</p>
      <p className="text-text-primary font-semibold font-mono">
        {payload[0].value.toFixed(1)}
      </p>
    </div>
  );
};

export default function BenchmarkChart({ data, category }: Props) {
  const chartData = data.map((m) => ({
    model: m.model,
    score: getScore(m, category),
  }));

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.06)"
            vertical={false}
          />
          <XAxis
            dataKey="model"
            tick={{ fill: "#888", fontSize: 10, fontFamily: "JetBrains Mono" }}
            axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
            tickLine={false}
            interval={0}
            angle={-25}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tick={{ fill: "#888", fontSize: 11, fontFamily: "JetBrains Mono" }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar
            dataKey="score"
            fill="rgba(255,255,255,0.8)"
            radius={[4, 4, 0, 0]}
            maxBarSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
