import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  //NestJS application instance
  const app = await NestFactory.create(AppModule, { cors: true });

  //allowing API to be accessed from web apps
  app.enableCors();

  //swagger API documentation
  //only enable Swagger in non-production environments for security
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Roadmap API')
      .setDescription('API documentation for Authentication, Users, and Tasks modules')
      .setVersion('1.0')
      .addBearerAuth() //"Authorize"
      .build();

    //create swagger document
    const document = SwaggerModule.createDocument(app, config);

    //setup swagger UI at http://localhost:3000/api)
    SwaggerModule.setup('api', app, document);

    console.log('Swagger documentation enabled at /api');
  }

  //set port 
  const port = process.env.PORT || 5000;

  //NestJS server
  await app.listen(port);

  //logs
  console.log(`🚀 Server running on http://localhost:${port}`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`📘 Swagger docs available at http://localhost:${port}/api`);
  }
}
bootstrap();
