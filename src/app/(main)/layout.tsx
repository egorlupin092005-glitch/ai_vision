import React from "react";
import GlassNav from "@/components/glass/GlassNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlassNav />
      <main className="flex-1">{children}</main>
      <footer className="glass border-t border-border-default py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-sm text-text-muted">
            AI-VISION <span className="text-text-tertiary">v0.1.0</span>
          </span>
          <span className="font-mono text-xs text-text-muted">
            Built with AI by AI for AI
          </span>
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <a href="#" className="hover:text-text-primary transition-colors">
              About
            </a>
            <a href="#" className="hover:text-text-primary transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-text-primary transition-colors">
              RSS
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
