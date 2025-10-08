import { User as UserType } from '@entities';

declare global {
  namespace Express {
    interface User extends UserType {}

    interface Request {
      user: User;
    }
  }
}
