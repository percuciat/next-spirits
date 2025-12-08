"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { captureSpirit, TSpirit } from "@/entities/spirit";
import { useToast } from "@/shared/ui";

export function useCaptureSpirit() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: captureSpirit,

    onMutate: async (spiritId: string) => {
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
    },

    onError: (error, spiritId, context) => {
      if (context?.previousSpirits) {
        queryClient.setQueryData(["spirits"], context.previousSpirits);
      }

      addToast("error", `Capture failed! The spirit escaped.`);
    },

    onSuccess: (data) => {
      if (data.success && data.spirit) {
        addToast("success", `${data.spirit.name} has been captured!`);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["spirits"] });
    },
  });
}
