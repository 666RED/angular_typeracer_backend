import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoom(id: string) {
    return `This is room ${id}`;
  }
}
