import { cn } from '@/shared/utils/tailwindcss/cn';
import { forwardRef, HTMLAttributes } from 'react';

interface EmployeeAvatarProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
}

export const EmployeeAvatar = forwardRef<HTMLDivElement, EmployeeAvatarProps>(
  ({ name, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative aspect-square w-full shrink-0 overflow-hidden',
          className,
        )}
      >
        <img
          src={`https://ui-avatars.com/api/?background=random&color=fff&font-size=0.24&name=${encodeURIComponent(
            name,
          )}`}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
    );
  },
);

EmployeeAvatar.displayName = 'EmployeeAvatar';
