import { useQuery } from '@tanstack/react-query';
import { getDepartments } from '@employees/infrastructure/api';
import { Department } from '@employees/domain/models';

export const useGetDepartments = () => {
  return useQuery<Department[]>({
    queryKey: ['departments'],
    queryFn: getDepartments,
    staleTime: 1000 * 60 * 10,
  });
};
