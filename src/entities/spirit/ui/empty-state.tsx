"use client";

import { IEmptyStateProps } from "./types";
import styles from "./spirit-board.module.scss";

export function EmptyState({
  message = "No spirits detected",
  isSection = false,
}: IEmptyStateProps) {
  return (
    <div className={isSection ? styles.emptySection : styles.empty}>
      <span>{message}</span>
    </div>
  );
}

