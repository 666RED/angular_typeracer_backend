import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTH_PATTERNS, LoginDto, RegisterDto } from '@backend/contracts';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_PATTERNS.REGISTER)
  async register(@Payload() data: RegisterDto) {
    return this.authService.register(data);
  }

  @MessagePattern(AUTH_PATTERNS.LOGIN)
  async login(@Payload() data: LoginDto) {
    return this.authService.login(data);
  }

  @MessagePattern(AUTH_PATTERNS.REFRESH_TOKEN)
  async refreshToken(@Payload() token: string) {
    return this.authService.refreshToken(token);
  }

  @MessagePattern(AUTH_PATTERNS.LOGOUT)
  async logout(@Payload() id: number) {
    return this.authService.logout(id);
  }
}
