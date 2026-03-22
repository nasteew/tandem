import { Request } from 'express';
import { Profile } from 'passport-google-oauth20';

export interface GoogleRequest extends Request {
  user: Pick<Profile, 'id' | 'displayName' | 'emails'>;
}
