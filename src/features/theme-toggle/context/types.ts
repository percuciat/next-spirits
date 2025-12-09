export type TTheme = "light" | "dark";

export interface IThemeContextValue {
  theme: TTheme;
  toggleTheme: () => void;
}

