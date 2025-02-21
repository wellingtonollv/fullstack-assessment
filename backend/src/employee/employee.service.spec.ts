import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

const mockEmployee = {
  id: 1,
  firstName: 'Alice',
  hireDate: new Date('2025-02-13T02:41:53.053Z'),
  lastName: 'Doe',
  phone: '123-456-7890',
  address: '123 Main St',
  departmentId: 1,
  active: true,
};

const mockSecondEmployee = {
  id: 2,
  firstName: 'Bob',
  hireDate: new Date('2025-02-13T02:41:53.053Z'),
  lastName: 'Doe',
  phone: '123-456-7890',
  address: '123 Main St',
  departmentId: 2,
  active: true,
};

describe('EmployeeService', () => {
  let service: EmployeeService;
  let prisma: PrismaService;

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
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an employee successfully', async () => {
    const spyFindUnique = jest
      .spyOn(prisma.department, 'findUnique')
      .mockResolvedValue({ id: 1, name: 'Engineering' });
    const spyCreate = jest
      .spyOn(prisma.employee, 'create')
      .mockResolvedValue(mockEmployee);

    const result = await service.create(mockEmployee);

    expect(result).toEqual(mockEmployee);
    expect(spyFindUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(spyCreate).toHaveBeenCalledWith({ data: mockEmployee });
  });

  it('should throw BadRequestException if department does not exist', async () => {
    const spyFindUnique = jest
      .spyOn(prisma.department, 'findUnique')
      .mockResolvedValue(null);
    const spyCreate = jest.spyOn(prisma.employee, 'create');

    await expect(
      service.create({ ...mockEmployee, departmentId: 99 }),
    ).rejects.toThrow(
      new BadRequestException('Department with ID 99 does not exist.'),
    );

    expect(spyFindUnique).toHaveBeenCalledWith({
      where: { id: 99 },
    });
    expect(spyCreate).not.toHaveBeenCalled();
  });

  it('should return a list of employees', async () => {
    const mockEmployees = [mockEmployee, mockSecondEmployee];

    const spyFindMany = jest
      .spyOn(prisma.employee, 'findMany')
      .mockResolvedValue(mockEmployees);

    const result = await service.findAll();

    expect(result).toEqual(mockEmployees);
    expect(spyFindMany).toHaveBeenCalledWith({
      include: { department: true },
    });
  });
  it('should return an employee by ID', async () => {
    const spyFindUnique = jest
      .spyOn(prisma.employee, 'findUnique')
      .mockResolvedValue(mockEmployee);

    const result = await service.findOne(1);

    expect(result).toEqual(mockEmployee);
    expect(spyFindUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { department: true },
    });
  });
  it('should update an employee successfully', async () => {
    const mockUpdateData = {
      phone: '9876543210',
      address: '456 New St, Springfield, IL 62702',
      active: false,
      departmentId: 2,
    };

    const mockUpdatedEmployee = {
      ...mockEmployee,
      ...mockUpdateData,
    };

    const spyUpdate = jest
      .spyOn(prisma.employee, 'update')
      .mockResolvedValue(mockUpdatedEmployee);

    const result = await service.update(1, mockUpdateData);

    expect(result).toEqual(mockUpdatedEmployee);
    expect(spyUpdate).toHaveBeenCalledWith({
      where: { id: 1 },
      data: mockUpdateData,
    });
  });
  it('should delete an employee', async () => {
    const spyDelete = jest
      .spyOn(prisma.employee, 'delete')
      .mockResolvedValue(mockEmployee);

    const result = await service.remove(1);

    expect(result).toEqual(mockEmployee);
    expect(spyDelete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
