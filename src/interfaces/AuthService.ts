import { User } from './User';

export interface AuthService {
  getUserDetailsByToken(token: string): Promise<User | null>;
}
