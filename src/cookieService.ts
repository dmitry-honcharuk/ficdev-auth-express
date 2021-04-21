import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';

export interface CookieService {
  getToken: (req: IncomingMessage, res: ServerResponse) => string | undefined;
}

interface FactoryOptions {
  cookieName?: string;
}

export function cookieServiceFactory(options: FactoryOptions): CookieService {
  const { cookieName = 'ficdev-auth-token' } = options;

  return {
    getToken: (req: IncomingMessage, res: ServerResponse) => {
      const cookies = new Cookies(req, res);

      return cookies.get(cookieName);
    },
  };
}
