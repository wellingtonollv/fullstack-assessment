import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../prisma/prisma.service';
import {
  Employee,
  Department,
  EmployeeDepartmentHistory,
} from '@prisma/client';

@Injectable()
export class EmployeeService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  private getEmployeeRelations() {
    return {
      department: { select: { id: true, name: true } },
      EmployeeDepartmentHistory: {
        include: { department: { select: { id: true, name: true } } },
        orderBy: { changedAt: 'desc' as const },
      },
    };
  }

  private async getDepartmentIdByName(name?: string): Promise<number | null> {
    if (!name) return null;
    const department = await this.prisma.department.findUnique({
      where: { name },
      select: { id: true },
    });
    return department?.id || null;
  }

  private formatEmployee(
    employee: Employee & {
      department?: Pick<Department, 'id' | 'name'> | null;
      EmployeeDepartmentHistory?: (EmployeeDepartmentHistory & {
        department?: Pick<Department, 'id' | 'name'> | null;
      })[];
    },
  ) {
    if (!employee) return null;

    const { EmployeeDepartmentHistory = [], department, ...rest } = employee;
    return {
      ...rest,
      department: department?.name || null,
      history: EmployeeDepartmentHistory.map(({ department, ...history }) => ({
        ...history,
        department: department?.name || null,
      })),
    };
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    const { department: departmentName, ...employeeData } = createEmployeeDto;
    const departmentId = await this.getDepartmentIdByName(departmentName);

    const employee = await this.prisma.employee.create({
      data: { ...employeeData, departmentId },
    });

    return { ...employee, department: departmentName, history: [] };
  }

  async findAll() {
    const employees = await this.prisma.employee.findMany({
      include: this.getEmployeeRelations(),
      orderBy: { id: 'asc' },
    });

    return employees.map((employee) => this.formatEmployee(employee));
  }

  async findOne(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: this.getEmployeeRelations(),
    });

    return employee ? this.formatEmployee(employee) : null;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const { department: newDepartmentName, ...newEmployeeData } =
      updateEmployeeDto;
    const employee = await this.findOne(id);

    if (!employee) return null;

    const departmentChanged =
      newDepartmentName && newDepartmentName !== employee.department;
    const departmentId = departmentChanged
      ? await this.getDepartmentIdByName(newDepartmentName)
      : employee.departmentId;

    if (departmentChanged) {
      this.eventEmitter.emit('employee.department.changed', {
        employeeId: id,
        previousDepartmentId: employee.departmentId,
      });
    }

    const updatedEmployee = await this.prisma.employee.update({
      where: { id },
      include: this.getEmployeeRelations(),
      data: { ...newEmployeeData, departmentId },
    });

    return this.formatEmployee(updatedEmployee);
  }

  async remove(id: number): Promise<Employee | null> {
    const deletedEmployee = await this.prisma.employee.delete({
      where: { id },
      include: this.getEmployeeRelations(),
    });

    return this.formatEmployee(deletedEmployee);
  }
}
