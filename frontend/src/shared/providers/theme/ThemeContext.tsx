import { createContext } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeProviderContext = createContext<
  ThemeContextProps | undefined
>(undefined);
