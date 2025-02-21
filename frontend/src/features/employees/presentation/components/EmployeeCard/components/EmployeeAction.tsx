import { Button } from '@/shared/components/ui/button';
import { EyeIcon, XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type EmployeeActionProps = {
  id: string;
};

export const EmployeeAction = ({ id }: EmployeeActionProps) => {
  return (
    <div className="flex justify-between gap-2">
      <Button asChild variant="outline" className="flex-1 cursor-pointer">
        <div>
          <EyeIcon />
          <Link to={`/employees/${id}`}>View Details</Link>
        </div>
      </Button>
      <Button
        asChild
        variant="outline"
        className="flex-1 cursor-pointer text-red-600 hover:text-red-600/70"
      >
        <div>
          <XIcon />
          <Link to={`/employees/${id}/edit`}>Delete</Link>
        </div>
      </Button>
    </div>
  );
};
