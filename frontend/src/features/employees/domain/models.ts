export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  hireDate: string;
  phone: string;
  departmentId: number;
  address: string;
  department: {
    id: string;
    name: string;
  };
  active: boolean;
};

export type NewEmployee = Omit<Employee, 'id' | 'active' | 'department'> & {
  active?: boolean;
};

export type Department = {
  id: string;
  name: string;
};
