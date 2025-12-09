import { apiClient } from "@/shared/api";
import { CaptureResultSchema, TCaptureResult } from "../model";

export async function captureSpirit(spiritId: string): Promise<TCaptureResult> {
  const data = await apiClient(`/spirits/${spiritId}/capture`, {
    method: "POST",
  });
  return CaptureResultSchema.parse(data);
}
