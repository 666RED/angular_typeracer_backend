import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientConfigModule } from 'apps/api-gateway/src/client-config/client-config.module';
import { USER_CLIENT } from 'apps/api-gateway/src/user/constant';
import { ClientConfigService } from 'apps/api-gateway/src/client-config/client-config.service';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [ClientConfigModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_CLIENT,
      useFactory: (configService: ClientConfigService) => {
        const clientOptions = configService.userClientOptions;
        return ClientProxyFactory.create(clientOptions);
      },
      inject: [ClientConfigService],
    },
  ],
})
export class UserModule {}
