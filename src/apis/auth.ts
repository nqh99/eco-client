import { SERVER_ALIAS } from '@/constants/app';
import { sendRequest } from '@/utils/http';
import { ResponseErr } from '@/models/ResponseErr';
import { RegisterRequest } from '@/models/auth/RegisterRequest';
import { LoginRequest } from '@/models/auth/LoginRequest';
import { OAuthAuthorizeRequest } from '@/models/auth/OAuthAuthorizeRequest';
import { OAuthTokenRequest } from '@/models/auth/OAuthTokenRequest';
import { LoginResponse } from '@/models/auth/LoginResponse';
import { RedirectResponse } from '@/models/auth/RedirectResponse';
import { CustomerMdl } from '@/models/users/customer';

export const login = async (loginRequest: LoginRequest) => {
  return await sendRequest<LoginRequest, LoginResponse, ResponseErr>(
    `${SERVER_ALIAS}/auth/login`,
    loginRequest
  );
};

export const oauthAuthorize = async (
  authorizationRequest: OAuthAuthorizeRequest
) => {
  return await sendRequest<
    OAuthAuthorizeRequest,
    RedirectResponse,
    ResponseErr
  >(`${SERVER_ALIAS}/auth/oauth/authorize`, authorizationRequest);
};

export const revoke = async () => {
  return await sendRequest<undefined, undefined, ResponseErr>(
    `${SERVER_ALIAS}/auth/revoke`,
    undefined
  );
};

export const refresh = async () => {
  return await sendRequest<undefined, LoginResponse, ResponseErr>(
    `${SERVER_ALIAS}/auth/refresh`,
    undefined
  );
};

export const register = async (registerRequest: RegisterRequest) => {
  return await sendRequest<RegisterRequest, LoginResponse, ResponseErr>(
    `${SERVER_ALIAS}/auth/register`,
    registerRequest
  );
};

export const oauthToken = async (oauthLoginRequest: OAuthTokenRequest) => {
  return await sendRequest<OAuthTokenRequest, LoginResponse, ResponseErr>(
    `${SERVER_ALIAS}/auth/oauth/token`,
    oauthLoginRequest
  );
};

export const loadProfile = async () => {
  return await sendRequest<undefined, CustomerMdl, ResponseErr>(
    `${SERVER_ALIAS}/auth/profile`,
    undefined,
    'GET'
  );
};
