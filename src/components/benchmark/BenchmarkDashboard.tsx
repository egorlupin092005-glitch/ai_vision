"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, Code, Brain, BookOpen, Calculator, Bot } from "lucide-react";
import GlassCard from "@/components/glass/GlassCard";
import GlassInput from "@/components/glass/GlassInput";
import BenchmarkChart from "./BenchmarkChart";
import LeaderboardTable from "./LeaderboardTable";
import ModelCard from "./ModelCard";
import type { BenchmarkModel, BenchmarkTab } from "@/types/benchmark";
import { CATEGORIES } from "@/types/benchmark";

interface Props {
  data: BenchmarkModel[];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  composite: <TrendingUp size={14} />,
  coding: <Code size={14} />,
  reasoning: <Brain size={14} />,
  knowledge: <BookOpen size={14} />,
  math: <Calculator size={14} />,
  agentic: <Bot size={14} />,
};

export default function BenchmarkDashboard({ data }: Props) {
  const [activeTab, setActiveTab] = useState<BenchmarkTab>("composite");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    if (!searchQuery) return data;
    const q = searchQuery.toLowerCase();
    return data.filter((m) => m.model.toLowerCase().includes(q) || m.provider.toLowerCase().includes(q));
  }, [data, searchQuery]);

  const sorted = useMemo(() => [...filtered].sort((a, b) => b.composite - a.composite), [filtered]);

  const top3 = sorted.slice(0, 3);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={16} className="text-accent-warning" />
          <span className="text-xs font-mono text-text-muted tracking-wider uppercase">
            Live Benchmark Data
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-success animate-pulse" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-mono text-text-primary mb-2">
          Benchmarks
        </h1>
        <p className="text-sm text-text-secondary">
          Composite scores across coding, reasoning, knowledge, math &amp; agentic benchmarks.
          Auto-updated daily.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mb-8 relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        <GlassInput
          placeholder="Search model or provider..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-3 text-sm"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 mb-8 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono rounded-lg whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? "text-text-primary"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {activeTab === tab.key && (
              <motion.span
                layoutId="cat-tab"
                className="absolute inset-0 glass rounded-lg"
                transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {CATEGORY_ICONS[tab.key]}
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {top3.map((model, i) => (
          <motion.div
            key={model.model}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <ModelCard model={model} rank={i + 1} category={activeTab} />
          </motion.div>
        ))}
      </div>

      {/* Chart + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard hover={false}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-accent-success" />
            <h3 className="text-xs font-mono text-text-tertiary uppercase tracking-wider">
              Score Comparison
            </h3>
          </div>
          <BenchmarkChart data={sorted} category={activeTab} />
        </GlassCard>

        <GlassCard hover={false}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-accent-warning" />
            <h3 className="text-xs font-mono text-text-tertiary uppercase tracking-wider">
              Rankings
            </h3>
          </div>
          <LeaderboardTable data={sorted} category={activeTab} />
        </GlassCard>
      </div>
    </div>
  );
}
