import { useTheme } from '@/shared/hooks/useTheme';
import { Button } from '../ui/button';
import Logo from '@/shared/assets/logo.svg?react';
import { MoonIcon, SunIcon } from 'lucide-react';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="z-10 h-header bg-background/95 text-primary-foreground py-4 sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center justify-between">
        <Logo className="text-black dark:text-white" />

        <Button onClick={toggleTheme} variant="outline">
          <span className="text-black dark:text-white">
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </span>
        </Button>
      </div>
    </header>
  );
}
