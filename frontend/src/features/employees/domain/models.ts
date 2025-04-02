export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  hireDate: string;
  phone: string;
  address: string;
  department: string;
  active: boolean;
  history: {
    changedAt: string;
    department: string;
  }[];
};

export type NewEmployee = Omit<Employee, 'id' | 'active' | 'history'> & {
  active?: boolean;
};

export type Department = {
  id: string;
  name: string;
};
