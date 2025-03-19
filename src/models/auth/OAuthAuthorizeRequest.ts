import { OAuthProvider } from '@/constants/auth/OAuthProvider';

export type OAuthAuthorizeRequest = {
  redirectUrl: string;
  provider: OAuthProvider;
};
