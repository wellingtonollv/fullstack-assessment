import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { SwaggerService } from './common/swagger/swagger.service';
import { GlobalValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new GlobalValidationPipe());

  app.useGlobalFilters(new PrismaExceptionFilter());

  SwaggerService.setup(app);

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
