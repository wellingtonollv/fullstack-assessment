import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEmployee } from '@employees/infrastructure/api';
import { UpdateEmployeeSchema } from '@employees/domain/schema';
import { Employee } from '@employees/domain/models';

interface UpdateEmployeeParams {
  id: Employee['id'];
  data: Partial<UpdateEmployeeSchema>;
}

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateEmployeeParams) => {
      return await updateEmployee(id, data);
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['employee', id] });
    },
    onError: (error) => {
      console.error('Failed to update employee:', error);
    },
  });
};
