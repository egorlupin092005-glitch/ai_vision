import React from "react";
import RepoGrid from "@/components/repository/RepoGrid";
import { AI_REPOS } from "@/lib/repos";

export const metadata = {
  title: "Repositories — AI-VISION",
  description: "Curated collection of 75+ AI engineering repositories — frameworks, tools, agents, and resources.",
};

export default function RepositoriesPage() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
          Repositories
        </h1>
        <p className="text-text-secondary max-w-2xl text-sm leading-relaxed">
          Curated collection of <strong className="text-text-primary">{AI_REPOS.length}</strong> essential AI engineering repositories — frameworks, tools, agents, MCP servers, vector databases, and learning resources. Updated daily via GitHub API.
        </p>
      </div>
      <RepoGrid repos={AI_REPOS} />
    </div>
  );
}
