import Logo from '@/shared/assets/logo.svg?react';

export function Header() {

  return (
    <header className="z-10 h-header bg-background/95 text-primary-foreground py-4 sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center justify-between">
        <Logo className="text-black dark:text-white" />

        
      </div>
    </header>
  );
}
