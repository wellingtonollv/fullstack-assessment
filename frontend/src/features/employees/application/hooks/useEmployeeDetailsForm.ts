import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeSchema, EmployeeSchema } from '@employees/domain/schema';
import { useEffect } from 'react';

export const useEmployeeDetailsForm = (employee: EmployeeSchema) => {
  const form = useForm<EmployeeSchema>({
    resolver: zodResolver(employeeSchema),
    defaultValues: employee,
    mode: 'onChange',
  });

  const { dirtyFields, isDirty } = form.formState;

  useEffect(() => {
    form.reset(employee);
  }, [employee, form]);

  return { form, isDirty, dirtyFields };
};
