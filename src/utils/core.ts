import { AuthenticationError } from "@/models/errors/authentication-err";
import { AuthorizationError } from "@/models/errors/authorization-err";
import { ClientError } from "@/models/errors/client-err";
import { NotFoundError } from "@/models/errors/not-found-err";
import { ServiceError } from "@/models/errors/service-err";
import { ValidationError } from "@/models/errors/validation-err";

/**
 * Specify the readable errors for client rendering based on the provided status.
 * @param status - The HTTP status code. Should not be falsy value.
 * @param err - The error response object. It should contains these below attributes:
 *                  - msg: the message which described the error
 *                  - info: which contains all error information like: cause, error stack trace, data object, etc
 * @returns A readable error object based on the status and err.
 */
const generateReadableErr = (status: number, err?: any) => {
  if (!status) {
    return new ServiceError("Invalid HTTP response status!");
  }

  if (status > 500) {
    return new ServiceError(
      err?.msg || "Please refresh and try again, or contact the support team!",
      err?.info
    );
  }

  switch (status) {
    case 404:
      return new NotFoundError(err?.msg);
    case 500:
      return new ServiceError(err?.msg);
    case 401:
      return new AuthenticationError(err?.msg);
    case 403:
      return new AuthorizationError(err?.msg);
    case 409 || 422:
      return new ValidationError(err?.msg);
    default:
      return new ClientError(err?.msg);
  }
};

// TODO: enhance later to mapping with VND, DOLLAR
const formatCurrency = (number: number): string => {
  return number.toLocaleString("it-IT");
};

export { generateReadableErr, formatCurrency };
