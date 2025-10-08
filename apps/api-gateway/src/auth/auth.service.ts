import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_CLIENT } from './constant';
import { firstValueFrom } from 'rxjs';
import { AUTH_PATTERNS, LoginDto, RegisterDto } from '@backend/contracts';
import { SignTokenResponse } from '@models';

@Injectable()
export class AuthService {
  constructor(@Inject(AUTH_CLIENT) private authClient: ClientProxy) {}

  async register(dto: RegisterDto): Promise<SignTokenResponse> {
    return firstValueFrom(this.authClient.send(AUTH_PATTERNS.REGISTER, dto));
  }

  async login(dto: LoginDto): Promise<SignTokenResponse> {
    return firstValueFrom(this.authClient.send(AUTH_PATTERNS.LOGIN, dto));
  }

  async refreshToken(token: string): Promise<{ accessToken: string }> {
    return firstValueFrom(
      this.authClient.send(AUTH_PATTERNS.REFRESH_TOKEN, token)
    );
  }

  async logout(id: number): Promise<void> {
    return firstValueFrom(this.authClient.send(AUTH_PATTERNS.LOGOUT, id));
  }
}
