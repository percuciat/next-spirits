import { TSpirit } from "@/entities/spirit";
import { QueryClient } from "@tanstack/react-query";

export function rollbackCapture(
  queryClient: QueryClient,
  previousSpirits: TSpirit[] | undefined
) {
  if (previousSpirits) {
    queryClient.setQueryData(["spirits"], previousSpirits);
  }
}
