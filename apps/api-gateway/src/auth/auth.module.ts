import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ClientConfigModule } from '../client-config/client-config.module';
import { AUTH_CLIENT } from './constant';
import { ClientConfigService } from '../client-config/client-config.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities';

@Module({
  imports: [
    ClientConfigModule,
    JwtModule.register({
      global: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: AUTH_CLIENT,
      useFactory: (configService: ClientConfigService) => {
        const clientOptions = configService.authClientOptions;
        return ClientProxyFactory.create(clientOptions);
      },
      inject: [ClientConfigService],
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
