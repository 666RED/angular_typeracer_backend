import { ROOM_PATTERNS } from '@backend/contracts';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ROOM_CLIENT } from 'apps/api-gateway/src/room/constant';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RoomService {
  constructor(@Inject(ROOM_CLIENT) private roomClient: ClientProxy) {}

  async getRoom(id: string): Promise<string> {
    return firstValueFrom(this.roomClient.send(ROOM_PATTERNS.GET_ROOM, id));
  }
}
