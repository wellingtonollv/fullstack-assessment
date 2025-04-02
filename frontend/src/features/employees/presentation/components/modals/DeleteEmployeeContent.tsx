import { Button } from '@/shared/components/ui/button';
import { useModal } from '@/shared/providers/modal/useModal';
import { useDeleteEmployee } from '@employees/application/mutations/useDeleteEmployee';
import { Employee } from '@employees/domain/models';
import { toast } from 'sonner';

interface DeleteEmployeeContentProps {
  employeeId: Employee['id'];
  name: Employee['firstName'] | Employee['lastName'];
}

export const DeleteEmployeeContent = ({
  employeeId,
  name,
}: DeleteEmployeeContentProps) => {
  const { close } = useModal();
  const { mutate, status } = useDeleteEmployee();
  const isLoading = status === 'pending';

  return (
    <div className="space-y-4">
      <p>Are you sure you want to Delete the employee {name}?</p>
      <div className="flex w-full flex-wrap justify-end gap-4">
        <Button
          className="w-full md:w-fit"
          variant="destructive"
          onClick={() =>
            mutate(employeeId, {
              onSuccess: () => {
                close();
                toast.success('Employee deleted successfully!', {
                  description: `The employee ${name} has been removed.`,
                });
              },
              onError: () => {
                toast.error('Error deleting employee', {
                  description: `Could not delete the employee ${name}.`,
                });
                close();
              },
            })
          }
          disabled={isLoading}
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
        <Button className="w-full md:w-fit" variant="secondary" onClick={close}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
