import React from "react";
import { notFound } from "next/navigation";
import NewsDetail from "@/components/news/NewsDetail";

const NEWS = [
  { slug: "claude-4-1-sonnet-swe-bench", title: "Claude 4.1 Sonnet achieves 72.4% on SWE-bench, narrowing gap with Gemini", source: "Hacker News", date: "2026-07-02", category: "Model Release", content: "Anthropic's latest model shows significant improvement in software engineering tasks, scoring 72.4% on the SWE-bench benchmark.\n\nThis represents a 2.4 point improvement over the previous version, bringing Claude 4.1 Sonnet closer to Gemini 2.5 Pro's leading score of 74.1%.\n\nKey improvements include better code generation, improved debugging capabilities, and more accurate test case generation. The model also shows significant gains in multi-file editing scenarios." },
  { slug: "vibe-coding-meetup-2026", title: "Vibe Coding meetup 2026: Community insights and tool announcements", source: "Reddit r/LocalLLaMA", date: "2026-07-01", category: "Community", content: "Highlights from the latest vibe coding community meetup featuring new MCP servers, skill packs, and workflow improvements.\n\nThe event brought together over 500 developers from around the world, sharing their experiences with AI-assisted development.\n\nNew tools announced include an improved rulebook-ai pack system, enhanced MCP protocol support, and a new generation of SKILL.md files for Claude Code." },
  { slug: "gpt-4-1-released", title: "OpenAI releases GPT-4.1 with improved coding capabilities", source: "Hacker News", date: "2026-06-30", category: "Model Release", content: "GPT-4.1 brings enhanced reasoning and coding abilities, scoring 69.8% on SWE-bench and 90.1% on HumanEval.\n\nThe new model represents a significant step forward for OpenAI in the competitive AI landscape.\n\nNotable improvements include better code generation, improved reasoning chains, and enhanced safety features built into the model architecture." },
  { slug: "rulebook-ai-gains-traction", title: "New rulebook-ai pack system gains traction among AI developers", source: "Reddit r/MachineLearning", date: "2026-06-28", category: "Tool", content: "The rulebook-ai pack-based architecture for AI coding assistants is seeing growing adoption with the light-spec pack.\n\nDevelopers are praising the modular approach to AI agent configuration, which allows for easy sharing and versioning of development rules.\n\nThe system supports multiple AI coding assistants including Cursor, Windsurf, Cline, and Claude Code." },
  { slug: "mcp-protocol-v1-3", title: "MCP protocol v1.3 released with streaming improvements", source: "Hacker News", date: "2026-06-27", category: "Tool", content: "The Model Context Protocol gets streaming support, better error handling, and improved cross-client compatibility.\n\nVersion 1.3 introduces significant performance improvements and new capabilities for MCP server developers.\n\nKey features include bidirectional streaming, improved error reporting, and standardized authentication flows." },
  { slug: "cpi-methodology-research", title: "Research: CPI methodology improves AI agent success rate by 27%", source: "Reddit r/LocalLLaMA", date: "2026-06-25", category: "Research", content: "Chain-Pattern Interrupt (CPI) approach shows significant improvement in AI agent task completion rates across 153 evaluations.\n\nThe research, conducted by the Vibe Check team, demonstrates that structured intervention patterns can dramatically improve AI agent performance.\n\nKey findings include a 27% improvement in task success rate and a 41% reduction in harmful actions." },
  { slug: "gemini-2-5-pro-swe-bench", title: "Gemini 2.5 Pro leads SWE-bench with 74.1% score", source: "Hacker News", date: "2026-06-22", category: "Model Release", content: "Google's Gemini 2.5 Pro achieves the highest score on SWE-bench, surpassing both Claude 4.1 and GPT-4.1.\n\nThe model demonstrates exceptional software engineering capabilities, particularly in complex debugging scenarios.\n\nGoogle attributes the improvement to enhanced training data and a new architecture that better understands code structure." },
  { slug: "awesome-vibe-coding-2026", title: "Awesome Vibe Coding list surpasses 500 resources", source: "Reddit r/LocalLLaMA", date: "2026-06-20", category: "Community", content: "The curated awesome-vibe-coding list now features over 500 resources covering tools, guides, and communities for AI-assisted development.\n\nThe list has become the go-to resource for developers exploring vibe coding, with contributions from the global community.\n\nRecent additions include new MCP servers, IDE plugins, and comprehensive documentation guides." },
];

export async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = NEWS.find((n) => n.slug === slug);

  if (!article) {
    notFound();
  }

  return <NewsDetail article={article} />;
}

export default NewsArticlePage;
