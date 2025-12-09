"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { captureSpirit } from "@/entities/spirit";
import { useToast } from "@/shared/ui";
import { applyCaptureOptimistically, rollbackCapture } from "../lib";

export function useCaptureSpirit() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: captureSpirit,

    onMutate: (spiritId: string) =>
      applyCaptureOptimistically(queryClient, spiritId),

    onError: (_error, _spiritId, context) => {
      rollbackCapture(queryClient, context?.previousSpirits);
      addToast("error", "Capture failed! The spirit escaped.");
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
