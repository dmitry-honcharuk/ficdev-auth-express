import { AUTH_URL_BASE } from './constants';
import { AuthError } from './errors/AuthError';
import { AuthService } from './interfaces/AuthService';
import { User } from './interfaces/User';
import { get } from './request-client';

interface Settings {
  clientId: string;
}

export function authServiceFactory({ clientId }: Settings): AuthService {
  return {
    async getUserDetailsByToken(token: string): Promise<{ id: string } | null> {
      try {
        return await get<User>(`${AUTH_URL_BASE}/api/${clientId}/authorize`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        throw new AuthError();
      }
    },
  };
}
