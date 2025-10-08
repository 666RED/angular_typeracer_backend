export interface UserInterface {
  id: number;
  name: string;
  email: string;
  is_guest: boolean;
  room_id: string | null;
  last_active: Date;
}
