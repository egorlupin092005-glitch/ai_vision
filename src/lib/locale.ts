"use client";

import { create } from "zustand";

export type Locale = "ru" | "en";

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "ru";
  const stored = localStorage.getItem("ai-vision-locale");
  if (stored === "ru" || stored === "en") return stored;
  return "ru";
}

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: getInitialLocale(),
  setLocale: (locale) => {
    localStorage.setItem("ai-vision-locale", locale);
    set({ locale });
  },
  toggleLocale: () =>
    set((state) => {
      const next = state.locale === "ru" ? "en" : "ru";
      localStorage.setItem("ai-vision-locale", next);
      return { locale: next };
    }),
}));
