import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { mockEmployee, mockSecondEmployee } from './mocks/employee.mock';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an employee', async () => {
    const spyCreate = jest
      .spyOn(service, 'create')
      .mockResolvedValue(mockEmployee);

    const result = await controller.create(mockEmployee);

    expect(result).toEqual(mockEmployee);
    expect(spyCreate).toHaveBeenCalledWith(mockEmployee);
  });

  it('should return a list of employees', async () => {
    const mockEmployees = [mockEmployee, mockSecondEmployee];

    const spyFindAll = jest
      .spyOn(service, 'findAll')
      .mockResolvedValue(mockEmployees);

    const result = await controller.findAll();

    expect(result).toEqual(mockEmployees);
    expect(spyFindAll).toHaveBeenCalledTimes(1);
  });

  it('should return an employee by ID', async () => {
    const spyFindOne = jest
      .spyOn(service, 'findOne')
      .mockResolvedValue(mockEmployee);

    const result = await controller.findOne('1');

    expect(result).toEqual(mockEmployee);
    expect(spyFindOne).toHaveBeenCalledWith(1);
  });

  it('should update an employee', async () => {
    const updatedEmployee = {
      phone: '9876543210',
      address: '456 New St, Springfield, IL 62702',
      active: false,
      departmentId: 2,
    };

    const mockUpdatedEmployee = {
      ...mockEmployee,
      ...updatedEmployee,
    };

    const spyUpdate = jest
      .spyOn(service, 'update')
      .mockResolvedValue(mockUpdatedEmployee);

    const result = await controller.update('1', updatedEmployee);

    expect(result).toEqual(mockUpdatedEmployee);
    expect(spyUpdate).toHaveBeenCalledWith(1, updatedEmployee);
  });

  it('should delete an employee', async () => {
    const spyDelete = jest
      .spyOn(service, 'remove')
      .mockResolvedValue(mockEmployee);

    const result = await controller.remove('1');

    expect(result).toEqual(mockEmployee);
    expect(spyDelete).toHaveBeenCalledWith(1);
  });
});
