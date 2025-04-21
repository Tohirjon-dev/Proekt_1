import { userPayload } from './user-payload.types';

declare global {
  namespace Express {
    interface Request {
      user: userPayload;
    }
  }
}
