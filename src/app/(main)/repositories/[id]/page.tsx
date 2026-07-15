import React from "react";
import { notFound } from "next/navigation";
import RepoDetail from "@/components/repository/RepoDetail";
import { AI_REPOS } from "@/lib/repos";

export async function generateStaticParams() {
  return AI_REPOS.map((repo) => ({ id: String(repo.id) }));
}

export default async function RepoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const repo = AI_REPOS.find((r) => r.id === Number(id));

  if (!repo) {
    notFound();
  }

  return <RepoDetail repo={repo} />;
}
