"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Filter, Star, GitFork } from "lucide-react";
import GlassCard from "@/components/glass/GlassCard";
import GlassInput from "@/components/glass/GlassInput";
import { REPO_CATEGORIES } from "@/lib/repos";
import { formatNumber } from "@/lib/utils";
import type { AiRepo } from "@/lib/repos";

const PER_PAGE = 18;

interface Props {
  repos: AiRepo[];
}

export default function RepoGrid({ repos }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [visible, setVisible] = useState(PER_PAGE);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return repos.filter((r) => {
      const matchSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.full_name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.topics.some((t) => t.includes(q));
      const matchCategory = activeCategory === "all" || r.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [repos, search, activeCategory]);

  const displayed = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const handleLoadMore = () => setVisible((v) => Math.min(v + PER_PAGE, filtered.length));

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          <GlassInput
            placeholder="Search 75+ AI repositories..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setVisible(PER_PAGE); }}
            className="pl-11"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full sm:w-auto scrollbar-none">
          <Filter size={14} className="text-text-muted flex-shrink-0" />
          {REPO_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setVisible(PER_PAGE); }}
              className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeCategory === cat.key
                  ? "glass text-text-primary"
                  : "text-text-muted hover:text-text-primary hover:bg-glass-bg-hover"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs font-mono text-text-muted mb-4">
        {filtered.length} of {repos.length} repositories
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayed.map((repo, i) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (i % PER_PAGE) * 0.02 }}
          >
            <Link href={`/repositories/${repo.id}`}>
              <GlassCard>
                <div className="flex items-start justify-between mb-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-mono text-text-muted truncate">
                      {repo.full_name}
                    </p>
                    <h3 className="text-base font-semibold text-text-primary mt-0.5 truncate">
                      {repo.name}
                    </h3>
                  </div>
                  <span className="pill flex-shrink-0 ml-2 text-[10px]">
                    {repo.language}
                  </span>
                </div>

                <p className="text-sm text-text-secondary line-clamp-2 mb-4 min-h-[2.5rem]">
                  {repo.description}
                </p>

                <div className="flex items-center gap-3 text-xs font-mono text-text-muted">
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-accent-warning" /> {formatNumber(repo.stars)}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={12} /> {formatNumber(repo.forks)}
                  </span>
                  <span className="pill text-[10px] ml-auto">{repo.category}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border-subtle">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span key={topic} className="text-[10px] font-mono text-text-muted">
                      #{topic}
                    </span>
                  ))}
                  {repo.topics.length > 3 && (
                    <span className="text-[10px] font-mono text-text-muted">
                      +{repo.topics.length - 3}
                    </span>
                  )}
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-text-muted text-lg">
            No repositories found matching your search.
          </p>
          <p className="text-text-muted text-sm mt-1">
            Try a different category or search term.
          </p>
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="glass px-8 py-3 text-sm font-mono text-text-primary rounded-xl hover:bg-glass-bg-hover transition-colors"
          >
            Load More ({filtered.length - visible} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
