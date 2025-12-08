"use client";

import { IButtonProps } from "./types";
import styles from "./button.module.scss";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: IButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
