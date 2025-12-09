import { NextRequest } from "next/server";
import { spirits } from "@/entities/spirit/model/data";
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

  if (spirits[spiritIndex].status === "Captured") {
    return ApiResponse.alreadyCaptured();
  }

  return ApiResponse.captured({
    ...spirits[spiritIndex],
    status: "Captured",
    lastSeen: new Date().toISOString(),
  });
}
