import { Module } from '@nestjs/common';
import { EmployeeHistoryService } from './employee-history.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [EmployeeHistoryService, PrismaService],
  exports: [EmployeeHistoryService],
})
export class EmployeeHistoryModule {}
