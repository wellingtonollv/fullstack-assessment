import { lazy, Suspense } from 'react';
import { Employee } from '@employees/domain/models';
import { Skeleton } from '@/shared/components/ui/skeleton';

const EmployeeCard = lazy(() => import('../EmployeeCard/EmployeeCard'));

type EmployeeGridProps = {
  employees: Employee[];
};

const EmployeeGrid = ({ employees }: EmployeeGridProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {employees.map((emp) => (
        <Suspense
          key={emp.id}
          fallback={<Skeleton className="h-card w-full rounded-xl" />}
        >
          <EmployeeCard employee={emp} />
        </Suspense>
      ))}
    </div>
  );
};

export default EmployeeGrid;
