import { useContext } from 'react';
import { ThemeProviderContext } from '../providers/theme/ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
