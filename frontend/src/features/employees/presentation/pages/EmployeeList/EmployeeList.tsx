import { Link } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { useGetEmployees } from '@employees/application/queries/useGetEmployee';
import { Button } from '@/shared/components/ui/button';
import { getEmployeeCount } from '@employees/domain/use-cases/getEmployeeCount';

const EmployeeGrid = lazy(
  () => import('@employees/presentation/components/EmployeeGrid/EmployeeGrid'),
);

export const EmployeeList = () => {
  const { data: employees, error } = useGetEmployees();
  const totalEmployees = getEmployeeCount(employees);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-600">{totalEmployees} employees registered</p>
        <Button asChild>
          <Link to="/employees/create">+ New Employee</Link>
        </Button>
      </div>

      {error && <p className="text-red-500">Error fetching employees.</p>}

      <Suspense fallback={<p>Loading employees...</p>}>
        {employees && <EmployeeGrid employees={employees} />}
      </Suspense>
    </div>
  );
};
