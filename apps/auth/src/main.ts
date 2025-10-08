import { NestFactory, Reflector } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcAllExceptionFilter } from '@filters';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';

async function bootstrap() {
  const host = process.env.AUTH_CLIENT_HOST || 'auth';
  const port = Number(process.env.AUTH_CLIENT_PORT) || 3001;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    }
  );

  app.useGlobalFilters(new RpcAllExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen();
  Logger.log(`Auth is running on: ${host}:${port}`);
}

bootstrap();
