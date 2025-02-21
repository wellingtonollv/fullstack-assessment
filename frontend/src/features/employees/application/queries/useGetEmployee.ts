import { useQuery } from '@tanstack/react-query';
import { getEmployees } from '../../infrastructure/api';
import { Employee } from '../../domain/models';

export const useGetEmployees = () => {
  return useQuery<Employee[]>({
    queryKey: ['employees'],
    queryFn: getEmployees,
  });
};
