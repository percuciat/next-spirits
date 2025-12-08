export type TToastType = "success" | "error" | "info" | "warning";

export interface IToast {
  id: string;
  type: TToastType;
  message: string;
}

export interface IToastContextValue {
  toasts: IToast[];
  addToast: (type: TToastType, message: string) => void;
  removeToast: (id: string) => void;
}

export interface IToastContainerProps {
  toasts: IToast[];
  onRemove: (id: string) => void;
}

