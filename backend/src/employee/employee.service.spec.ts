import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  mockCreateEmployeePrisma,
  mockCreateEmployeeService,
  mockEmployee,
  mockEmployeeHistory,
  mockEmployeeHistoryPrisma,
  mockEmployeePrisma,
  mockSecondEmployee,
  mockSecondEmployeePrisma,
} from './mocks/employee.mock';
import { PrismaService } from '../prisma/prisma.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let prismaService: PrismaService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: PrismaService,
          useValue: {
            employee: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            department: {
              findUnique: jest.fn(),
            },
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
    prismaService = module.get<PrismaService>(PrismaService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an employee', async () => {
    jest.spyOn(prismaService.department, 'findUnique').mockResolvedValueOnce({
      id: 1,
      name: 'Engineering',
    });

    const spyCreate = jest
      .spyOn(prismaService.employee, 'create')
      .mockResolvedValue(mockEmployee);

    const serviceResult = await service.create(mockCreateEmployeeService);

    expect(serviceResult).toEqual(mockEmployee);

    expect(spyCreate).toHaveBeenCalledWith({
      data: mockCreateEmployeePrisma,
    });
  });

  it('should return all employees', async () => {
    jest
      .spyOn(prismaService.employee, 'findMany')
      .mockResolvedValue([mockEmployeePrisma, mockSecondEmployeePrisma]);

    const result = await service.findAll();

    expect(result).toEqual([mockEmployee, mockSecondEmployee]);
  });

  it('should return an employee with history', async () => {
    jest.spyOn(prismaService.employee, 'findUnique').mockResolvedValue({
      ...mockEmployeePrisma,
      ...mockEmployeeHistoryPrisma,
    });

    const result = await service.findOne(1);

    expect(result).toEqual({
      ...mockEmployee,
      ...mockEmployeeHistory,
    });
  });

  it('should emit department change event when department is updated', async () => {
    jest
      .spyOn(prismaService.employee, 'findUnique')
      .mockResolvedValue(mockEmployeePrisma);
    jest.spyOn(prismaService.employee, 'update').mockResolvedValue({
      ...mockEmployee,
      departmentId: 2,
    });

    const spyEmit = jest.spyOn(eventEmitter, 'emit');

    await service.update(1, { department: 'HR' });

    expect(spyEmit).toHaveBeenCalledWith('employee.department.changed', {
      employeeId: 1,
      previousDepartmentId: 1,
    });
  });

  it('should not emit event if department does not change', async () => {
    jest
      .spyOn(prismaService.employee, 'findUnique')
      .mockResolvedValue(mockEmployeePrisma);
    jest
      .spyOn(prismaService.employee, 'update')
      .mockResolvedValue(mockEmployeePrisma);

    const spyEmit = jest.spyOn(eventEmitter, 'emit');

    await service.update(1, { department: 'Engineering' });
    expect(spyEmit).not.toHaveBeenCalled();
  });

  it('should delete an employee', async () => {
    jest
      .spyOn(prismaService.employee, 'delete')
      .mockResolvedValue(mockEmployeePrisma);

    const result = await service.remove(1);

    expect(result).toEqual(mockEmployee);
  });
});
