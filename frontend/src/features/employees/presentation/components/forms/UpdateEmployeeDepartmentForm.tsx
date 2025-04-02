import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/shared/components/ui/form';
import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { useEmployeeDetailsForm } from '@employees/application/hooks/useEmployeeDetailsForm';
import { useGetDepartments } from '@employees/application/queries/useGetDepartments';
import { Employee } from '@employees/domain/models';
import { UpdateEmployeeSchema } from '@employees/domain/schema';
import { Loader } from '@/shared/components/Loader';

interface UpdateEmployeeDepartmentFormProps {
  employee: Employee;
  onSave: (data: Partial<Pick<UpdateEmployeeSchema, 'department'>>) => void;
}

export const UpdateEmployeeDepartmentForm = ({
  employee,
  onSave,
}: UpdateEmployeeDepartmentFormProps) => {
  const { form, dirtyFields, isDirty } = useEmployeeDetailsForm(employee);
  const { data: departments, isLoading } = useGetDepartments();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((formData) => {
          if (dirtyFields.department) {
            onSave({ department: formData.department });
          }
        })}
        className="flex items-end gap-2"
      >
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Update Department</FormLabel>
              <Select
                value={field.value ? String(field.value) : ''}
                onValueChange={(value) => field.onChange(value)}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {departments?.map((dept) => (
                    <SelectItem key={dept.id} value={dept.name}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!isDirty || form.formState.isSubmitting}
          variant="success"
          size="sm"
        >
          {form.formState.isSubmitting ? <Loader /> : 'Update'}
        </Button>
      </form>
    </Form>
  );
};
