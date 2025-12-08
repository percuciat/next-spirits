"use client";

import { IBadgeProps } from "./types";
import styles from "./badge.module.scss";

export function Badge({ children, variant = "default" }: IBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {children}
    </span>
  );
}
