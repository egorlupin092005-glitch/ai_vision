"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, User, Search, Filter } from "lucide-react";
import GlassCard from "@/components/glass/GlassCard";
import GlassInput from "@/components/glass/GlassInput";
import { useLocaleStore } from "@/lib/locale";

interface GuideItem {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readingTime: string;
  tags: string[];
}

function isNew(dateStr: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  return diff < 3 * 24 * 60 * 60 * 1000;
}

function getAllTags(guides: GuideItem[]): string[] {
  const set = new Set<string>();
  guides.forEach((g) => g.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export default function GuidesList() {
  const { locale } = useLocaleStore();
  const [guides, setGuides] = useState<GuideItem[]>([]);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/guides?lang=${locale}`)
      .then((r) => r.json())
      .then(setGuides)
      .catch(() => {});
  }, [locale]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return guides.filter((g) => {
      const matchSearch =
        !q ||
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.tags.some((t) => t.toLowerCase().includes(q));
      const matchTag = !activeTag || g.tags.includes(activeTag);
      return matchSearch && matchTag;
    });
  }, [guides, search, activeTag]);

  const allTags = useMemo(() => getAllTags(guides), [guides]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          <GlassInput
            placeholder={locale === "ru" ? "Поиск гайдов..." : "Search guides..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full sm:w-auto scrollbar-none">
          <Filter size={14} className="text-text-muted flex-shrink-0" />
          <button
            onClick={() => setActiveTag(null)}
            className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              !activeTag
                ? "glass text-text-primary"
                : "text-text-muted hover:text-text-primary hover:bg-glass-bg-hover"
            }`}
          >
            {locale === "ru" ? "Все" : "All"}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTag === tag
                  ? "glass text-text-primary"
                  : "text-text-muted hover:text-text-primary hover:bg-glass-bg-hover"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs font-mono text-text-muted mb-4">
        {filtered.length} {locale === "ru" ? "гайдов" : "guides"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((guide, i) => (
          <motion.div
            key={guide.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={`/guides/${guide.slug}`}>
              <GlassCard>
                <div className="flex flex-wrap gap-2 mb-3">
                  {guide.tags.map((tag) => (
                    <span key={tag} className="pill">
                      {tag}
                    </span>
                  ))}
                  {isNew(guide.date) && (
                    <span className="pill text-accent-success border-accent-success/30">
                      New!
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-text-primary mb-2 leading-snug">
                  {guide.title}
                </h3>

                <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                  {guide.description}
                </p>

                <div className="flex items-center gap-4 text-xs font-mono text-text-muted">
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
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-text-muted text-lg">
            {locale === "ru" ? "Гайды не найдены" : "No guides found"}
          </p>
          <p className="text-text-muted text-sm mt-1">
            {locale === "ru"
              ? "Попробуйте другой поисковый запрос"
              : "Try a different search term"}
          </p>
        </div>
      )}
    </div>
  );
}
