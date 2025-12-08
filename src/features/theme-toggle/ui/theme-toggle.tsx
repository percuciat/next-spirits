"use client";

import { useTheme } from "../model/theme-context";
import styles from "./theme-toggle.module.scss";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <span className={styles.icon}>
        {theme === "dark" ? "☀️" : "🌙"}
      </span>
      <span className={styles.label}>
        {theme === "dark" ? "Light" : "Dark"}
      </span>
    </button>
  );
}

