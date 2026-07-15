import { NextRequest, NextResponse } from "next/server";
import { searchRepos } from "@/lib/github";
import { getCached } from "@/lib/cache";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  try {
    const data = await getCached(
      `github:search:${q}`,
      () => searchRepos(q),
      900
    );

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to search repos" },
      { status: 500 }
    );
  }
}
