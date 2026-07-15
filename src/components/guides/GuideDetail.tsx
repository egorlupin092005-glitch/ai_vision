"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, User, ArrowLeft, Tag, Languages, ExternalLink } from "lucide-react";
import Link from "next/link";
import GlassCard from "@/components/glass/GlassCard";
import GlassButton from "@/components/glass/GlassButton";
import { useLocaleStore } from "@/lib/locale";

type GuideEntry = {
  slug: string;
  author: string;
  date: string;
  readingTime: string;
  titleRu: string;
  titleEn: string;
  descRu: string;
  descEn: string;
  tagsRu: string[];
  tagsEn: string[];
  contentRu: string;
  contentEn: string;
  source: string;
};

interface Props {
  guide: GuideEntry;
}

function renderLine(line: string, i: number) {
  if (line.startsWith("### ")) {
    return (
      <h3 key={i} className="text-lg font-semibold text-text-primary mt-8 mb-3">
        {line.replace("### ", "")}
      </h3>
    );
  }
  if (line.startsWith("## ")) {
    return (
      <h2 key={i} className="text-xl font-bold text-text-primary mt-10 mb-4">
        {line.replace("## ", "")}
      </h2>
    );
  }
  if (line.startsWith("```")) {
    return null;
  }
  if (line.startsWith("- **")) {
    const match = line.match(/- \*\*(.+?)\*\*(?: — (.+))?/);
    if (match) {
      return (
        <div key={i} className="flex items-start gap-2 py-1.5">
          <span className="text-accent-success mt-1.5 shrink-0 text-xs">◆</span>
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
      <div key={i} className="flex items-center gap-2 py-0.5 text-text-secondary pl-4">
        <span className="text-text-muted text-xs">•</span>
        <span>{line.replace("- ", "")}</span>
      </div>
    );
  }
  if (line.trim() === "") {
    return <div key={i} className="h-3" />;
  }
  return (
    <p key={i} className="text-text-secondary leading-relaxed mb-4">
      {line}
    </p>
  );
}

export default function GuideDetail({ guide }: Props) {
  const { locale, toggleLocale } = useLocaleStore();

  const title = locale === "en" ? guide.titleEn : guide.titleRu;
  const description = locale === "en" ? guide.descEn : guide.descRu;
  const tags = locale === "en" ? guide.tagsEn : guide.tagsRu;
  const content = locale === "en" ? guide.contentEn : guide.contentRu;
  const lines = content.split("\n");

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          {locale === "ru" ? "К гайдам" : "Back to guides"}
        </Link>

        <GlassButton size="sm" variant="ghost" onClick={toggleLocale}>
          <Languages size={14} />
          {locale === "ru" ? "EN" : "RU"}
        </GlassButton>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <GlassCard hover={false} className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span key={tag} className="pill flex items-center gap-1">
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 leading-tight">
            {title}
          </h1>

          <p className="text-text-secondary mb-6 leading-relaxed">
            {description}
          </p>

          <div className="flex items-center gap-4 text-xs font-mono text-text-muted pb-4 border-b border-border-subtle">
            <span className="flex items-center gap-1.5">
              <User size={12} />
              {guide.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {guide.readingTime}
            </span>
            <span className="ml-auto">{guide.date}</span>
          </div>
        </GlassCard>

        <GlassCard hover={false}>
          <article className="prose prose-invert max-w-none">
            {lines.map((line, i) => renderLine(line, i))}
          </article>
        </GlassCard>

        {guide.source && (
          <div className="mt-6 flex justify-center">
            <a href={guide.source} target="_blank" rel="noopener noreferrer">
              <GlassButton size="sm" variant="secondary">
                <ExternalLink size={14} />
                {locale === "ru" ? "Читать оригинал" : "Read original source"}
              </GlassButton>
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
}
