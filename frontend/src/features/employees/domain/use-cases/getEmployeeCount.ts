import { Employee } from '../models';

export const getEmployeeCount = (employees?: Employee[]): number => {
  return employees?.length ?? 0;
};
