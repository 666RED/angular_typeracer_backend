import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { AuthModule } from './auth/auth.module';
import { ClientConfigModule } from './client-config/client-config.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from '@guards';
import { LoggerMiddleware } from '@middlewares';
import { PostgresModule } from '@backend/postgres';
import { UserModule } from './user/user.module';
import { RoomModule } from 'apps/api-gateway/src/room/room.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities';

@Module({
  imports: [
    AuthModule,
    ClientConfigModule,
    UserModule,
    RoomModule,
    PostgresModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [ApiGatewayController],
  providers: [
    ApiGatewayService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class ApiGatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
