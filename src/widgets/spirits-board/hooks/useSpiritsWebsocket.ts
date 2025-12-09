"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/ui";
import { createWebSocket } from "../lib/createWebSocket";
import { RECONNECT_DELAY } from "../constants";

export function useSpiritsWebSocket() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const connect = () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) return;

      try {
        wsRef.current = createWebSocket(queryClient, addToast, () => {
          reconnectTimeoutRef.current = setTimeout(connect, RECONNECT_DELAY);
        });
      } catch (err) {
        console.error("[WS Client] Connection failed:", err);
        reconnectTimeoutRef.current = setTimeout(connect, RECONNECT_DELAY);
      }
    };

    connect();

    return () => {
      clearTimeout(reconnectTimeoutRef.current);
      wsRef.current?.close();
    };
  }, [queryClient, addToast]);

  return wsRef.current;
}
