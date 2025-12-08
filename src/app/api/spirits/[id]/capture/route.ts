import { NextRequest } from "next/server";
import { spirits } from "../../data";
import { ApiResponse } from "@/shared/api";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 30% chance of failure
  if (Math.random() < 0.3) {
    return ApiResponse.captureFailed();
  }

  const spiritIndex = spirits.findIndex((s) => s.id === id);

  if (spiritIndex === -1) {
    return ApiResponse.spiritNotFound();
  }

  const spirit = spirits[spiritIndex];

  if (spirit.status === "Captured") {
    return ApiResponse.alreadyCaptured();
  }

  // Update spirit status
  spirits[spiritIndex] = {
    ...spirit,
    status: "Captured",
    lastSeen: new Date().toISOString(),
  };

  return ApiResponse.captured(spirits[spiritIndex]);
}
