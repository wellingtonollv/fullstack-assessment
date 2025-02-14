import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}
  create(createDepartmentDto: CreateDepartmentDto) {
    return this.prisma.department.create({ data: createDepartmentDto });
  }

  findAll() {
    return this.prisma.department.findMany({
      include: {
        employees: true,
      },
    });
  }
}
