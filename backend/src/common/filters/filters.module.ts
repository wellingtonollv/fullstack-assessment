import { Module } from '@nestjs/common';
import { PrismaExceptionFilter } from './prisma-exception.filter';

@Module({
  providers: [PrismaExceptionFilter],
  exports: [PrismaExceptionFilter],
})
export class FiltersModule {}
