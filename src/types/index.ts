export interface RepoItem {
  owner: string;
  repo: string;
  category: string;
  priority: number;
}

export interface RepoDetails {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface NewsItem {
  title: string;
  link: string;
  source: string;
  snippet: string;
  published: string;
  category: string;
}

export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readingTime: string;
  tags: string[];
}
