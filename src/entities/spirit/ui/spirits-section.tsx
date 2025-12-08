"use client";

import { SpiritCard } from "@/entities/spirit";
import { EmptyState } from "./empty-state";
import { ISpiritsSectionProps } from "./types";
import styles from "./spirit-board.module.scss";

export function SpiritsSection({
  title,
  spirits,
  emptyMessage,
  onCapture,
  capturingId,
}: ISpiritsSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <span className={styles.count}>{spirits.length}</span>
      </div>

      {spirits.length > 0 ? (
        <div className={styles.grid}>
          {spirits.map((spirit) => (
            <SpiritCard
              key={spirit.id}
              spirit={spirit}
              onCapture={onCapture}
              isCapturing={capturingId === spirit.id}
            />
          ))}
        </div>
      ) : (
        <EmptyState message={emptyMessage} isSection />
      )}
    </section>
  );
}

