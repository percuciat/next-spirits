import { TSpirit } from "@/entities/spirit";

export interface ISpiritCardProps {
  spirit: TSpirit;
  onCapture?: (spiritId: string) => void;
  isCapturing?: boolean;
}

export interface ISpiritsSectionProps {
  title: string;
  spirits: TSpirit[];
  emptyMessage: string;
  onCapture?: (spiritId: string) => void;
  capturingId?: string | null;
}

export interface ISpiritsBoardContentProps {
  spirits: TSpirit[];
  onCapture: (spiritId: string) => void;
  capturingId: string | null;
}

export interface IEmptyStateProps {
  message?: string;
  isSection?: boolean;
}
