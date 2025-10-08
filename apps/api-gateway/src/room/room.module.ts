import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { ClientConfigModule } from 'apps/api-gateway/src/client-config/client-config.module';
import { ROOM_CLIENT } from 'apps/api-gateway/src/room/constant';
import { ClientConfigService } from 'apps/api-gateway/src/client-config/client-config.service';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [ClientConfigModule],
  controllers: [RoomController],
  providers: [
    RoomService,
    {
      provide: ROOM_CLIENT,
      useFactory: (configService: ClientConfigService) => {
        const clientOptions = configService.roomClientOptions;
        return ClientProxyFactory.create(clientOptions);
      },
      inject: [ClientConfigService],
    },
  ],
})
export class RoomModule {}
