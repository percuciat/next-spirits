"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import { getStorageItem, setStorageItem } from "@/shared/lib";
import { TTheme } from "./types";
import { THEME_KEY } from "../constants";
import { ThemeContext } from "./theme-context";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<TTheme>(() => {
    return getStorageItem<TTheme>(THEME_KEY, "dark");
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      setStorageItem(THEME_KEY, next);
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  }, []);

  useEffect(() => {
    const stored = getStorageItem<TTheme>(THEME_KEY, "dark");
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
