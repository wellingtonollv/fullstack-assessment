export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  hireDate: string;
  phone: string;
  departmentId: string;
  address: string;
  department: {
    id: string;
    name: string;
  };
  active: boolean;
};
