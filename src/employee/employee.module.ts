import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmployeeController } from './employee.controller';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [PrismaModule],
})
export class EmployeeModule {}
