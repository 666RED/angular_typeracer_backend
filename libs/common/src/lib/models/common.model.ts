import { User } from 'libs/postgres/src/lib/entities';

export interface CustomRequest extends Express.Request {
  user: User;
  cookies: Record<string, string>;
}
