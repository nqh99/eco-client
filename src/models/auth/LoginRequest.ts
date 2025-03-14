import { LoginRequestType } from '@/constants/auth/LoginRequestType';

export type LoginRequest = {
  user: string;
  password: string;
  type: LoginRequestType;
};
