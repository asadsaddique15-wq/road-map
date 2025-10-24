import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Roadmap API') 
    .setDescription('API documentation for Auth, Users, and Tasks modules')
    .setVersion('1.0') 
    .addBearerAuth() //enabling JWT bearer token
    .build();

  //creating swagger document and setup the Swagger UI route
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Visit http://localhost:3000/api

  const port = process.env.PORT || 5000;
    await app.listen(port);
  console.log(` Server running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api`);
}

bootstrap();
