import { NextRequest, NextResponse } from "next/server";
import guidesData from "@/data/guides.json";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") || "ru";

  const list = guidesData.map((g) => ({
    slug: g.slug,
    title: lang === "en" ? g.titleEn : g.titleRu,
    description: lang === "en" ? g.descEn : g.descRu,
    author: g.author,
    date: g.date,
    readingTime: g.readingTime,
    tags: lang === "en" ? g.tagsEn : g.tagsRu,
  }));

  list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return NextResponse.json(list);
}
