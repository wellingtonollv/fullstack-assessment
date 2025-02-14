import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentService } from './department.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DepartmentService', () => {
  let service: DepartmentService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentService,
        {
          provide: PrismaService,
          useValue: {
            department: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<DepartmentService>(DepartmentService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a list of departments', async () => {
    const mockDepartments = [
      { id: 1, name: 'Engineering' },
      { id: 2, name: 'HR' },
    ];

    const spyFindMany = jest
      .spyOn(prisma.department, 'findMany')
      .mockResolvedValue(mockDepartments);

    const result = await service.findAll();

    expect(result).toEqual(mockDepartments);

    expect(spyFindMany).toHaveBeenCalledTimes(1);
  });
});
