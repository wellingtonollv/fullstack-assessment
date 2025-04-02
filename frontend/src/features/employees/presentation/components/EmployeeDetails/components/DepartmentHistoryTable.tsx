import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { Employee } from '@employees/domain/models';
import { getFormattedDate } from '@employees/domain/use-cases/getFormattedDate';

interface DepartmentHistoryTableProps {
  employee: Employee;
}

export const DepartmentHistoryTable = ({
  employee,
}: DepartmentHistoryTableProps) => {
  const { history } = employee;

  return (
    <div className="mt-4">
      <h3 className="mb-2 font-medium">Department History</h3>
      <div className="max-h-[180px] overflow-y-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Department</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="py-2">
                  {getFormattedDate(item.changedAt)}
                </TableCell>
                <TableCell className="py-2">{item.department}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
