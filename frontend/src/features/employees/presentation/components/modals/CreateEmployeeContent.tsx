import { useModal } from '@/shared/providers/modal/useModal';
import { CreateEmployeeForm } from '../forms/CreateEmployeeForm';
import { useCreateEmployee } from '@employees/application/mutations/useCreateEmployee';

export const CreateEmployeeContent = () => {
  const { close } = useModal();
  const mutation = useCreateEmployee();

  return (
    <CreateEmployeeForm
      onSubmit={(data) => {
        mutation.mutate(data, { onSuccess: close });
      }}
    />
  );
};
