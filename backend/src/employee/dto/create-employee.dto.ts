import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'John', description: 'First name of the employee' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the employee' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: '2025-02-13T02:41:53.053Z',
    description: 'Hire date of the employee in ISO 8601 format',
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  hireDate: Date;

  @ApiProperty({
    example: '1234567890',
    description: 'Phone number of the employee',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: '123 Main St, Springfield, IL 62701',
    description: 'Address of the employee',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: true,
    description: 'Active status of the employee',
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiProperty({
    example: 'development',
    description: 'Department name of the employee',
    required: false,
  })
  @IsString()
  department: string;
}
