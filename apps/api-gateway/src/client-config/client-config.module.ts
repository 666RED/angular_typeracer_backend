import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientConfigService } from 'apps/api-gateway/src/client-config/client-config.service';
import * as joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        AUTH_CLIENT_PORT: joi.number().default(3001),
        USER_CLIENT_PORT: joi.number().default(3002),
        ROOM_CLIENT_PORT: joi.number().default(3003),
      }),
    }),
  ],
  providers: [ClientConfigService],
  exports: [ClientConfigService],
})
export class ClientConfigModule {}
