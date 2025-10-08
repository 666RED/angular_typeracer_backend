import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ROOM_PATTERNS } from '@backend/contracts';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(ROOM_PATTERNS.GET_ROOM)
  async getRoom(@Payload() id: string) {
    return this.appService.getRoom(id);
  }
}
