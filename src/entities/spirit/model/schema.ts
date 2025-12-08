import { z } from 'zod';

export const ThreatLevelSchema = z.enum(['Low', 'Medium', 'High', 'Critical']);
export type TThreatLevel = z.infer<typeof ThreatLevelSchema>;

export const SpiritStatusSchema = z.enum(['Active', 'Captured']);
export type TSpiritStatus = z.infer<typeof SpiritStatusSchema>;

export const SpiritSchema = z.object({
  id: z.string(),
  name: z.string(),
  threatLevel: ThreatLevelSchema,
  location: z.string(),
  status: SpiritStatusSchema,
  lastSeen: z.string().datetime(),
});

export type TSpirit = z.infer<typeof SpiritSchema>;

export const SpiritsArraySchema = z.array(SpiritSchema);

export const SpiritUpdateEventSchema = z.object({
  type: z.literal('SPIRIT_UPDATE'),
  payload: SpiritSchema,
});

export const CaptureResultSchema = z.object({
  success: z.boolean(),
  spirit: SpiritSchema.optional(),
  message: z.string().optional(),
});

export type TSpiritUpdateEvent = z.infer<typeof SpiritUpdateEventSchema>;
export type TCaptureResult = z.infer<typeof CaptureResultSchema>;
