import { Button } from '@/shared/components/ui/button';
import { useModal } from '@/shared/providers/modal/useModal';
import { EyeIcon, XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DeleteEmployeeContent } from '../../modals/DeleteEmployeeContent';

type EmployeeActionProps = {
  employeeId: string;
  name: string;
};

export const EmployeeAction = ({ employeeId, name }: EmployeeActionProps) => {
  const { open } = useModal();

  function handleDeleteEmployee() {
    open(
      <DeleteEmployeeContent employeeId={employeeId} name={name} />,
      'Delete Employee',
    );
  }
export const EmployeeAction = ({ id }: EmployeeActionProps) => {

  return (
    <div className="flex justify-between gap-2">
      <Button asChild variant="outline" className="flex-1 cursor-pointer">
        <div>
          <EyeIcon />
          <Link to={`/employees/${employeeId}`}>View Details</Link>
        </div>
      </Button>
      <Button
        asChild
        className="flex-1 cursor-pointer text-red-600 hover:text-red-600/70"
        onClick={handleDeleteEmployee}
        variant="outline"
      >
        <div>
          <XIcon />
          <Link to={`/employees/${employeeId}/edit`}>Delete</Link>
        </div>
      </Button>
    </div>
  );
};
