// Common employee data for basic employee structure
const baseEmployeeData = {
  firstName: 'Alice',
  lastName: 'Doe',
  phone: '123-456-7890',
  address: '123 Main St',
  active: true,
  hireDate: new Date('2025-02-13T02:41:53.053Z'),
};

// Mock of Employee returned by Prisma
export const mockEmployeePrisma = {
  id: 1,
  ...baseEmployeeData,
  departmentId: 1,
  department: {
    id: 1,
    name: 'Engineering',
  },
  EmployeeDepartmentHistory: [],
};

export const mockEmployeeHistoryPrisma = {
  EmployeeDepartmentHistory: [
    {
      departmentId: 2,
      changedAt: new Date('2025-02-13T02:41:53.053Z'),
      department: {
        id: 2,
        name: 'HR',
      },
    },
  ],
};

// Mock of Employee for the service (with formatted data)
export const mockCreateEmployeeService = {
  ...baseEmployeeData,
  department: 'Engineering',
};

// Mock of Employee for insertion in Prisma (without the "department" field)
export const mockCreateEmployeePrisma = {
  ...baseEmployeeData,
  departmentId: 1,
};

// Final mock of Employee, merging service and Prisma data
export const mockEmployee = {
  id: 1,
  ...mockCreateEmployeeService,
  ...mockCreateEmployeePrisma,
  history: [],
};

// Mock of second Employee with department history
export const mockEmployeeHistory = {
  history: [
    {
      departmentId: 2,
      changedAt: new Date('2025-02-13T02:41:53.053Z'),
      department: 'HR',
    },
  ],
};

// Data for the second employee (Bob)
const secondEmployeeData = {
  firstName: 'Bob',
  lastName: 'Doe',
  phone: '123-456-7890',
  address: '123 Main St',
  active: true,
  hireDate: new Date('2025-02-13T02:41:53.053Z'),
};

// Mock of second Employee returned by Prisma
export const mockSecondEmployeePrisma = {
  id: 2,
  ...secondEmployeeData,
  departmentId: 2,
  department: {
    id: 2,
    name: 'HR', // "HR" Department
  },
  EmployeeDepartmentHistory: [],
};

// Mock of second Employee for the service (with formatted data)
export const mockCreateSecondEmployeeService = {
  ...secondEmployeeData,
  department: 'HR', // Department as string
};

// Mock of second Employee for insertion in Prisma (without the "department" field)
export const mockCreateSecondEmployeePrisma = {
  ...secondEmployeeData,
  departmentId: 2,
};

// Final mock of second Employee, merging service and Prisma data
export const mockSecondEmployee = {
  id: 2,
  ...mockCreateSecondEmployeeService,
  ...mockCreateSecondEmployeePrisma,
  history: [],
};
