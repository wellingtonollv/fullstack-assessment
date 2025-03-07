import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeHistoryService } from './employee-history.service';
import { PrismaService } from '../prisma/prisma.service';

describe('EmployeeHistoryService', () => {
  let service: EmployeeHistoryService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeHistoryService,
        {
          provide: PrismaService,
          useValue: {
            employeeDepartmentHistory: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<EmployeeHistoryService>(EmployeeHistoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should log department change when event is received', async () => {
    const spyCreate = jest
      .spyOn(prisma.employeeDepartmentHistory, 'create')
      .mockResolvedValue({
        id: 1,
        employeeId: 1,
        departmentId: 2,
        changedAt: new Date(),
      });

    await service.handleDepartmentChange({
      employeeId: 1,
      previousDepartmentId: 2,
    });

    expect(spyCreate).toHaveBeenCalledWith({
      data: {
        employeeId: 1,
        departmentId: 2,
      },
    });
  });
});
