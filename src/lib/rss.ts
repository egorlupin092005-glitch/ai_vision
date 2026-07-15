import Parser from "rss-parser";

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "AI-VISION/1.0",
  },
});

const FEEDS = [
  "https://hnrss.org/frontpage?q=AI+artificial+intelligence&points=10",
  "https://www.reddit.com/r/LocalLLaMA/.rss",
  "https://www.reddit.com/r/MachineLearning/.rss",
];

export interface RSSItem {
  title: string;
  link: string;
  content: string;
  pubDate: string;
  source: string;
}

export async function fetchAllFeeds(): Promise<RSSItem[]> {
  const results: RSSItem[] = [];

  for (const feedUrl of FEEDS) {
    try {
      const feed = await parser.parseURL(feedUrl);
      const source = new URL(feedUrl).hostname.replace("www.", "");

      for (const item of feed.items.slice(0, 10)) {
        results.push({
          title: item.title || "",
          link: item.link || "",
          content: item.contentSnippet || item.content || "",
          pubDate: item.pubDate || new Date().toISOString(),
          source,
        });
      }
    } catch {
      // Silently skip failed feeds
    }
  }

  return results.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
}
