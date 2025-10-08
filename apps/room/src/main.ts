import { NestFactory, Reflector } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcAllExceptionFilter } from '@filters';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { AppModule } from 'apps/room/src/app/app.module';

async function bootstrap() {
  const host = process.env.ROOM_CLIENT_HOST || 'room';
  const port = Number(process.env.ROOM_CLIENT_PORT) || 3003;

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
  Logger.log(`Room is running on: ${host}:${port}`);
}

bootstrap();
