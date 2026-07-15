# AI-VISION Platform Skill

You are building **AI-VISION** — an encyclopedia, assistant, and aggregator for vibe coders and AI developers.

## Architecture

```
ai-vision/
├── src/
│   ├── app/
│   │   ├── (main)/          # Main route group (Benchmarks, Repositories, Guides, News, Skills)
│   │   │   ├── page.tsx       → BenchmarkDashboard (home)
│   │   │   ├── repositories/ → RepoGrid + detail
│   │   │   ├── guides/       → GuidesList + MDX renderer
│   │   │   ├── news/         → NewsGrid + RSS
│   │   │   ├── skills/       → SkillsCatalog
│   │   │   └── layout.tsx    → GlassNav + footer
│   │   └── api/              → GitHub, News, Benchmark, Cron routes
│   ├── components/
│   │   ├── glass/            → GlassCard, GlassButton, GlassNav, GlassInput, GlassModal
│   │   ├── benchmark/        → BenchmarkDashboard, ModelCard, BenchmarkChart, LeaderboardTable
│   │   ├── repository/       → RepoGrid
│   │   ├── guides/           → GuidesList
│   │   └── news/             → NewsGrid
│   ├── lib/                  → github.ts, rss.ts, cache.ts, utils.ts, repos.ts
│   ├── types/                → index.ts, github.ts, benchmark.ts
│   └── data/                 → benchmarks.json, seed.json
├── content/guides/           → MDX guide files
└── .env.local                → GITHUB_TOKEN, DATABASE_URL, UPSTASH_REDIS_URL
```

## Design System

- **Colors**: Strict B&W. `#000000` bg, `#0A0A0A` surfaces, `#111`/`#1A1A1A` elevated, `#FFF` primary text.
  iOS status colors only: `#34C759` (success), `#FF3B30` (error), `#FF9500` (warning).
- **Glassmorphism**: `glass` utility class: `backdrop-filter: blur(20px) saturate(180%)`, 
  `background: rgba(255,255,255,0.03)`, `border: 1px solid rgba(255,255,255,0.08)`.
- **Typography**: Headers: Inter (600-700, `-0.02em` letter-spacing). Body: Inter (400, 1.6 line-height).
  Mono: JetBrains Mono for code, metrics, versions.
- **Border radius**: Cards `20px`/`16px`/`12px`, Buttons `12px`, Inputs `12px`.
- **Animations**: Framer Motion. Page transition: fade + translateY. Card hover: `translateY(-4px)`.
  Stagger: `0.05s` delay between items.

## Conventions

1. **Server Components first** — only use Client Components for interactivity (`"use client"`).
2. **TypeScript strict** — no `any`. Prefer `unknown` + type guards.
3. **No colors outside palette** — B&W only + iOS status colors for badges.
4. **All cards** must use `GlassCard` wrapper from `@/components/glass/GlassCard`.
5. **Data fetching**: Server Components for initial load, TanStack Query for client-side.
6. **Dynamic imports** for charts (recharts), markdown rendering.
7. **API routes** use Redis cache (Upstash) with TTL: 1h repos, 15min news.
8. **Every segment** needs `error.tsx` and `loading.tsx`.
9. **Aria labels** on all interactive elements.
10. **`prefers-reduced-motion`** support for animations.

## Required Repositories (to index)

See `src/lib/repos.ts` for the `REQUIRED_REPOS` array. Categories: vibe-coding, workflow, ui-ux, learning, tools, mcp.

## Key API Routes

| Route | Method | Description | Cache TTL |
|-------|--------|-------------|-----------|
| `/api/github/repos` | GET | List indexed repos | 1h |
| `/api/github/trending` | GET | Trending repos | 1h |
| `/api/github/search` | GET | Search repos | 15min |
| `/api/news` | GET | RSS feed aggregation | 15min |
| `/api/benchmark` | GET | AI benchmark data | 1h |

## Build & Deploy

- Platform: Vercel
- Build: `npm run build` (must pass clean)
- No colors outside B&W palette
- All components glassmorphism
- iOS-like typography
