import { NextFunction, Request, Response } from 'express';
import { authServiceFactory } from './authService';
import { cookieServiceFactory } from './cookieService';
import { User } from './interfaces/User';

interface Settings {
  clientId: string;
  authUrlBase: string;
  cookieName: string;
}

interface ExtendedRequest extends Request {
  user?: User;
}

export function authorizedMiddlewareFactory({ clientId, authUrlBase, cookieName }: Settings) {
  return () => (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const cookieService = cookieServiceFactory({ cookieName });
    const authService = authServiceFactory({ clientId, authUrlBase });

    const token = cookieService.getToken(req, res);

    if (!token) {
      res.status(401).end();
      return;
    }

    authService
      .getUserDetailsByToken(token)
      .then((user) => {
        if (!user) {
          res.status(401).end();
          return;
        }

        req.user = user;

        next();
      })
      .catch(() => {
        res.status(401).end();
        return;
      });
  };
}
