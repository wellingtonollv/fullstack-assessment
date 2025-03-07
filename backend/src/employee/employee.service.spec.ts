import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { EmployeeRepository } from './employee.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { mockEmployee, mockSecondEmployee } from './mocks/employee.mock';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let employeeRepository: EmployeeRepository;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: EmployeeRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    employeeRepository = module.get<EmployeeRepository>(EmployeeRepository);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an employee', async () => {
    jest.spyOn(employeeRepository, 'create').mockResolvedValue(mockEmployee);

    const result = await service.create(mockEmployee);

    expect(result).toEqual(mockEmployee);

    const spyCreate = jest
      .spyOn(employeeRepository, 'create')
      .mockResolvedValue(mockEmployee);

    expect(spyCreate).toHaveBeenCalledWith(mockEmployee);
  });

  it('should return all employees', async () => {
    const mockEmployees = [mockEmployee, mockSecondEmployee];
    jest.spyOn(employeeRepository, 'findAll').mockResolvedValue(mockEmployees);

    const result = await service.findAll();

    expect(result).toEqual(mockEmployees);

    const spyFindAll = jest
      .spyOn(employeeRepository, 'findAll')
      .mockResolvedValue(mockEmployees);

    expect(spyFindAll).toHaveBeenCalledTimes(1);
  });

  it('should return an employee with history', async () => {
    jest.spyOn(employeeRepository, 'findOne').mockResolvedValue(mockEmployee);

    const result = await service.findOne(1);

    expect(result).toEqual(mockEmployee);
  });

  it('should emit department change event when department is updated', async () => {
    jest.spyOn(employeeRepository, 'findOne').mockResolvedValue(mockEmployee);
    jest.spyOn(employeeRepository, 'update').mockResolvedValue({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      hireDate: new Date(),
      phone: '1234567890',
      address: '123 Main St',
      active: true,
      departmentId: 2,
    });

    const spyEmit = jest.spyOn(eventEmitter, 'emit');

    await service.update(1, { departmentId: 2 });

    expect(spyEmit).toHaveBeenCalledWith('employee.department.changed', {
      employeeId: 1,
      previousDepartmentId: 1,
    });
  });

  it('should not emit event if department does not change', async () => {
    jest.spyOn(employeeRepository, 'findOne').mockResolvedValue(mockEmployee);
    jest.spyOn(employeeRepository, 'update').mockResolvedValue({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      hireDate: new Date(),
      phone: '1234567890',
      address: '123 Main St',
      active: true,
      departmentId: 1,
    });

    const spyEmit = jest.spyOn(eventEmitter, 'emit');

    await service.update(1, { departmentId: 1 });

    expect(spyEmit).not.toHaveBeenCalled();
  });

  it('should delete an employee', async () => {
    const spyRemove = jest
      .spyOn(employeeRepository, 'remove')
      .mockResolvedValue(mockEmployee);

    const result = await service.remove(1);

    expect(result).toEqual(mockEmployee);
    expect(spyRemove).toHaveBeenCalledWith(1);
  });
});
