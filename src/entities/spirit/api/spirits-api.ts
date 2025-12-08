import { apiClient } from '@/shared/api';
import { TSpirit, SpiritsArraySchema, CaptureResultSchema, TCaptureResult } from '../model';

export async function fetchSpirits(): Promise<TSpirit[]> {
  const data = await apiClient<unknown>('/spirits');
  return SpiritsArraySchema.parse(data);
}

export async function captureSpirit(spiritId: string): Promise<TCaptureResult> {
  const data = await apiClient<unknown>(`/spirits/${spiritId}/capture`, {
    method: 'POST',
  });
  return CaptureResultSchema.parse(data);
}
