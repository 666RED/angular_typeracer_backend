import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CustomRequest } from '@models';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-user')
  async getUser(@Req() req: CustomRequest) {
    return await this.userService.getUser(req.user.id);
  }
}
