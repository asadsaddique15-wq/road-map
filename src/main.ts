import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ValidationPipe options:
  // - transform: converts payloads to DTO class instances (useful)
  // - whitelist: strips properties that do not have decorators in DTO
  // - forbidNonWhitelisted: optional — throws if extra props exist
  app.useGlobalPipes(new ValidationPipe({transform: true, whitelist: true}));
  // Register global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
