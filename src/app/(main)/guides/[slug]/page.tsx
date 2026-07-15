import React from "react";
import { notFound } from "next/navigation";
import GuideDetail from "@/components/guides/GuideDetail";
import guidesData from "@/data/guides.json";

export async function generateStaticParams() {
  return guidesData.map((g) => ({ slug: g.slug }));
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guidesData.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  return <GuideDetail guide={guide} />;
}
