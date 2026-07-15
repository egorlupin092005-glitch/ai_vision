"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import GlassCard from "@/components/glass/GlassCard";

const NEWS = [
  { title: "Claude 4.1 Sonnet achieves 72.4% on SWE-bench, narrowing gap with Gemini", source: "Hacker News", date: "2026-07-02", category: "Model Release", snippet: "Anthropic's latest model shows significant improvement in software engineering tasks, scoring 72.4% on the SWE-bench benchmark.", url: "#" },
  { title: "Vibe Coding meetup 2026: Community insights and tool announcements", source: "Reddit r/LocalLLaMA", date: "2026-07-01", category: "Community", snippet: "Highlights from the latest vibe coding community meetup featuring new MCP servers, skill packs, and workflow improvements.", url: "#" },
  { title: "OpenAI releases GPT-4.1 with improved coding capabilities", source: "Hacker News", date: "2026-06-30", category: "Model Release", snippet: "GPT-4.1 brings enhanced reasoning and coding abilities, scoring 69.8% on SWE-bench and 90.1% on HumanEval.", url: "#" },
  { title: "New rulebook-ai pack system gains traction among AI developers", source: "Reddit r/MachineLearning", date: "2026-06-28", category: "Tool", snippet: "The rulebook-ai pack-based architecture for AI coding assistants is seeing growing adoption with the light-spec pack.", url: "#" },
  { title: "MCP protocol v1.3 released with streaming improvements", source: "Hacker News", date: "2026-06-27", category: "Tool", snippet: "The Model Context Protocol gets streaming support, better error handling, and improved cross-client compatibility.", url: "#" },
  { title: "Research: CPI methodology improves AI agent success rate by 27%", source: "Reddit r/LocalLLaMA", date: "2026-06-25", category: "Research", snippet: "Chain-Pattern Interrupt (CPI) approach shows significant improvement in AI agent task completion rates across 153 evaluations.", url: "#" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Model Release": "text-accent-success",
  Community: "text-accent-warning",
  Tool: "text-accent-warning",
  Research: "text-accent-warning",
};

export default function NewsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {NEWS.map((item, i) => {
        const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        return (
          <motion.div
            key={`${item.title}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={`/news/${slug}`}>
              <GlassCard>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-mono ${CATEGORY_COLORS[item.category] || "text-text-muted"}`}>
                    ● {item.category}
                  </span>
                  <span className="text-xs text-text-muted ml-auto">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-text-primary mb-2 leading-snug line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs text-text-secondary mb-4 line-clamp-3 leading-relaxed">
                  {item.snippet}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
                  <span className="text-xs font-mono text-text-muted">
                    {item.source}
                  </span>
                  <span className="text-xs text-text-tertiary flex items-center gap-1">
                    Read more
                    <ExternalLink size={10} />
                  </span>
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
