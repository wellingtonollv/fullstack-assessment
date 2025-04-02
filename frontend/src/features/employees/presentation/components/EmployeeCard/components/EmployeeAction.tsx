import { Button } from '@/shared/components/ui/button';
import { useModal } from '@/shared/providers/modal/useModal';
import { EyeIcon, XIcon } from 'lucide-react';
import { DeleteEmployeeContent } from '../../modals/DeleteEmployeeContent';
import { EmployeeDetailsContent } from '../../modals/EmployeeDetailsContent';
import { Employee } from '@employees/domain/models';

type EmployeeActionProps = {
  employeeId: Employee['id'];
  name: Employee['firstName'] | Employee['lastName'];
};

export const EmployeeAction = ({ employeeId, name }: EmployeeActionProps) => {
  const { open } = useModal();

  function handleDeleteEmployee() {
    open(
      <DeleteEmployeeContent employeeId={employeeId} name={name} />,
      'Delete Employee',
    );
  }

  function handleDetailsEmployee() {
    open(
      <EmployeeDetailsContent employeeId={employeeId} />,
      'Employee Details',
    );
  }

  return (
    <div className="flex justify-between gap-2">
      <Button
        className="flex-1 cursor-pointer"
        onClick={handleDetailsEmployee}
        variant="outline"
      >
        <EyeIcon />
        View Details
      </Button>
      <Button
        className="flex-1 cursor-pointer text-red-600 hover:text-red-600/70"
        onClick={handleDeleteEmployee}
        variant="outline"
      >
        <XIcon />
        Delete
      </Button>
    </div>
  );
};
