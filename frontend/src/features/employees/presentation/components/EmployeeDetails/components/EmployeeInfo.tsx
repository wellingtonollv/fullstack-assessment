import { Employee } from '@employees/domain/models';
import { Button } from '@/shared/components/ui/button';
import { getFormattedIsoDate } from '@employees/domain/use-cases/getFormattedIsoDate';
import { getElapsedTime } from '@employees/domain/use-cases/getElapsedTime';
import { getStatusButtonLabel } from '@employees/domain/use-cases/getEmployeeStatusAction';

interface EmployeeInfoProps {
  employee: Employee;
  onToggleActive: (active: boolean) => void;
}

export const EmployeeInfo = ({
  employee,
  onToggleActive,
}: EmployeeInfoProps) => {
  const {
    id,
    department,
    phone,
    address,
    hireDate,
    firstName,
    lastName,
    active,
  } = employee;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="mb-4 flex items-start justify-between">
      <div>
        <h3 className="text-lg font-medium">{fullName}</h3>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>
            Employee ID:{' '}
            <span className="font-medium text-secondary-foreground">{id}</span>
          </p>
          <p>
            Department:{' '}
            <span className="font-medium text-secondary-foreground">
              {department}
            </span>
          </p>
          <p>
            Telephone:{' '}
            <span className="font-medium text-secondary-foreground">
              {phone}
            </span>
          </p>
          <p>
            Address:{' '}
            <span className="font-medium text-secondary-foreground">
              {address}
            </span>
          </p>
        </div>
      </div>
      <div className="text-right">
        <div className="font-medium">Hire Date</div>
        <div className="text-sm">{getFormattedIsoDate(hireDate)}</div>
        <div className="text-xs text-muted-foreground">
          {getElapsedTime(hireDate)}
        </div>
        <Button
          onClick={() => onToggleActive(!active)}
          className="mt-2"
          variant={active ? 'destructive' : 'success'}
          size="sm"
        >
          {getStatusButtonLabel(active)}
        </Button>
      </div>
    </div>
  );
};
