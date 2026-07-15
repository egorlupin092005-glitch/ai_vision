import { NextRequest, NextResponse } from "next/server";
import { fetchTrendingRepos } from "@/lib/github";
import { getCached } from "@/lib/cache";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const language = searchParams.get("language") || undefined;
  const since = (searchParams.get("since") as "daily" | "weekly" | "monthly") || "weekly";

  try {
    const data = await getCached(
      `github:trending:${language || "all"}:${since}`,
      () => fetchTrendingRepos(language, since),
      3600
    );

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch trending repos" },
      { status: 500 }
    );
  }
}
