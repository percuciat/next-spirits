"use client";

import { createContext } from "react";
import { IThemeContextValue } from "./types";

export const ThemeContext = createContext<IThemeContextValue | null>(null);
