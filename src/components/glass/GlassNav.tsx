"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Globe, Search, Menu, X, Command, Languages } from "lucide-react";
import CommandPalette from "./CommandPalette";
import { useLocaleStore } from "@/lib/locale";

const NAV_ITEMS = [
  { href: "/", label: "Benchmarks" },
  { href: "/repositories", label: "Repositories" },
  { href: "/guides", label: "Guides" },
  { href: "/news", label: "News" },
  { href: "/skills", label: "Skills" },
] as const;

export default function GlassNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = React.useState(false);
  const { locale, toggleLocale } = useLocaleStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCmdPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="font-mono text-lg tracking-widest text-text-primary hover:text-text-secondary transition-colors"
            >
              AI-VISION
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-text-primary"
                        : "text-text-muted hover:text-text-primary hover:bg-glass-bg-hover"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 glass rounded-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCmdPaletteOpen(true)}
                className="glass-input rounded-lg px-3 py-2 text-text-muted hover:text-text-primary transition-colors hidden sm:flex items-center gap-2 text-xs"
                aria-label="Search (Cmd+K)"
              >
                <Search size={16} />
                <span className="hidden lg:inline text-text-muted">Search...</span>
                <kbd className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/5 text-[10px] font-mono text-text-tertiary">
                  <Command size={10} />K
                </kbd>
              </button>

              <button
                onClick={toggleLocale}
                className="text-text-muted hover:text-text-primary transition-colors flex items-center gap-1 text-xs font-mono font-semibold"
                aria-label={`Switch language to ${locale === "ru" ? "English" : "Русский"}`}
              >
                <Languages size={16} />
                <span className="hidden sm:inline text-xs">{locale === "ru" ? "EN" : "RU"}</span>
              </button>

              <a
                href="https://github.com/m1tski/ai-vision"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="GitHub"
              >
                <Globe size={18} />
              </a>

              <button
                className="md:hidden text-text-muted hover:text-text-primary transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-border-default glass"
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "text-text-primary glass"
                        : "text-text-muted hover:text-text-primary hover:bg-glass-bg-hover"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </nav>

      <CommandPalette
        isOpen={isCmdPaletteOpen}
        onClose={() => setIsCmdPaletteOpen(false)}
      />
    </>
  );
}
