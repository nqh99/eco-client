import { OAuthProvider } from '@/constants/auth/OAuthProvider';

export type OAuthTokenRequest = {
  redirectUrl: string;
  code: string;
  provider: OAuthProvider;
};
