import type { TFunction } from 'i18next';

/**
 * Maps known backend English error strings to i18n translation keys.
 * The backend sends English messages — we translate them on the frontend.
 */
const SERVER_ERROR_MAP: Record<string, string> = {
  'User not found': 'errors.userNotFound',
  'Invalid credentials': 'errors.invalidCredentials',
  'Unable to sign in. Try signing in with Google.': 'errors.tryGoogleSignIn',
  'User already exists': 'errors.userAlreadyExists',
  'Access denied': 'errors.accessDenied',
  'No email': 'errors.noEmail',
  'Login failed': 'login.failed',
  'Network error': 'errors.networkError',
};

export function translateServerError(message: string, t: TFunction): string {
  const key = SERVER_ERROR_MAP[message];
  return key ? t(key) : message;
}
