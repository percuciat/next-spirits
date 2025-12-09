export type TToastType = "success" | "error" | "info" | "warning";

export interface IToast {
  id: string;
  type: TToastType;
  message: string;
}

export type TAddTost = (type: TToastType, message: string) => void;

export interface IToastContextValue {
  toasts: IToast[];
  addToast: TAddTost;
  removeToast: (id: string) => void;
}

export interface IToastContainerProps {
  toasts: IToast[];
  onRemove: (id: string) => void;
}
