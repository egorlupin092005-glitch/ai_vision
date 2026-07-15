"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Star,
  GitFork,
  Clock,
  Copy,
  Check,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import GlassCard from "@/components/glass/GlassCard";
import GlassButton from "@/components/glass/GlassButton";
import { formatNumber, relativeTime } from "@/lib/utils";

interface RepoDetailData {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  updated_at: string;
  category: string;
  topics: string[];
  owner: string;
  readme: string;
}

interface Props {
  repo: RepoDetailData;
}

export default function RepoDetail({ repo }: Props) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`git clone https://github.com/${repo.full_name}.git`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link
        href="/repositories"
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-6"
      >
        <ArrowLeft size={14} />
        Back to repositories
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <GlassCard hover={false} className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-mono text-text-muted mb-1">
                {repo.full_name}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
                {repo.name}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="pill">{repo.language}</span>
              <span className="pill">{repo.category}</span>
            </div>
          </div>

          <p className="text-text-secondary mb-6 leading-relaxed">
            {repo.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-text-muted mb-6">
            <span className="flex items-center gap-1.5">
              <Star size={14} className="text-accent-warning" />
              {formatNumber(repo.stars)}
            </span>
            <span className="flex items-center gap-1.5">
              <GitFork size={14} />
              {formatNumber(repo.forks)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              Updated {relativeTime(repo.updated_at)}
            </span>
          </div>

          {repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {repo.topics.map((topic) => (
                <span key={topic} className="pill text-xs">
                  #{topic}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 pt-4 border-t border-border-subtle">
            <a
              href={`https://github.com/${repo.full_name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassButton size="sm">
                <ExternalLink size={14} />
                Open on GitHub
              </GlassButton>
            </a>
            <GlassButton
              size="sm"
              variant="secondary"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check size={14} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={14} /> Clone URL
                </>
              )}
            </GlassButton>
            <GlassButton size="sm" variant="ghost">
              <Star size={14} /> Bookmark
            </GlassButton>
          </div>
        </GlassCard>

        <GlassCard hover={false}>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={16} className="text-text-muted" />
            <h2 className="text-sm font-mono text-text-tertiary uppercase tracking-wider">
              README.md
            </h2>
          </div>
          <div className="prose prose-invert max-w-none">
            {repo.readme.split("\n").map((line, i) => {
              if (line.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-lg font-semibold text-text-primary mt-6 mb-3">
                    {line.replace("### ", "")}
                  </h3>
                );
              }
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-xl font-bold text-text-primary mt-8 mb-4">
                    {line.replace("## ", "")}
                  </h2>
                );
              }
              if (line.startsWith("- **")) {
                const match = line.match(/- \*\*(.+?)\*\*(?: — (.+))?/);
                if (match) {
                  return (
                    <div key={i} className="flex items-start gap-2 py-1">
                      <span className="text-accent-success mt-1.5">◆</span>
                      <div>
                        <strong className="text-text-primary">{match[1]}</strong>
                        {match[2] && (
                          <span className="text-text-secondary"> — {match[2]}</span>
                        )}
                      </div>
                    </div>
                  );
                }
              }
              if (line.startsWith("- ")) {
                return (
                  <div key={i} className="flex items-center gap-2 py-0.5 text-text-secondary">
                    <span className="text-text-muted">•</span>
                    <span>{line.replace("- ", "")}</span>
                  </div>
                );
              }
              if (line.startsWith("```")) {
                return null;
              }
              if (line.trim() === "") {
                return <div key={i} className="h-2" />;
              }
              return (
                <p key={i} className="text-text-secondary leading-relaxed">
                  {line}
                </p>
              );
            })}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
