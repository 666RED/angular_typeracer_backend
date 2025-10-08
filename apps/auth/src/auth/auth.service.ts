import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { LoginDto, RegisterDto } from '@backend/contracts';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entities';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async register(dto: RegisterDto) {
    const { name, email, password, confirmPassword } = dto;

    //@ Check if email existed
    const existedEmail = await this.userRepository.findOne({
      where: { email },
    });

    if (existedEmail) {
      throw new ForbiddenException('Email already existed');
    }

    //@ Check if password === confirmPassword
    if (password !== confirmPassword) {
      throw new ForbiddenException(
        'Password should match with confirm password'
      );
    }

    //@ Hash password
    const hashedPassword = await argon.hash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    return this.signToken(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const passwordMatches = await argon.verify(user.password, dto.password);

    if (!passwordMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signToken(user);
  }

  async signToken(user: User): Promise<{
    user: User;
    accessToken: string;
    refreshToken: string;
  }> {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const secret = this.config.get<string>('JWT_SECRET');

    const accessToken = await this.jwt.signAsync(payload, {
      secret,
      expiresIn: '15m',
    });
    const refreshToken = await this.jwt.signAsync(payload, {
      secret,
      expiresIn: '7d',
    });

    await this.userRepository.update(
      { id: user.id },
      { refresh_token: await argon.hash(refreshToken) }
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string) {
    const payload: { sub: number; email: string } = await this.jwt.verifyAsync(
      token,
      { secret: this.config.get<string>('JWT_SECRET') }
    );

    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });

    if (
      !user ||
      !user?.refresh_token ||
      !(await argon.verify(user.refresh_token, token))
    ) {
      throw new UnauthorizedException();
    }

    const newAccessToken = await this.jwt.signAsync(
      {
        sub: payload.sub,
        email: payload.email,
      },
      { secret: this.config.get<string>('JWT_SECRET'), expiresIn: '15m' }
    );

    return { accessToken: newAccessToken };
  }

  async logout(id: number) {
    return await this.userRepository.update({ id }, { refresh_token: null });
  }
}
