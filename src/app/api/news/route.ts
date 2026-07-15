import { NextResponse } from "next/server";
import { fetchAllFeeds } from "@/lib/rss";
import { getCached } from "@/lib/cache";

export async function GET() {
  try {
    const items = await getCached(
      "news:rss",
      () => fetchAllFeeds(),
      900
    );

    return NextResponse.json(items);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
