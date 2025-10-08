import { Inject, Injectable } from '@nestjs/common';
import { USER_CLIENT } from 'apps/api-gateway/src/user/constant';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { USER_PATTERNS } from '@backend/contracts';
import { UserInterface } from '@models';

@Injectable()
export class UserService {
  constructor(@Inject(USER_CLIENT) private userClient: ClientProxy) {}

  async getUser(id: number): Promise<UserInterface> {
    return firstValueFrom(this.userClient.send(USER_PATTERNS.GET_USER, id));
  }
}
