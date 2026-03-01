import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get frontend URL from environment variable
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

  // Enable CORS
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const config = new DocumentBuilder()
    .setTitle('Tandem API')
    .setDescription('Tandem API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();
