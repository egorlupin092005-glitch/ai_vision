"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Code,
  BookOpen,
  Newspaper,
  Sparkles,
  Star,
  ArrowRight,
  Command,
} from "lucide-react";

const PAGES = [
  { href: "/", label: "Benchmarks", icon: Star, description: "AI model benchmark dashboard" },
  { href: "/repositories", label: "Repositories", icon: Code, description: "Curated AI tool repositories" },
  { href: "/guides", label: "Guides", icon: BookOpen, description: "AI engineering guides" },
  { href: "/news", label: "News", icon: Newspaper, description: "AI daily pulse" },
  { href: "/skills", label: "Skills", icon: Sparkles, description: "AI agent skill catalog" },
];

const GUIDES = [
  { href: "/guides/context-engineering-prp", label: "Context Engineering: PRP Guide" },
  { href: "/guides/skill-md-guide", label: "SKILL.md: Creating AI Skills" },
  { href: "/guides/vibe-coding-playbook", label: "Vibe Coding Playbook" },
  { href: "/guides/tdd-with-ai", label: "TDD with AI: Superpowers" },
  { href: "/guides/glassmorphism-web", label: "Glassmorphism: iOS to Web" },
  { href: "/guides/mcp-protocol-guide", label: "MCP Protocol Guide" },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const allItems = [
    ...PAGES.map((p) => ({ ...p, type: "page" as const })),
    ...GUIDES.map((g) => ({ ...g, type: "guide" as const, icon: BookOpen, description: "" })),
  ];

  const filtered = query
    ? allItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          ("description" in item && item.description?.toLowerCase().includes(query.toLowerCase()))
      )
    : allItems;

  const handleSelect = useCallback(
    (href: string) => {
      router.push(href);
      onClose();
      setQuery("");
    },
    [router, onClose]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((p) => (p + 1) % filtered.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((p) => (p - 1 + filtered.length) % filtered.length);
      }
      if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        handleSelect(filtered[selectedIndex].href);
      }
      if (e.key === "Escape") {
        onClose();
        setQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose, handleSelect]);

  const previousQueryRef = React.useRef(query);
  useEffect(() => {
    if (previousQueryRef.current !== query) {
      previousQueryRef.current = query;
      setSelectedIndex(0);
    }
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
            className="relative w-full max-w-xl glass-card rounded-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border-subtle">
              <Search size={16} className="text-text-muted shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, guides..."
                className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-muted outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono text-text-muted glass rounded-md">
                <Command size={12} />K
              </kbd>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 space-y-0.5">
              {filtered.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleSelect(item.href)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-150 ${
                      i === selectedIndex
                        ? "glass text-text-primary"
                        : "text-text-muted hover:text-text-primary hover:bg-glass-bg-hover"
                    }`}
                  >
                    <Icon size={16} className="shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium block truncate">
                        {item.label}
                      </span>
                      {"description" in item && item.description && (
                        <span className="text-xs text-text-muted block truncate">
                          {item.description}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-text-muted font-mono">
                      {item.type === "page" ? "Page" : "Guide"}
                    </span>
                    <ArrowRight
                      size={14}
                      className={`shrink-0 transition-opacity ${
                        i === selectedIndex ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                );
              })}

              {filtered.length === 0 && (
                <div className="px-4 py-12 text-center text-sm text-text-muted">
                  No results for &quot;{query}&quot;
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 px-5 py-3 border-t border-border-subtle text-xs text-text-muted">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 glass rounded text-[10px] font-mono">↑↓</kbd> Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 glass rounded text-[10px] font-mono">↵</kbd> Open
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 glass rounded text-[10px] font-mono">Esc</kbd> Close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
