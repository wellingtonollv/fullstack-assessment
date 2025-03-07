import { ApiProperty } from '@nestjs/swagger';

export class EmployeeWithHistoryDto {
  @ApiProperty({
    example: 1,
    description: 'Previous department ID',
    nullable: true,
  })
  departmentId: number | null;

  @ApiProperty({
    example: 'IT',
    description: 'Previous department name',
    nullable: true,
  })
  departmentName: string | null;

  @ApiProperty({
    example: '2024-02-12T10:00:00.000Z',
    description: 'Date of department change',
  })
  changedAt: Date;
}
