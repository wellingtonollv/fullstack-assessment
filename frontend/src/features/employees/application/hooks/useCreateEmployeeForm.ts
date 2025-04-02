import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createEmployeeSchema,
  CreateEmployeeSchema,
} from '../../domain/schema';

export const useCreateEmployeeForm = () => {
  return useForm<CreateEmployeeSchema>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      hireDate: new Date().toISOString(),
      phone: '',
      department: '',
      address: '',
      active: true,
    },
  });
};
