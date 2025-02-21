import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';

describe('DepartmentController', () => {
  let controller: DepartmentController;
  let service: DepartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentController],
      providers: [
        {
          provide: DepartmentService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DepartmentController>(DepartmentController);
    service = module.get<DepartmentService>(DepartmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a department', async () => {
    const mockDepartment = { id: 3, name: 'Finance' };

    const spyCreate = jest
      .spyOn(service, 'create')
      .mockResolvedValue(mockDepartment);

    const result = await controller.create({ name: 'Finance' });

    expect(result).toEqual(mockDepartment);
    expect(spyCreate).toHaveBeenCalledWith({ name: 'Finance' });
  });

  it('should return a list of departments', async () => {
    const mockDepartments = [
      { id: 1, name: 'Engineering', employees: [] },
      { id: 2, name: 'HR', employees: [] },
    ];

    const spyFindAll = jest
      .spyOn(service, 'findAll')
      .mockResolvedValue(mockDepartments);

    const result = await controller.findAll();

    expect(result).toEqual(mockDepartments);
    expect(spyFindAll).toHaveBeenCalledTimes(1);
  });
});
