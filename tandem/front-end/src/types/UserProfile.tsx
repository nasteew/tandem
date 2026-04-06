export interface UserProfile {
  id: number;
  name: string;
  email: string;
  about?: string;
  avatarUrl?: string;
  hasPassword?: boolean;
}
