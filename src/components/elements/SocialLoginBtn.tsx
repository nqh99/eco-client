import { OAuthProvider } from '@/constants/auth/OAuthProvider';
import { oauthAuthorize } from '@/apis/auth';
import { RedirectResponse } from '@/models/auth/RedirectResponse';
import { FaGoogle } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa6';

export type SocialLoginBtnProps = {
  provider: OAuthProvider;
  redirectUrl?: string;
  className?: string;
  onClick?: () => Promise<void>;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  onError?: (err: any) => Promise<void>;
};

export const SocialLoginBtn = ({
  provider,
  redirectUrl = `${window.location.origin}${window.location.pathname}?provider=${provider}`,
  onClick = async () => {},
  onError = async (e) => console.log(e),
  className,
}: SocialLoginBtnProps) => {
  const handleSocialLogin = async (provider: OAuthProvider) => {
    try {
      const authResp = await oauthAuthorize({
        redirectUrl,
        provider,
      });
      if (!authResp.ok) {
        await onError(authResp);
        return;
      }
      const redirectResponse = authResp.data as RedirectResponse;
      window.location.href = redirectResponse.redirectUrl;
    } catch (e) {
      await onError(e);
    }
  };

  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        await onClick();
        await handleSocialLogin(provider);
      }}
      className={className}
    >
      {provider === OAuthProvider.GOOGLE ? (
        <FaGoogle className="text-xl text-red-500" />
      ) : provider === OAuthProvider.FACEBOOK ? (
        <FaFacebook className="text-xl text-blue-500" />
      ) : null}
    </button>
  );
};
