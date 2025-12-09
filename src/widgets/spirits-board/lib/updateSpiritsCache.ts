import { QueryClient } from "@tanstack/react-query";
import { TSpirit } from "@/entities/spirit";
import { TAddTost } from "@/shared/ui";
import { handleThreatChange } from "../lib/handleThreatChange";

export function updateSpiritsCache(
  queryClient: QueryClient,
  spirit: TSpirit,
  addToast: TAddTost
) {
  queryClient.setQueryData<TSpirit[]>(["spirits"], (old) => {
    if (!old) return old;

    const existingIndex = old.findIndex((s) => s.id === spirit.id);
    if (existingIndex === -1) return old;

    handleThreatChange(old[existingIndex], spirit, addToast);

    const updated = [...old];
    updated[existingIndex] = spirit;
    return updated;
  });
}
