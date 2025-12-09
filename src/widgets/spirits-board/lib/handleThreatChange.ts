import { TSpirit, TThreatLevel } from "@/entities/spirit";
import { TAddTost } from "@/shared/ui";
import { THREAT_LEVEL_ORDER } from "../constants";

function getThreatDirection(oldLevel: TThreatLevel, newLevel: TThreatLevel) {
  return THREAT_LEVEL_ORDER[newLevel] > THREAT_LEVEL_ORDER[oldLevel]
    ? "up"
    : "down";
}

export function handleThreatChange(
  oldSpirit: TSpirit,
  newSpirit: TSpirit,
  addToast: TAddTost
) {
  if (oldSpirit.threatLevel !== newSpirit.threatLevel) {
    const direction = getThreatDirection(
      oldSpirit.threatLevel,
      newSpirit.threatLevel
    );
    addToast(
      direction === "up" ? "warning" : "info",
      `${newSpirit.name}: ${oldSpirit.threatLevel} → ${newSpirit.threatLevel}`
    );
  }
}
