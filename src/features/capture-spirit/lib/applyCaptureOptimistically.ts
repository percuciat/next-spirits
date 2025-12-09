import { QueryClient } from "@tanstack/react-query";
import { TSpirit } from "@/entities/spirit";

export async function applyCaptureOptimistically(
  queryClient: QueryClient,
  spiritId: string
) {
  await queryClient.cancelQueries({ queryKey: ["spirits"] });

  const previousSpirits = queryClient.getQueryData<TSpirit[]>(["spirits"]);

  queryClient.setQueryData<TSpirit[]>(["spirits"], (old) =>
    old?.map((spirit) =>
      spirit.id === spiritId
        ? {
            ...spirit,
            status: "Captured" as const,
            lastSeen: new Date().toISOString(),
          }
        : spirit
    )
  );

  return { previousSpirits, spiritId };
}
