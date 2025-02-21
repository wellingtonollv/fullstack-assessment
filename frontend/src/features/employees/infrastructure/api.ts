import api from '@/config/api';
import { Employee } from '../domain/models';

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await api.get('/employee');
  return response.data;
};

export const createEmployee = async (employee: Partial<Employee>) => {
  return await api.post('/employee', employee);
};

export const updateEmployee = async (
  id: string,
  updates: Partial<Employee>,
) => {
  return await api.put(`/employee/${id}`, updates);
};

export const deleteEmployee = async (id: string) => {
  return await api.delete(`/employee/${id}`);
};
