import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities';
import { PostgresModule } from '@backend/postgres';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User]), PostgresModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
