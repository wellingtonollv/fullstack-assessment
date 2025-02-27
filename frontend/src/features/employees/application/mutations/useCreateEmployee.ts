import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEmployee } from '../../infrastructure/api';
import { NewEmployee } from '@employees/domain/models';

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: NewEmployee) => {
      return await createEmployee(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};
