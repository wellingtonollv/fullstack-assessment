import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerService {
  static setup(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Simple Employee Maintenance API')
      .setDescription('API to manage employees and departments')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }
}
