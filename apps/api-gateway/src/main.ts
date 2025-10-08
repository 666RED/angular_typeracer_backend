import { AllExceptionFilter } from '@filters';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ApiGatewayModule } from 'apps/api-gateway/src/api-gateway.module';
import cookieParser from 'cookie-parser';

declare const module: any;

async function bootstrap() {
  const host = process.env.HOST || '127.0.0.1';
  const port = Number(process.env.PORT) || 3000;

  const app = await NestFactory.create(ApiGatewayModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter());
  app.enableCors({
    origin: ['http://localhost:4200', 'https://laravel-react-typeracer.online'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  app.use(cookieParser());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(port);
  Logger.log(`Api Gateway is running on: ${host}:${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
