import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { USER_PATTERNS } from '@backend/contracts';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(USER_PATTERNS.GET_USER)
  async getUser(@Payload() id: number) {
    return this.appService.getUser(id);
  }
}
