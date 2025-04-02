import { Employee } from '@employees/domain/models';
import { UpdateEmployeeSchema } from '@employees/domain/schema';
import { UpdateEmployeeDepartmentForm } from '../forms/UpdateEmployeeDepartmentForm';
import { EmployeeStatusBadge } from './components/EmployeeStatusBadge';
import { EmployeeInfo } from './components/EmployeeInfo';
import { DepartmentHistoryTable } from './components/DepartmentHistoryTable';

interface EmployeeDetailsProps {
  employee: Employee;
  onToggleActive: (active: boolean) => void;
  onSave: (data: Partial<Pick<UpdateEmployeeSchema, 'department'>>) => void;
}

export const  EmployeeDetails = ({
  employee,
  onSave,
  onToggleActive,
}: EmployeeDetailsProps) => {
  const fullName = `${employee.firstName} ${employee.lastName}`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <EmployeeStatusBadge name={fullName} active={employee.active} />
        <div className="md:col-span-2">
          <EmployeeInfo employee={employee} onToggleActive={onToggleActive} />
          <UpdateEmployeeDepartmentForm onSave={onSave} employee={employee} />
        </div>
      </div>

      <DepartmentHistoryTable employee={employee} />
    </div>
  );
};
