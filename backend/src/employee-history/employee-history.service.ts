import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeeHistoryService {
  constructor(private prisma: PrismaService) {}

  @OnEvent('employee.department.changed')
  async handleDepartmentChange(payload: {
    employeeId: number;
    previousDepartmentId: number;
  }) {
    await this.prisma.employeeDepartmentHistory.create({
      data: {
        employeeId: payload.employeeId,
        departmentId: payload.previousDepartmentId,
      },
    });
  }
}
