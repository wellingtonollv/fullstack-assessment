import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { SwaggerService } from './common/swagger/swagger.service';
import { GlobalValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new GlobalValidationPipe());

  app.useGlobalFilters(new PrismaExceptionFilter());

  app.enableCors();

  SwaggerService.setup(app);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 API running on http://localhost:${port}`);
}
void bootstrap();
