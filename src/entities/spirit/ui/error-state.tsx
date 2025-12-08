"use client";

import styles from "./spirit-board.module.scss";

export function ErrorState() {
  return (
    <div className={styles.error}>
      <span>Failed to load spirits data</span>
    </div>
  );
}

