import { useGetEmployee } from '@employees/application/queries/useGetEmployee';
import { useUpdateEmployee } from '@employees/application/mutations/useUpdateEmployee';
import { Employee } from '@employees/domain/models';
import { EmployeeDetails } from '../EmployeeDetails';

export const EmployeeDetailsContent = ({
  employeeId,
}: {
  employeeId: Employee['id'];
}) => {
  const { data: employee, isLoading } = useGetEmployee(employeeId);
  const updateEmployee = useUpdateEmployee();

  if (isLoading) return <p>Loading...</p>;
  if (!employee) return <p>Employee not found</p>;

  return (
    <EmployeeDetails
      employee={employee}
      onSave={(updatedData) =>
        updateEmployee.mutate({ id: employeeId, data: updatedData })
      }
      onToggleActive={(active) =>
        updateEmployee.mutate({ id: employeeId, data: { active } })
      }
    />
  );
};
