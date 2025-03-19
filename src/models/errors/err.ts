import { HttpStatusCodes, HttpStatusMessages } from '@/constants/https/codes';
import { ErrorType } from '@/constants/error/type';

class CustomError extends Error {
  type;
  code;
  data;

  constructor(
    type: ErrorType,
    code: HttpStatusCodes,
    message: string | undefined,
    cause?: string,
    data?: unknown
  ) {
    super(message || HttpStatusMessages[code]);

    this.name = code.toString();
    this.cause = cause;
    this.type = type;
    this.code = code;
    this.data = data;
  }
}

const isCustomError = (candidate: unknown): candidate is CustomError => {
  return candidate instanceof CustomError;
};

export { CustomError, isCustomError };
