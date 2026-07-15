import React from "react";
import NewsGrid from "@/components/news/NewsGrid";

export const metadata = {
  title: "News — AI-VISION",
  description: "Latest news in AI development, model releases, and vibe coding community.",
};

export default function NewsPage() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-text-primary mb-3">News</h1>
        <p className="text-text-secondary max-w-2xl">
          AI Daily Pulse — aggregated news from Hacker News, Reddit, and
          community sources.
        </p>
      </div>
      <NewsGrid />
    </div>
  );
}
