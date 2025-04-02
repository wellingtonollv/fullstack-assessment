import { Button } from '@/shared/components/ui/button';
import { getEmployeeStatus } from '@employees/domain/use-cases/getEmployeeStatus';
import { cn } from '@/shared/utils/tailwindcss/cn';

interface EmployeeStatusBadgeProps {
  active: boolean;
  name: string;
}

export const EmployeeStatusBadge = ({
  active,
  name,
}: EmployeeStatusBadgeProps) => {
  return (
    <div className="relative mb-2 aspect-square max-h-56 w-full bg-[#a8f0e6]">
      <img
        src={`https://ui-avatars.com/api/?background=random&color=fff&font-size=0.24&name=${encodeURIComponent(
          name,
        )}`}
        alt={name}
        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy"
      />
      <Button
        className={cn(
          'pointer-events-none absolute bottom-0 left-0 right-0 rounded-none',
          { hidden: active },
        )}
        variant="destructive"
      >
        {getEmployeeStatus(active).status}
      </Button>
    </div>
  );
};
