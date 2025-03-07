import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeRepository } from './employee.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeeRepository.create(createEmployeeDto);
  }

  findAll() {
    return this.employeeRepository.findAll();
  }

  async findOne(id: number) {
    return this.employeeRepository.findOne(id);
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.findOne(id);

    const departmentChanged =
      updateEmployeeDto?.departmentId &&
      updateEmployeeDto.departmentId !== employee.departmentId;

    if (departmentChanged) {
      this.eventEmitter.emit('employee.department.changed', {
        employeeId: id,
        previousDepartmentId: employee.departmentId,
      });
    }

    return this.employeeRepository.update(id, updateEmployeeDto);
  }

  remove(id: number) {
    return this.employeeRepository.remove(id);
  }
}
