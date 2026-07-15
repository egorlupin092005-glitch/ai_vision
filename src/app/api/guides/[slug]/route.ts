import { NextRequest, NextResponse } from "next/server";
import guidesData from "@/data/guides.json";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { searchParams } = new URL(_req.url);
  const lang = searchParams.get("lang") || "ru";

  const guide = guidesData.find((g) => g.slug === slug);
  if (!guide) {
    return NextResponse.json({ error: "Guide not found" }, { status: 404 });
  }

  return NextResponse.json({
    slug: guide.slug,
    title: lang === "en" ? guide.titleEn : guide.titleRu,
    description: lang === "en" ? guide.descEn : guide.descRu,
    author: guide.author,
    date: guide.date,
    readingTime: guide.readingTime,
    tags: lang === "en" ? guide.tagsEn : guide.tagsRu,
    content: lang === "en" ? guide.contentEn : guide.contentRu,
    source: guide.source,
  });
}
