import { forwardRef } from 'react';
import { Loader2Icon, LucideProps } from 'lucide-react';
import { cn } from '@/shared/utils/tailwindcss/cn';

export const Loader = forwardRef<SVGSVGElement, LucideProps>(
  ({ className, size = 32, ...props }, ref) => {
    return (
      <Loader2Icon
        ref={ref}
        className={cn('animate-spin', className)}
        size={size}
        {...props}
      />
    );
  },
);

Loader.displayName = 'Loader';
