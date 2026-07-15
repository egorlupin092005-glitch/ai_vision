import React from "react";
import SkillsCatalog from "@/components/skills/SkillsCatalog";

export const metadata = {
  title: "Skills — AI-VISION",
  description: "Catalog of AI agent skills (SKILL.md) for Claude Code and other AI assistants.",
};

export default function SkillsPage() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-text-primary mb-3">Skills</h1>
        <p className="text-text-secondary max-w-2xl">
          Reusable AI agent skills (SKILL.md) for Claude Code, Cursor, and
          other AI development tools.
        </p>
      </div>
      <SkillsCatalog />
    </div>
  );
}
