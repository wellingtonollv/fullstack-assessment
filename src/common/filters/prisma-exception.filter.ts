import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let errorResponse: HttpException;

    switch (exception.code) {
      case 'P2002': {
        const target = exception.meta?.target as string;

        errorResponse = new ConflictException({
          statusCode: 409,
          message: `Duplicate entry: ${target}`,
        });
        break;
      }

      case 'P2003':
        console.log(exception);
        errorResponse = new BadRequestException({
          statusCode: 400,
          message: 'Foreign key violation',
        });
        break;

      case 'P2025':
        errorResponse = new NotFoundException('Record not found');
        break;

      case 'P2014':
        errorResponse = new BadRequestException(
          'Foreign key constraint failed',
        );
        break;

      default:
        console.log(exception);
        errorResponse = new InternalServerErrorException('Database error');
        break;
    }

    response.status(errorResponse.getStatus()).json({
      statusCode: errorResponse.getStatus(),
      message: errorResponse.message,
    });
  }
}
