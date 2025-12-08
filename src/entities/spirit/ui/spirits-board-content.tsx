"use client";

import { SpiritsSection } from "./spirits-section";
import { ISpiritsBoardContentProps } from "./types";
import styles from "./spirit-board.module.scss";

export function SpiritsBoardContent({
  spirits,
  onCapture,
  capturingId,
}: ISpiritsBoardContentProps) {
  const activeSpirits = spirits.filter((s) => s.status === "Active");
  const capturedSpirits = spirits.filter((s) => s.status === "Captured");

  return (
    <div className={styles.board}>
      <SpiritsSection
        title="Active Anomalies"
        spirits={activeSpirits}
        emptyMessage="All spirits captured!"
        onCapture={onCapture}
        capturingId={capturingId}
      />

      <SpiritsSection
        title="Captured"
        spirits={capturedSpirits}
        emptyMessage="No captures yet"
      />
    </div>
  );
}

