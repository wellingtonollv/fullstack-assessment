import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeController } from './employee/employee.controller';
import { DepartmentController } from './department/department.controller';
import { EmployeeModule } from './employee/employee.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [EmployeeModule, DepartmentModule],
  controllers: [AppController, EmployeeController, DepartmentController],
  providers: [AppService],
})
export class AppModule {}
