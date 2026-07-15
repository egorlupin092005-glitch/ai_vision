"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import GlassCard from "@/components/glass/GlassCard";
import GlassButton from "@/components/glass/GlassButton";

interface NewsDetailData {
  slug: string;
  title: string;
  source: string;
  date: string;
  category: string;
  content: string;
}

interface Props {
  article: NewsDetailData;
}

const CATEGORY_COLORS: Record<string, string> = {
  "Model Release": "text-accent-success",
  Community: "text-accent-warning",
  Tool: "text-accent-warning",
  Research: "text-accent-warning",
};

export default function NewsDetail({ article }: Props) {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <Link
        href="/news"
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-6"
      >
        <ArrowLeft size={14} />
        Back to news
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <GlassCard hover={false}>
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-mono ${CATEGORY_COLORS[article.category] || "text-text-muted"}`}>
              ● {article.category}
            </span>
            <span className="text-xs font-mono text-text-muted">{article.source}</span>
            <span className="text-xs font-mono text-text-muted ml-auto">{article.date}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="text-text-secondary leading-relaxed space-y-4 mb-6">
            {article.content.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-border-subtle">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <GlassButton size="sm">
                <ExternalLink size={14} />
                Read original source
              </GlassButton>
            </a>
            <GlassButton size="sm" variant="ghost">
              Share
            </GlassButton>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
