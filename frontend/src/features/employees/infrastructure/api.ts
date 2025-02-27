import api from '@/config/api';
import { Department, Employee } from '../domain/models';

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await api.get('/employee');
  return response.data;
};

export const getEmployee = async (id: number): Promise<Employee> => {
  const response = await api.get(`/employee/${id}`);
  return response.data;
};

export const createEmployee = async (employee: Partial<Employee>) => {
  return await api.post('/employee', employee);
};

export const updateEmployee = async (
  id: number,
  updates: Partial<Employee>,
) => {
  return await api.patch(`/employee/${id}`, updates);
};

export const deleteEmployee = async (id: number) => {
  return await api.delete(`/employee/${id}`);
};

export const getDepartments = async (): Promise<Department[]> => {
  const response = await api.get('/department');
  return response.data;
};
