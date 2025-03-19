'use client';

import { loadProfile, login, oauthToken } from '@/apis/auth';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CompanyPolicies from '@/components/footer/CompanyPolicies';
import { AppDispatch } from '@/lib/store';
import { authSlice, AuthState } from '@/lib/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { OAuthProvider } from '@/constants/auth/OAuthProvider';
import { LoginRequestType } from '@/constants/auth/LoginRequestType';
import { LoginResponse } from '@/models/auth/LoginResponse';
import { SocialLoginBtn } from '@/components/elements/SocialLoginBtn';
import { CustomerMdl } from '@/models/users/customer';

const LoginPage = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const authState: AuthState = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [password, setPassword] = useState('');
  const searchParams = useSearchParams();

  // Handle redirect if already authenticated
  useEffect(() => {
    if (authState.isAuthenticated) {
      router.push('/');
    }
  }, [authState.isAuthenticated, router]);

  // Handle OAuth callback
  const codeDecoded = searchParams.get('code');
  useEffect(() => {
    const handleOauth = async () => {
      try {
        if (!codeDecoded) {
          return;
        }
        const code = new URLSearchParams(codeDecoded).toString();
        const providerParams =
          OAuthProvider[
            searchParams.get('provider') as keyof typeof OAuthProvider
          ];
        if (providerParams == null) {
          setError('Invalid provider parameter');
          return;
        }
        const provider = providerParams as OAuthProvider;
        const redirectUrl = `${window.location.origin}${window.location.pathname}?provider=${provider}`;
        const resp = await oauthToken({
          code,
          redirectUrl,
          provider,
        });
        const customerInfoResp = await loadProfile();
        if (!resp.ok) {
          setError(
            'Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.'
          );
          return;
        }
        if (!customerInfoResp.ok) {
          setError(
            'Không thể load thông tin khách hàng. Vui lòng thử lại sau.'
          );
          return;
        }
        dispatch(
          authSlice.actions.principal(customerInfoResp.data as CustomerMdl)
        );
        dispatch(authSlice.actions.authenticate(resp.data as LoginResponse));
      } catch {
        setError(
          'Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.'
        );
      } finally {
        setLoading(false);
      }
    };
    handleOauth();
  }, [searchParams, dispatch, router]);

  const handleLogin = async (user: string, password: string) => {
    setLoading(true);
    setError('');

    try {
      let type: LoginRequestType;
      if (user.includes('@')) {
        type = LoginRequestType.EMAIL;
      } else {
        type = LoginRequestType.PHONE_NUMBER;
      }
      const response = await login({
        user,
        password,
        type,
      });
      const customerInfoResp = await loadProfile();
      if (!response.ok) {
        setError(
          'Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.'
        );
        return;
      }
      if (!customerInfoResp.ok) {
        setError('Không thể load thông tin khách hàng. Vui lòng thử lại sau.');
        return;
      }
      dispatch(
        authSlice.actions.principal(customerInfoResp.data as CustomerMdl)
      );
      dispatch(authSlice.actions.authenticate(response.data as LoginResponse));
    } catch {
      setError(
        'Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLoginErr = async () => {
    setError('Không thể kết nối với dịch vụ đăng nhập. Vui lòng thử lại sau.');
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-default py-10">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-primary">
          Đăng nhập
        </h1>

        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(user, password);
          }}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="user"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Tên đăng nhập
            </label>
            <input
              id="user"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Email hoặc số điện thoại"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Ghi nhớ đăng nhập
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="text-primary hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="hover:bg-primary/90 w-full rounded-md bg-primary px-4 py-2 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70"
          >
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Hoặc đăng nhập với
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <SocialLoginBtn
              provider={OAuthProvider.GOOGLE}
              onClick={async () => setLoading(true)}
              onError={handleSocialLoginErr}
              className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            />
            <SocialLoginBtn
              provider={OAuthProvider.FACEBOOK}
              onClick={async () => setLoading(true)}
              onError={handleSocialLoginErr}
              className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            />
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Chưa có tài khoản?{' '}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>

      <div className="mt-8 w-full">
        <CompanyPolicies />
      </div>
    </main>
  );
};

export default LoginPage;
