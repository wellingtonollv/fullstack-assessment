import { useState, useEffect } from 'react';
import { ThemeProviderContext, Theme, ThemeContextProps } from './ThemeContext';

type ThemeProviderProps = {
  defaultTheme?: Theme;
  storageKey?: string;
} & React.PropsWithChildren;

export const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    toggleTheme: () => {
      setTheme((prevTheme) => {
        const newTheme = prevTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem(storageKey, newTheme);
        return newTheme;
      });
    },
  };

  const contextValue: ThemeContextProps = value;

  return (
    <ThemeProviderContext.Provider value={contextValue}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
