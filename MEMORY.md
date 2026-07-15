# AI-VISION — Memory & Roadmap

## Что это за проект

**AI-VISION** — энциклопедия/агрегатор для AI-разработчиков и vibe-кодеров. Один сайт где есть всё:
- **Benchmarks** — реальные бенчмарки моделей со composite score (среднее по 5 бенчмаркам)
- **Repositories** — каталог 75+ AI-репозиториев (фреймворки, инструменты, MCP, LLM, вектро-базы)
- **Guides** — гайды по AI-разработке (40 гайдов, RU/EN двуязычные)
- **News** — AI-новости (RSS агрегатор)
- **Skills** — каталог AI-скиллов (CLINE, Cursor rulesets и т.д.)

Данные должны ОБНОВЛЯТЬСЯ АВТОМАТИЧЕСКИ каждый день (GitHub API + RSS + benchlm.ai).
Пользователь не хочет ничего обновлять руками.

---

## Что сделано (build пропускает, тесты 15/15 pass)

### Phase 0-7 — База
(см. предыдущие версии MEMORY.md — инициализация, дизайн-система, core UI, страницы, API, тесты, реврайт бенчмарков)

### Phase 8 — Guides v2 (i18n + 40 гайдов + автопополнение) — DONE

#### i18n система
- `src/lib/locale.ts` — Zustand store `useLocaleStore` с `locale` ('ru'|'en'), `toggleLocale()`, сохранение в `localStorage`
- Кнопка переключения языка (иконка Languages + текст RU/EN) в `GlassNav.tsx` рядом с поиском
- Переключатель также в шапке `GuideDetail.tsx`

#### Данные — 40 гайдов
- `src/data/guides.json` — единый JSON-файл с 40 гайдами
- Каждый гайд содержит: `slug`, `author`, `date`, `readingTime`, `titleRu`/`titleEn`, `descRu`/`descEn`, `tagsRu[]`/`tagsEn[]`, `contentRu`/`contentEn`, `source`
- Категории: AI Agents, Vibe Coding, MCP, RAG, Fine-Tuning, Security, Production, Tools, Prompt Engineering, Design, Game Dev, Desktop Automation, Data

**Список 40 гайдов:**
1. `ai-agents-langchain` — LangChain + LangGraph для production агентов
2. `agentic-engineering-mastery` — Claude Code, Codex, agent harnesses
3. `multi-agent-crewai` — CrewAI + DeerFlow мульти-агентные системы
4. `copilotkit-assistants` — CopilotKit AI-ассистенты в React
5. `agent-memory-mem0` — mem0 + claude-mem системы памяти
6. `12-factor-agents` — 12-factor app для AI-агентов
7. `vibe-coding-2026` — Vibe Coding от новичка до мастера
8. `design-to-code-ai` — Figma-to-code с AI
9. `mcp-complete-guide` — MCP серверы и клиенты с нуля
10. `awesome-mcp-servers` — Каталог MCP-серверов
11. `mcp-security` — Безопасность MCP
12. `rag-production-ragflow` — Production RAG с RAGFlow
13. `graphrag-knowledge-graphs` — GraphRAG графы знаний
14. `agentic-rag` — Агентный RAG
15. `fine-tuning-llamafactory` — Fine-tuning с LlamaFactory + Unsloth
16. `peft-mastery` — PEFT адаптеры, prefix/prompt tuning
17. `rhlf-dpo-alignment` — RLHF и DPO alignment
18. `owasp-llm-top10` — OWASP Top 10 для LLM
19. `ai-red-teaming` — AI Red Teaming
20. `context-engineering-prp` — Context Engineering PRP
21. `skill-md-guide` — SKILL.md навыки
22. `vibe-coding-playbook` — Vibe Coding Playbook
23. `tdd-with-ai` — TDD с AI
24. `glassmorphism-web` — Glassmorphism
25. `mcp-protocol-guide` — MCP Protocol
26. `llm-observability-langfuse` — LangFuse observability
27. `deploying-llms-vllm` — vLLM + Ollama деплой
28. `prompt-management` — Promptfoo управление промптами
29. `browser-automation-ai` — browser-use + Playwright
30. `ollama-local-ai` — Ollama локальный AI
31. `dify-workflow-platform` — Dify workflow платформа
32. `system-prompt-engineering` — Системные промпты
33. `agent-sandboxing` — Песочницы для агентов
34. `synthetic-data-generation` — Синтетические данные
35. `n8n-ai-workflows` — n8n + Composio AI workflows
36. `computer-use-agents` — CUA десктоп автоматизация
37. `agent-skills-ecosystem` — Экосистема навыков
38. `open-webui-platform` — Open WebUI + AnythingLLM
39. `advanced-agentic-engineering` — ECC, Hermes Agent
40. `llm-guardrails-nemo` — NeMo Guardrails
41. `mlflow-agent-platform` — MLflow + Opik платформы
42. `web-scraping-ai-agents` — Firecrawl скрапинг
43. `game-dev-ai` — GDevelop AI game dev
44. `advanced-alignment` — DPO, KTO, ORPO

#### API роуты
- `src/app/api/guides/route.ts` — `GET /api/guides?lang=ru|en` — список гайдов на языке
- `src/app/api/guides/[slug]/route.ts` — `GET /api/guides/[slug]?lang=ru|en` — конкретный гайд
- `src/app/api/cron/update-guides/route.ts` — парсинг 7 источников (Habr, Reddit x3, HN, Dev.to, Habr Dev)

#### Компоненты (переписаны)
- `src/components/guides/GuidesList.tsx` — динамическая загрузка через `/api/guides?lang=`, поиск, фильтр по тегам, сортировка по дате, badge "New!" (3 дня)
- `src/components/guides/GuideDetail.tsx` — рендерит контент на выбранном языке, кнопка переключения RU/EN в шапке, ссылка на источник, поддержка markdown парсинга (h2/h3, списки, код-блоки)

#### Страницы (обновлены)
- `src/app/(main)/guides/page.tsx` — статическая мета + `<GuidesList />`
- `src/app/(main)/guides/[slug]/page.tsx` — `generateStaticParams()` из guides.json, SSR

#### GlassNav
- `Languages` иконка + `RU`/`EN` текст, `toggleLocale()` по клику

#### CommandPalette
- Расширена с 3 до 6 гайдов

#### Баги (исправлены)
- `LeaderboardTable.tsx` — `SortHeader` компонент создавался внутри render → встроены inline кнопки
- `CommandPalette.tsx` — `setSelectedIndex` вызывался в `useEffect` синхронно → исправлен
- Неиспользуемые импорты удалены (`router`, `Clock`, `Tag`, `relativeTime`, `getCached`, `descRegex`)

---

## Текущая структура проекта

```
src/
├── app/
│   ├── (main)/
│   │   ├── page.tsx                          # Home → BenchmarkDashboard
│   │   ├── layout.tsx                        # GlassNav + Footer
│   │   ├── repositories/[id]/page.tsx        # RepoDetail
│   │   ├── guides/
│   │   │   ├── page.tsx                      # GuidesList (i18n, фильтры, поиск)
│   │   │   └── [slug]/page.tsx              # GuideDetail (i18n, SSG 40 pages)
│   │   ├── news/[slug]/page.tsx              # NewsDetail
│   │   └── skills/page.tsx                   # SkillsCatalog
│   ├── api/
│   │   ├── guides/route.ts                   # GET ?lang= → список
│   │   ├── guides/[slug]/route.ts            # GET ?lang= → контент
│   │   ├── github/repos/route.ts
│   │   ├── github/search/route.ts
│   │   ├── github/trending/route.ts
│   │   ├── news/route.ts
│   │   ├── benchmark/route.ts
│   │   ├── cron/update-repos/route.ts
│   │   ├── cron/update-guides/route.ts       # парсинг Habr, Reddit, HN, Dev.to
│   │   └── manifest.ts
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── glass/
│   │   ├── GlassNav.tsx                       # + RU/EN toggle
│   │   ├── GlassCard.tsx
│   │   ├── GlassButton.tsx
│   │   ├── GlassInput.tsx
│   │   ├── GlassModal.tsx
│   │   └── CommandPalette.tsx                # + 6 гайдов
│   ├── benchmark/
│   │   ├── BenchmarkDashboard.tsx
│   │   ├── ModelCard.tsx
│   │   ├── BenchmarkChart.tsx
│   │   ├── LeaderboardTable.tsx              # fix: SortHeader inlined
│   │   └── BenchmarkChart.test.tsx
│   ├── repository/{RepoGrid,RepoDetail}.tsx
│   ├── guides/
│   │   └── GuidesList.tsx                    # i18n, поиск, фильтр, New badge
│   │   └── GuideDetail.tsx                   # i18n, lang switch, source link
│   ├── news/{NewsGrid,NewsDetail}.tsx
│   └── skills/SkillsCatalog.tsx
├── lib/
│   ├── benchmarks.ts                         # benchlm API
│   ├── repos.ts                              # 75 AI_REPOS
│   ├── github.ts                             # GitHub API
│   ├── rss.ts                                # RSS feeds
│   ├── cache.ts                              # Upstash Redis
│   ├── locale.ts                             # NEW: Zustand RU/EN store
│   └── utils.ts                              # cn, formatNumber, relativeTime
├── types/{index,github,benchmark}.ts
├── data/
│   ├── benchmarks.json                       # fallback 20 моделей
│   ├── guides.json                           # NEW: 40 гайдов (RU+EN)
│   └── seed.json
└── test/setup.ts
```

---

## План — что делать дальше

### 🔴 HIGH PRIORITY

#### 1. Guides — контент-экспансия
- [x] Guides: 6 → 40 гайдов (Phase 8 — DONE)
- [ ] Добавить ещё 20-40 гайдов (есть темы в research)
- [ ] Настроить Vercel Cron Jobs для `update-guides`
- [ ] Добавить картинки/OG images для гайдов
- [ ] Автоматический перевод контента через AI для новых гайдов

#### 2. PWA полноценный
- [ ] Service worker с кэшированием статики и API-ответов
- [ ] Offline fallback страница
- [ ] Add to Home Screen иконки всех размеров
- [ ] Background sync для обновления данных в фоне

#### 3. Графики красивые
- [ ] Radar chart (паутина) для каждого model
- [ ] Timeline chart — динамика composite score
- [ ] Сравнение 2-3 моделей side-by-side
- [ ] Анимации появления данных (stagger, spring)

#### 4. Компаратор моделей
- [ ] Выбрать 2+ модели → таблица сравнения
- [ ] Price comparison (input/output token cost)

#### 5. Репозитории — полная интеграция с GitHub API
- [ ] Живые данные: реальные звезды, форки, описания
- [ ] GitHub README риал-тайм из API
- [ ] Trending badge визуально
- [ ] "Top picks this week" блок на главной

### 🟡 MEDIUM PRIORITY

#### 6. Auto-update все routes
- [ ] Cron `/api/cron/update-benchmarks`
- [ ] Cron `/api/cron/update-news`
- [ ] Webhook для Vercel Cron Jobs

#### 7. Больше контента
- [ ] Repositories: 75 → 200+
- [ ] News: реальные RSS (The Verge AI, TechCrunch AI, ArsTechnica)
- [ ] Skills: парсинг из AGENTS.md/CLAUDE.md топ репозиториев

#### 8. Бенчмарк страница — углубить
- [ ] Исторические данные: график изменения composite score
- [ ] Фильтр "only flagship" / "only local"
- [ ] Время последнего обновления

### 🔵 LOW PRIORITY

#### 9. Поиск везде
- [ ] `/api/search` — unified search (benchmark + repos + guides + news + skills)
- [ ] Cmd+K — поиск контента, не только страниц

#### 10. Фичи для "вау"
- [ ] Light mode toggle
- [ ] Share картинки для моделей (OG image)
- [ ] RSS подписка на апдейты бенчмарков

#### 11. Админка
- [ ] Дашборд: статусы кронов, ошибки
- [ ] Добавление репозиториев через UI

#### 12. Performance
- [ ] ISR для статических страниц
- [ ] Streaming SSR для больших списков
- [ ] Image optimization

#### 13. Deploy & DevOps
- [ ] Vercel deploy (ai-vision.dev)
- [ ] GitHub Actions CI/CD
- [ ] Vercel Cron Jobs

---

## Важные заметки

### Данные бенчмарков
- Источник: `https://benchlm.ai/api/data/leaderboard?category=coding`
- Кеш: Upstash Redis 1 час
- Фолбэк: `data/benchmarks.json`
- Модели ранжируются по composite score (среднее по 5 категориям)
- Gemini 3.1 Pro должен быть #2 или #3 (current: #3 с 88)

### GitHub API
- Rate limits: 60/hr без токена, 5000/hr с `GITHUB_TOKEN`
- Search API: 30 req/min с токеном
- В cron используем search по 12 AI-запросам

### Guides система
- `src/data/guides.json` — 40 гайдов, каждый с `*Ru`/`*En` полями
- API: `/api/guides?lang=ru|en`, `/api/guides/[slug]?lang=ru|en`
- Cron: `/api/cron/update-guides` — парсинг 7 RSS источников
- Клиент: GuidesList загружает динамически, GuideDetail использует store
- i18n: `useLocaleStore` (zustand) + localStorage + кнопка в GlassNav

### Репозиторий проекта
- **Git remote**: `https://github.com/m1tski/ai-vision`
- **Ветки**: `main` — production-ready код
- **Структура коммита**: `<тип>: <что сделано>`
  - `feat:` — новая фича | `fix:` — багфикс | `refactor:` — рефактор | `chore:` — настройка
- **Не коммитить**: `.env.local`, `node_modules/`, `.next/`

### Стиль кода
- NO comments в коде (если не попросили)
- NO emoji в UI
- Server Components by default
- Все карточки через GlassCard
- B&W + iOS accent colors только для статусов

### Текущие проблемы / блокеры
- нет `UPSTASH_REDIS_REST_URL` → `getCached` всегда fetches заново
- нет `GITHUB_TOKEN` → низкий rate limit (60 req/hr)
- нет `CRON_SECRET` → публичный доступ к cron route
- нет Vercel → нет cron jobs
- тесты только на 4 компонента, coverage низкий
- guides.json стал очень большим (~130KB) — при добавлении новых гайдов возможно стоит разделить на чанки

### ESLint баги (исправлены 12.07.2026)
- `LeaderboardTable.tsx` — SortHeader inlined (был error)
- `CommandPalette.tsx` — setSelectedIndex в useEffect (был error)
- `GlassNav.tsx` — удалён неиспользуемый `router`
- `GlassNav.tsx` — удалён неиспользуемый `useRouter`
- `NewsDetail.tsx` — удалены неиспользуемые `Clock`, `Tag`
- `RepoGrid.tsx` — удалён неиспользуемый `relativeTime`
- `update-guides/route.ts` — удалены неиспользуемые `getCached`, `descRegex`

---

*Last updated: 2026-07-12*
*Generated by AI-VISION agent*
