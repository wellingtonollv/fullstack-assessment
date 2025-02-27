import { z } from 'zod';
import { NewEmployee } from './models';

export const createEmployeeSchema: z.ZodSchema<NewEmployee> = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  hireDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), 'Invalid date'),
  phone: z.string().regex(/^\+?\d{10,15}$/, 'Invalid phone number'),
  departmentId: z.number().min(1, 'One department must be selected'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  active: z.boolean().default(true),
});

export const employeeSchema = z.object({
  id: z.number(), // ID deve ser um UUID válido
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  hireDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format (ISO 8601 required)',
  }),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number too long'),
  departmentId: z.number().int().positive(),
  address: z.string().min(5, 'Address must have at least 5 characters'),
  active: z.boolean(),
});

export type EmployeeSchema = z.infer<typeof employeeSchema>;
export type CreateEmployeeSchema = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeSchema = z.infer<typeof updateEmployeeSchema>;

export const updateEmployeeSchema = z
  .object({
    phone: z.string(),
    departmentId: z.number(),
    address: z.string(),
    active: z.boolean(),
  })
  .partial();
