export const mockEmployee = {
  id: 1,
  firstName: 'Alice',
  hireDate: new Date('2025-02-13T02:41:53.053Z'),
  lastName: 'Doe',
  phone: '123-456-7890',
  address: '123 Main St',
  departmentId: 1,
  active: true,
  department: { name: 'Engineering', id: 1 },
  history: [
    {
      id: 1,
      departmentId: 1,
      changedAt: new Date('2025-02-13T02:41:53.053Z'),
      employeeId: 1,
      department: { id: 1, name: 'Engineering' },
    },
  ],
};

export const mockSecondEmployee = {
  id: 2,
  firstName: 'Bob',
  hireDate: new Date('2025-02-13T02:41:53.053Z'),
  lastName: 'Doe',
  phone: '123-456-7890',
  address: '123 Main St',
  departmentId: 2,
  active: true,
  department: { name: 'HR', id: 2 },
  history: [],
};
