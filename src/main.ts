import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //  Enable validation and sanitization globally
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // removes fields not in DTO
    forbidNonWhitelisted: true, // throws error if unknown field sent
    transform: true, // auto-converts types
  }));

  await app.listen(3000);
}
bootstrap();
