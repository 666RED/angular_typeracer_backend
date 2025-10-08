import { UserInterface } from './user.model';

export interface SignTokenResponse {
  user: UserInterface;
  accessToken: string;
  refreshToken: string;
}
