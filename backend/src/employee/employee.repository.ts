import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeRepository {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.prisma.employee.create({ data: createEmployeeDto });
  }

  findAll() {
    return this.prisma.employee.findMany({
      include: { department: true },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        department: true,
        EmployeeDepartmentHistory: {
          include: { department: true },
          orderBy: { changedAt: 'desc' },
        },
      },
    });

    const { EmployeeDepartmentHistory = [], ...employeeData } = employee || {};

    return {
      ...employeeData,
      history: EmployeeDepartmentHistory,
    };
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.prisma.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  remove(id: number) {
    return this.prisma.employee.delete({ where: { id } });
  }
}
