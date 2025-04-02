import { z } from 'zod';
import { NewEmployee } from './models';

export const createEmployeeSchema: z.ZodSchema<NewEmployee> = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  hireDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), 'Invalid date'),
  phone: z.string().regex(/^\+?\d{8,15}$/, 'Invalid phone number'),
  department: z.string().min(1, 'Department is required'), // Department is now required
  address: z.string().min(5, 'Address must be at least 5 characters'),
  active: z.boolean().default(true),
});

export const employeeSchema = z.object({
  id: z.number(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  hireDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format (ISO 8601 required)',
  }),
  phone: z
    .string()
    .min(8, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number too long'),
  address: z.string().min(5, 'Address must have at least 5 characters'),
  active: z.boolean(),
  department: z.string(),
  history: z
    .array(
      z.object({
        department: z.string(),
        changedAt: z.string(),
      }),
    )
    .optional(),
});

export type EmployeeSchema = z.infer<typeof employeeSchema>;
export type CreateEmployeeSchema = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeSchema = z.infer<typeof updateEmployeeSchema>;

export const updateEmployeeSchema = z
  .object({
    phone: z.string(),
    department: z.string(),
    address: z.string(),
    active: z.boolean(),
  })
  .partial();

export interface Employee {
  id: number;
  active: boolean;
  history: {
    department: string;
    changedAt: string;
  }[];
  firstName: string;
  lastName: string;
  hireDate: string;
  phone: string;
  address: string;
  department: string;
}
