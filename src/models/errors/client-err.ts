import { HttpStatusCodes, HttpStatusMessages } from '@/constants/https/codes';
import { CustomError } from './custom-err';

class ClientError extends CustomError {
  constructor(cause?: string, data?: unknown) {
    super(
      HttpStatusCodes.BAD_REQ,
      HttpStatusMessages[HttpStatusCodes.BAD_REQ],
      cause,
      data
    );
  }
}

const isClientError = (candidate: unknown): candidate is ClientError => {
  return (
    candidate instanceof ClientError &&
    candidate?.code === HttpStatusCodes.BAD_REQ
  );
};

export { ClientError, isClientError };
