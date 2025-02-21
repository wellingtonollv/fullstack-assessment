type GetEmployeeStatusReturn = {
  status: 'Active' | 'Inactive';
  variant: 'secondary' | 'destructive';
};

export const getEmployeeStatus = (isActive: boolean) =>
  <GetEmployeeStatusReturn>{
    status: isActive ? 'Active' : 'Inactive',
    variant: isActive ? 'secondary' : 'destructive',
  };
