"use client";

import { type TThreatLevel } from "../model";
import { type ISpiritCardProps } from "./types";
import styles from "./spirit-board.module.scss";

const threatLevelColors: Record<TThreatLevel, string> = {
  Low: "low",
  Medium: "medium",
  High: "high",
  Critical: "critical",
};

export function SpiritCard({
  spirit,
  onCapture,
  isCapturing,
}: ISpiritCardProps) {
  const isCaptured = spirit.status === "Captured";
  const threatClass = threatLevelColors[spirit.threatLevel];

  return (
    <div className={`${styles.card} ${isCaptured ? styles.captured : ""}`}>
      <div className={styles.header}>
        <h3 className={styles.name}>{spirit.name}</h3>
        <span className={`${styles.threatBadge} ${styles[threatClass]}`}>
          {spirit.threatLevel}
        </span>
      </div>

      <div className={styles.details}>
        <div className={styles.row}>
          <span className={styles.label}>Location</span>
          <span className={styles.value}>{spirit.location}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Status</span>
          <span
            className={`${styles.status} ${
              styles[spirit.status.toLowerCase()]
            }`}
          >
            {spirit.status}
          </span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Last Seen</span>
          <span className={styles.value}>
            {new Date(spirit.lastSeen).toLocaleTimeString()}
          </span>
        </div>
      </div>

      {!isCaptured && onCapture && (
        <button
          className={styles.captureButton}
          onClick={() => onCapture(spirit.id)}
          disabled={isCapturing}
        >
          {isCapturing ? "Capturing..." : "Capture"}
        </button>
      )}
    </div>
  );
}
