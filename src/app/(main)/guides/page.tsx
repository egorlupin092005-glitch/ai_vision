import React from "react";
import GuidesList from "@/components/guides/GuidesList";

export const metadata = {
  title: "Guides — AI-VISION",
  description: "In-depth guides on AI engineering, context management, and development workflows.",
};

export default function GuidesPage() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-text-primary mb-3">Guides</h1>
        <p className="text-text-secondary max-w-2xl">
          Deep dives into AI engineering: context management, skill creation,
          development workflows, and best practices.
        </p>
      </div>
      <GuidesList />
    </div>
  );
}
