import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateEmployeeDto {
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
    example: 'HR',
    description: 'Department name of the employee',
    required: false,
  })
  @IsOptional()
  @IsString()
  department?: string;
}
