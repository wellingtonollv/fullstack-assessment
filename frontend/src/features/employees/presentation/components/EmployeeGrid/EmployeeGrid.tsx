import { lazy, Suspense } from 'react';
import { Employee } from '@employees/domain/models';

const EmployeeCard = lazy(() => import('../EmployeeCard/EmployeeCard'));

type EmployeeGridProps = {
  employees: Employee[];
};

const EmployeeGrid = ({ employees }: EmployeeGridProps) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {employees.map((emp) => (
        <Suspense key={emp.id} fallback={<p>Loading employee...</p>}>
          <EmployeeCard employee={emp} />
        </Suspense>
      ))}
    </div>
  );
};

export default EmployeeGrid;
