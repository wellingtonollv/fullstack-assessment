import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({
    example: 'HR',
    description: 'New department name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
