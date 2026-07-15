"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Copy, Check, ExternalLink } from "lucide-react";
import GlassCard from "@/components/glass/GlassCard";
import GlassButton from "@/components/glass/GlassButton";

const SKILLS = [
  { name: "UI/UX Pro Max", description: "Production UI/UX design skill with design dials, 22 stack guides, and 161 color palettes.", author: "nextlevelbuilder", stars: 4100, category: "ui-ux", slug: "ui-ux-pro-max-skill" },
  { name: "Vibe Workflow", description: "Master orchestrator skill for the 5-phase vibe coding workflow.", author: "KhazP", stars: 2800, category: "workflow", slug: "vibe-workflow" },
  { name: "Vibe Research", description: "Deep research skill for gathering context before building.", author: "KhazP", stars: 2800, category: "workflow", slug: "vibe-research" },
  { name: "Vibe PRD", description: "PRD generation skill with 3 skill-level templates.", author: "KhazP", stars: 2800, category: "workflow", slug: "vibe-prd" },
  { name: "Vibe Tech Design", description: "Technical design generation skill with architecture diagrams and full schema SQL.", author: "KhazP", stars: 2800, category: "workflow", slug: "vibe-techdesign" },
  { name: "Vibe Build (MVP)", description: "MVP builder skill for rapid prototyping with AI.", author: "KhazP", stars: 2800, category: "workflow", slug: "vibe-build" },
];

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "ui-ux", label: "UI/UX" },
  { key: "workflow", label: "Workflow" },
  { key: "mcp", label: "MCP" },
];

export default function SkillsCatalog() {
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [copiedSlug, setCopiedSlug] = React.useState<string | null>(null);

  const filtered = activeCategory === "all" ? SKILLS : SKILLS.filter((s) => s.category === activeCategory);

  const handleCopy = (slug: string) => {
    navigator.clipboard.writeText(`# ${slug.toUpperCase()}\n# SKILL.md content here`);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeCategory === cat.key
                ? "glass text-text-primary"
                : "text-text-muted hover:text-text-primary hover:bg-glass-bg-hover"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((skill, i) => (
          <motion.div
            key={skill.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <Link href={`https://github.com/${skill.author}/${skill.slug}`} target="_blank" rel="noopener noreferrer">
                    <h3 className="text-base font-semibold text-text-primary hover:text-text-secondary transition-colors">
                      {skill.name}
                    </h3>
                  </Link>
                  <p className="text-xs font-mono text-text-muted mt-0.5">
                    @{skill.author}
                  </p>
                </div>
                <span className="pill">{skill.category}</span>
              </div>

              <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                {skill.description}
              </p>

              <div className="flex items-center gap-4 text-xs font-mono text-text-muted mb-4">
                <span>★ {skill.stars.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-border-subtle">
                <GlassButton
                  size="sm"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => handleCopy(skill.slug)}
                >
                  {copiedSlug === skill.slug ? (
                    <>
                      <Check size={14} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Activate
                    </>
                  )}
                </GlassButton>
                <a
                  href={`https://github.com/${skill.author}/${skill.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GlassButton size="sm" variant="ghost" className="px-2">
                    <ExternalLink size={14} />
                  </GlassButton>
                </a>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
