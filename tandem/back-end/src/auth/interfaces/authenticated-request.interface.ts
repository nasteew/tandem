import { JwtPayload } from './jwt-payload.interface.js';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
