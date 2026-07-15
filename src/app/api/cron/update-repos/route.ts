import { NextRequest, NextResponse } from "next/server";
import { searchRepos } from "@/lib/github";
import { AI_SEARCH_QUERIES } from "@/lib/repos";
import { invalidateCache } from "@/lib/cache";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;

  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: { query: string; count: number; error?: string }[] = [];

  for (const query of AI_SEARCH_QUERIES) {
    try {
      const data = await searchRepos(query, "stars", "desc", 10);
      results.push({ query, count: data.items?.length ?? 0 });
    } catch (e) {
      results.push({
        query,
        count: 0,
        error: e instanceof Error ? e.message : "Unknown error",
      });
    }
  }

  await invalidateCache("github:trending-ai");

  return NextResponse.json({
    updated: new Date().toISOString(),
    queries: results.length,
    total: results.reduce((acc, r) => acc + r.count, 0),
    results,
  });
}
