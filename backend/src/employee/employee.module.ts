import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmployeeController } from './employee.controller';
import { EmployeeHistoryModule } from 'src/employee-history/employee-history.module';
import { EmployeeRepository } from './employee.repository';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository],
  imports: [PrismaModule, EmployeeHistoryModule],
})
export class EmployeeModule {}
