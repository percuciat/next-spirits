"use client";

import styles from "./spirit-board.module.scss";

export function LoadingState() {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner} />
      <span>Loading spirits data...</span>
    </div>
  );
}

