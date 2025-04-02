import { useModal } from '@/shared/providers/modal/useModal';
import { CreateEmployeeForm } from '../forms/CreateEmployeeForm';
import { useCreateEmployee } from '@employees/application/mutations/useCreateEmployee';
import { toast } from 'sonner';

export const CreateEmployeeContent = () => {
  const { close } = useModal();
  const mutation = useCreateEmployee();

  return (
    <CreateEmployeeForm
      onSubmit={(data) => {
        mutation.mutate(data, {
          onSuccess: () => {
            close();
            toast.success('Employee created successfully!');
          },
          onError: (error) => {
            toast.error(`Error creating employee: ${error.message}`);
          },
        });
      }}
    />
  );
};
