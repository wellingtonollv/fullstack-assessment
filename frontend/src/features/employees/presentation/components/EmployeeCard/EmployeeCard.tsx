import { Employee } from '@employees/domain/models';
import { EmployeeAvatar } from './components/EmployeeAvatar';
import { EmployeeInfo } from './components/EmployeeInfo';
import { EmployeeAction } from './components/EmployeeAction';
import { Badge } from '@/shared/components/ui/badge';
import { getEmployeeStatus } from '@employees/domain/use-cases/getEmployeeStatus';

type EmployeeCardProps = {
  employee: Employee;
};

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const { status, variant } = getEmployeeStatus(employee.active);
  const fullName = `${employee.firstName} ${employee.lastName}`;
  
  return (
    <div
      role="article"
      className="h-card flex-col overflow-hidden rounded-xl border border-gray-300 shadow-sm transition-all duration-300 hover:shadow-md dark:border-neutral-800"
    >
      <EmployeeAvatar
        className="h-[250px]"
        name={`${employee.firstName} ${employee.lastName}`}
      />
      <section className="space-y-4 overflow-hidden p-4">
        <Badge className="shrink-0" variant={variant}>
          {status}
        </Badge>
        <EmployeeInfo
          firstName={employee.firstName}
          lastName={employee.lastName}
          department={employee.department}
          hireDate={employee.hireDate}
        />
        <EmployeeAction employeeId={employee.id} name={fullName} />
      </section>
    </div>
  );
};

export default EmployeeCard;
