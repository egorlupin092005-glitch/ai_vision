import { NextResponse } from "next/server";
import { AI_REPOS } from "@/lib/repos";
import { getCached } from "@/lib/cache";
import { fetchTrendingRepos } from "@/lib/github";

export async function GET() {
  try {
    const enriched = await getCached(
      "github:repos",
      async () => {
        const trending = await fetchTrendingRepos(undefined, "weekly");
        const trendingNames = new Set(
          (trending.items ?? []).map((r: { full_name: string }) => r.full_name.toLowerCase())
        );

        return AI_REPOS.map((r) => ({
          ...r,
          isTrending: trendingNames.has(r.full_name.toLowerCase()),
        }));
      },
      3600
    );

    return NextResponse.json(enriched);
  } catch {
    return NextResponse.json(AI_REPOS);
  }
}
