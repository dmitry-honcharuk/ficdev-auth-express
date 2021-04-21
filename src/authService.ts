import { AuthError } from './errors/AuthError';
import { AuthService } from './interfaces/AuthService';
import { User } from './interfaces/User';
import { get } from './request-client';

interface Settings {
  clientId: string;
  authUrlBase: string;
}

export function authServiceFactory({ clientId, authUrlBase }: Settings): AuthService {
  return {
    async getUserDetailsByToken(token: string): Promise<{ id: string } | null> {
      try {
        return await get<User>(`${authUrlBase}/api/${clientId}/authorize`, {
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
