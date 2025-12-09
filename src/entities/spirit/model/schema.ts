import { z } from "zod";

export const ThreatLevelSchema = z.enum(["Low", "Medium", "High", "Critical"]);

export const SpiritStatusSchema = z.enum(["Active", "Captured"]);

export const SpiritSchema = z.object({
  id: z.string(),
  name: z.string(),
  threatLevel: ThreatLevelSchema,
  location: z.string(),
  status: SpiritStatusSchema,
  lastSeen: z.string().datetime(),
});

export const SpiritsArraySchema = z.array(SpiritSchema);

export const SpiritUpdateEventSchema = z.object({
  type: z.literal("SPIRIT_UPDATE"),
  payload: SpiritSchema,
});

export const CaptureResultSchema = z.object({
  success: z.boolean(),
  spirit: SpiritSchema.optional(),
  message: z.string().optional(),
});
