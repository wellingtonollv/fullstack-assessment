import { useQuery } from '@tanstack/react-query';
import { Employee } from '../../domain/models';
import { getEmployee } from '@employees/infrastructure/api';

export const useGetEmployee = (id: number) => {
  return useQuery<Employee>({
    queryKey: ['employee', id],
    queryFn: () => getEmployee(id),
  });
};
