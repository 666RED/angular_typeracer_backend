import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class ClientConfigService {
  constructor(private config: ConfigService) {}

  getAuthClientPort() {
    return this.config.get<number>('AUTH_CLIENT_PORT');
  }

  getAuthClientHost() {
    return this.config.get<string>('AUTH_CLIENT_HOST');
  }

  getUserClientPort() {
    return this.config.get<number>('USER_CLIENT_PORT');
  }

  getUserClientHost() {
    return this.config.get<string>('USER_CLIENT_HOST');
  }

  getRoomClientPort() {
    return this.config.get<number>('ROOM_CLIENT_PORT');
  }

  getRoomClientHost() {
    return this.config.get<string>('ROOM_CLIENT_HOST');
  }

  get authClientOptions(): ClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        host: this.getAuthClientHost(),
        port: this.getAuthClientPort(),
      },
    };
  }

  get userClientOptions(): ClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        host: this.getUserClientHost(),
        port: this.getUserClientPort(),
      },
    };
  }

  get roomClientOptions(): ClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        host: this.getRoomClientHost(),
        port: this.getRoomClientPort(),
      },
    };
  }
}
