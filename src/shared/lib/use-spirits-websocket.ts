"use client";

import { useEffect, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { TSpirit, SpiritSchema } from "@/entities/spirit";
import { WS_URL } from "@/shared/config";
import { useToast } from "@/shared/ui";
import { IWSMessage } from "./types";

export function useSpiritsWebSocket() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    try {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("[WS Client] Connected");
      };

      ws.onmessage = (event) => {
        try {
          const data: IWSMessage = JSON.parse(event.data);

          if (data.type === "SPIRIT_UPDATE") {
            const spirit = SpiritSchema.parse(data.payload);

            queryClient.setQueryData<TSpirit[]>(["spirits"], (old) => {
              if (!old) return old;

              const existingIndex = old.findIndex((s) => s.id === spirit.id);
              if (existingIndex === -1) return old;

              const oldSpirit = old[existingIndex];

              if (oldSpirit.threatLevel !== spirit.threatLevel) {
                const direction = getThreatDirection(
                  oldSpirit.threatLevel,
                  spirit.threatLevel
                );
                addToast(
                  direction === "up" ? "warning" : "info",
                  `${spirit.name}: ${oldSpirit.threatLevel} → ${spirit.threatLevel}`
                );
              }

              const updated = [...old];
              updated[existingIndex] = spirit;
              return updated;
            });
          }
        } catch (err) {
          console.error("[WS Client] Error parsing message:", err);
        }
      };

      ws.onclose = () => {
        console.log("[WS Client] Disconnected");
        reconnectTimeoutRef.current = setTimeout(connect, 3000);
      };

      ws.onerror = (error) => {
        console.error("[WS Client] Error:", error);
      };
    } catch (err) {
      console.error("[WS Client] Connection failed:", err);
      reconnectTimeoutRef.current = setTimeout(connect, 3000);
    }
  }, [queryClient, addToast]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  return wsRef.current;
}

function getThreatDirection(oldLevel: string, newLevel: string): "up" | "down" {
  const levels = ["Low", "Medium", "High", "Critical"];
  return levels.indexOf(newLevel) > levels.indexOf(oldLevel) ? "up" : "down";
}
