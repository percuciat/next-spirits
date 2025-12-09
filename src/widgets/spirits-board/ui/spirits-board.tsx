"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSpirits } from "@/entities/spirit";
import {
  LoadingState,
  ErrorState,
  EmptyState,
  SpiritsBoardContent,
} from "@/entities/spirit";
import { useCaptureSpirit } from "@/features/capture-spirit";
import { useSpiritsWebSocket } from "../hooks/useSpiritsWebsocket";

export function SpiritsBoard() {
  useSpiritsWebSocket();

  const {
    data: spirits,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["spirits"],
    queryFn: fetchSpirits,
  });

  const captureMutation = useCaptureSpirit();

  const handleCapture = (spiritId: string) => {
    captureMutation.mutate(spiritId);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  if (!spirits || spirits.length === 0) {
    return <EmptyState />;
  }

  const capturingId = captureMutation.isPending
    ? captureMutation.variables ?? null
    : null;

  return (
    <SpiritsBoardContent
      spirits={spirits}
      onCapture={handleCapture}
      capturingId={capturingId}
    />
  );
}
