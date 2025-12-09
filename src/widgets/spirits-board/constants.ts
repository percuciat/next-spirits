import { TThreatLevel } from "@/entities/spirit";

export const THREAT_LEVEL_ORDER: Record<TThreatLevel, number> = {
  Low: 0,
  Medium: 1,
  High: 2,
  Critical: 3,
};

export const RECONNECT_DELAY = 5000;
