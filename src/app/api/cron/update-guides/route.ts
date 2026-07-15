import { NextRequest, NextResponse } from "next/server";
import { invalidateCache } from "@/lib/cache";

const SOURCES = [
  { name: "Habr AI", url: "https://habr.com/ru/hub/artificial_intelligence/rss/", lang: "ru" },
  { name: "Reddit LocalLLaMA", url: "https://www.reddit.com/r/LocalLLaMA/.rss", lang: "en" },
  { name: "Reddit MachineLearning", url: "https://www.reddit.com/r/MachineLearning/.rss", lang: "en" },
  { name: "Reddit ClaudeAI", url: "https://www.reddit.com/r/ClaudeAI/.rss", lang: "en" },
  { name: "HN AI", url: "https://hnrss.org/frontpage?q=AI+artificial+intelligence&points=10", lang: "en" },
  { name: "Dev.to AI", url: "https://dev.to/feed/tag/ai", lang: "en" },
  { name: "Habr Vibe Coding", url: "https://habr.com/ru/hub/development/rss/", lang: "ru" },
];

interface ScrapedTopic {
  title: string;
  source: string;
  url: string;
  summary: string;
  lang: "ru" | "en";
  date: string;
}

async function fetchSource(name: string, url: string, lang: "ru" | "en"): Promise<ScrapedTopic[]> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "AI-VISION/1.0" },
    });
    if (!res.ok) return [];

    const html = await res.text();
    const items: ScrapedTopic[] = [];

    const titleRegex = /<title>(.*?)<\/title>/gi;
    const linkRegex = /<link>(.*?)<\/link>/gi;

    let match: RegExpExecArray | null;
    while ((match = titleRegex.exec(html)) !== null && items.length < 5) {
      const title = match[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim();
      if (!title || title.length < 10) continue;

      items.push({
        title,
        source: name,
        url: "",
        summary: title,
        lang,
        date: new Date().toISOString().split("T")[0],
      });
    }

    const linkMatches = [...html.matchAll(linkRegex)];
    items.forEach((item, i) => {
      if (linkMatches[i]) {
        item.url = linkMatches[i][1].replace(/<!\[CDATA\[|\]\]>/g, "").trim();
      }
    });

    return items;
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;

  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allTopics: ScrapedTopic[] = [];
  const errors: { source: string; error: string }[] = [];

  for (const source of SOURCES) {
    try {
      const items = await fetchSource(source.name, source.url, source.lang as "ru" | "en");
      allTopics.push(...items);
    } catch (e) {
      errors.push({
        source: source.name,
        error: e instanceof Error ? e.message : "Unknown",
      });
    }
  }

  allTopics.sort((a, b) => b.date.localeCompare(a.date));

  const result = {
    updated: new Date().toISOString(),
    totalTopics: allTopics.length,
    sourcesScraped: SOURCES.length - errors.length,
    errors: errors.length,
    errorDetails: errors,
    topics: allTopics.slice(0, 20),
  };

  try {
    await invalidateCache("guides:trending-topics");
  } catch {
  }

  return NextResponse.json(result);
}
