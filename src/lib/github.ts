const GITHUB_API = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers: Record<string, string> = {
  Accept: "application/vnd.github.v3+json",
};

if (GITHUB_TOKEN) {
  headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
}

export async function fetchRepoDetails(owner: string, repo: string) {
  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, { headers });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

export async function searchRepos(query: string, sort: "stars" | "updated" | "forks" = "stars", order: "desc" | "asc" = "desc", perPage = 30) {
  const params = new URLSearchParams({
    q: query,
    sort,
    order,
    per_page: String(perPage),
  });
  const res = await fetch(`${GITHUB_API}/search/repositories?${params}`, { headers });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

export async function fetchTrendingRepos(language?: string, since: "daily" | "weekly" | "monthly" = "weekly") {
  const days = { daily: 1, weekly: 7, monthly: 30 };
  const date = new Date();
  date.setDate(date.getDate() - days[since]);
  const dateStr = date.toISOString().split("T")[0];

  let query = `created:>${dateStr} sort:stars`;
  if (language) query += ` language:${language}`;

  return searchRepos(query);
}
