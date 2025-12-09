export type TSpiritStatus = "Active" | "Captured";
export type TThreatLevel = "Low" | "Medium" | "High" | "Critical";

export type TSpiritUpdateEvent = {
  type: "SPIRIT_UPDATE";
  payload: TSpirit;
};

export type TCaptureResult = {
  success: boolean;
  spirit?: TSpirit;
  message?: string;
};

export type TSpirit = {
  id: string;
  name: string;
  threatLevel: TThreatLevel;
  location: string;
  status: TSpiritStatus;
  lastSeen: string;
};
