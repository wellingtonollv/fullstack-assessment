import { Suspense, lazy } from 'react';

import { useGetEmployees } from '@employees/application/queries/useGetEmployees';
import { getEmployeeCount } from '@employees/domain/use-cases/getEmployeeCount';
import { Button } from '@/shared/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useModal } from '@/shared/providers/modal/useModal';
import { CreateEmployeeContent } from '@employees/presentation/components/modals/CreateEmployeeContent';
import { Skeleton } from '@/shared/components/ui/skeleton';

const EmployeeGrid = lazy(
  () => import('@employees/presentation/components/EmployeeGrid/EmployeeGrid'),
);

export const EmployeeList = () => {
  const { data: employees, error } = useGetEmployees();
  const totalEmployees = getEmployeeCount(employees);
  const { open } = useModal();

  function handleCreateEmployee() {
    open(<CreateEmployeeContent />, 'Create Employee');
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-600">{totalEmployees} employees registered</p>
        <Button onClick={handleCreateEmployee}>
          <PlusIcon className="mr-2 h-6 w-6" />
          <span>New Employee</span>
        </Button>
      </div>

      {error && <p className="text-red-500">Error fetching employees.</p>}

      <Suspense fallback={<Skeleton className="h-card w-full rounded-xl" />}>
        {employees && <EmployeeGrid employees={employees} />}
      </Suspense>
    </div>
  );
};
