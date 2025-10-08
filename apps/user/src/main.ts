import { Logger } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { RpcAllExceptionFilter } from '@filters';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const host = process.env.USER_CLIENT_HOST || 'user';
  const port = Number(process.env.USER_CLIENT_PORT) || 3002;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
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
  Logger.log(`User is running on: ${host}:${port}`);
}

bootstrap();
