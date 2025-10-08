import { Injectable } from '@nestjs/common';
import { UserInterface } from '@models';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entities';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async getUser(id: number): Promise<UserInterface> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }
}
