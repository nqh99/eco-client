import { HttpStatusCodes, HttpStatusMessages } from '@/constants/https/codes';
import { CustomError } from './custom-err';

class AuthenticationError extends CustomError {
  constructor(cause?: string, data?: unknown) {
    super(
      HttpStatusCodes.UNAUTHORIZED,
      HttpStatusMessages[HttpStatusCodes.UNAUTHORIZED],
      cause,
      data
    );
  }
}

const isAuthenticationError = (
  candidate: unknown
): candidate is AuthenticationError => {
  return (
    candidate instanceof AuthenticationError &&
    candidate?.code === HttpStatusCodes.UNAUTHORIZED
  );
};

export { AuthenticationError, isAuthenticationError };
