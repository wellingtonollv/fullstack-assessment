import { getElapsedTime } from '@employees/domain/use-cases/getElapsedTime';
import { getFormattedIsoDate } from '@employees/domain/use-cases/getFormattedIsoDate';

type EmployeeInfoProps = {
  firstName: string;
  lastName: string;
  department?: string;
  hireDate: string;
};

export const EmployeeInfo = ({
  firstName,
  lastName,
  department,
  hireDate,
}: EmployeeInfoProps) => {
  return (
    <div>
      <div className="flex items-center gap-1 text-lg font-semibold">
        <h2 className="truncate" title={`${firstName} ${lastName}`}>
          {firstName} {lastName}
        </h2>
        {department && (
          <span className="text-base text-gray-500">({department})</span>
        )}
      </div>
      <p className="text-sm font-medium text-gray-500">Hire Date:</p>
      <p className="text-sm text-gray-500">
        {getFormattedIsoDate(hireDate)} ({getElapsedTime(hireDate)})
      </p>
    </div>
  );
};
