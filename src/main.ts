import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe,  Logger as logger  } from '@nestjs/common';
import { SwaggerConfig } from './common/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerConfig(app);
  await app.listen(3000);
  logger.log(`App running on port 3000`);
}
bootstrap();
