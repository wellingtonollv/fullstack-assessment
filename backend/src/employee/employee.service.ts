import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeeService {
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

  findOne(id: number) {
    return this.prisma.employee.findUnique({
      where: { id },
      include: { department: true },
    });
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.prisma.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  remove(id: number) {
    return this.prisma.employee.delete({ where: { id } });
  }
}
