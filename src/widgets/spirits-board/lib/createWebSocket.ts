import { QueryClient } from "@tanstack/react-query";
import { SpiritSchema } from "@/entities/spirit";
import { WS_URL } from "@/shared/config";
import { TAddTost } from "@/shared/ui";
import { IWSMessage } from "./types";
import { updateSpiritsCache } from "./updateSpiritsCache";

function handleMessage(
  event: MessageEvent,
  queryClient: QueryClient,
  addToast: TAddTost
) {
  try {
    const data: IWSMessage = JSON.parse(event.data);

    if (data.type === "SPIRIT_UPDATE") {
      const spirit = SpiritSchema.parse(data.payload);
      updateSpiritsCache(queryClient, spirit, addToast);
    }
  } catch (err) {
    console.error("[WS Client] Error parsing message:", err);
  }
}

export function createWebSocket(
  queryClient: QueryClient,
  addToast: TAddTost,
  onReconnect: () => void
) {
  const ws = new WebSocket(WS_URL);

  ws.onopen = () => console.log("[WS Client] Connected");
  ws.onmessage = (e) => handleMessage(e, queryClient, addToast);
  ws.onclose = () => {
    console.log("[WS Client] Disconnected");
    onReconnect();
  };
  ws.onerror = (error) => console.error("[WS Client] Error:", error);

  return ws;
}
