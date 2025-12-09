import { SpiritsArraySchema, TSpirit } from "../model";
import { apiClient } from "@/shared/api";

export async function fetchSpirits() {
  const data = await apiClient("/spirits");
  return SpiritsArraySchema.parse(data);
}
