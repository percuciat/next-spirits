import { TSpirit } from "@/entities/spirit";

export interface IWSMessage {
  type: "SPIRIT_UPDATE" | "INITIAL_STATE";
  payload: TSpirit | TSpirit[];
}

