import { CoreError } from '@/constants/error/core';
import { HttpStatusCodes } from '@/constants/https/codes';
import { AuthenticationError } from '@/models/errors/authentication-err';
import { AuthorizationError } from '@/models/errors/authorization-err';
import { ClientError } from '@/models/errors/client-err';
import { CustomError } from '@/models/errors/custom-err';
import { NotFoundError } from '@/models/errors/not-found-err';
import { ServiceError } from '@/models/errors/service-err';
import { ValidationError } from '@/models/errors/validation-err';

/**
 * Specify the readable errors for client rendering based on the provided status.
 * @param status - The HTTP status code. Should not be falsy value.
 * @param err - The error response object. It should contains these below attributes:
 *                  - msg: the message which described the error
 *                  - info: which contains all error information like: cause, error stack trace, data object, etc
 * @returns A readable error object based on the status and err.
 */
const generateReadableErr = (
  status: number,
  err?: CustomError | { msg: string; info: string }
) => {
  if (!status) {
    return new ServiceError(CoreError.INVALID_HTTP_STATUS);
  }

  if (status > HttpStatusCodes.INTERNAL_SERVICE_ERROR) {
    return err as ServiceError;
  }

  switch (status) {
    case HttpStatusCodes.NOT_FOUND:
      return err as NotFoundError;
    case HttpStatusCodes.UNAUTHORIZED:
      return err as AuthenticationError;
    case HttpStatusCodes.FORBIDDEN:
      return err as AuthorizationError;
    case HttpStatusCodes.CONFLICT:
    case HttpStatusCodes.UNPROCESSABLE_CONTENT:
      return err as ValidationError;
    default:
      return err as ClientError;
  }
};

// TODO: enhance later to mapping with VND, DOLLAR
const formatCurrency = (number: number): string => {
  return number.toLocaleString('it-IT');
};

/**
 * Converts a plain JavaScript object (POJO) to FormData.
 *
 * @param obj - The object to convert to FormData.
 * @param form - Optional FormData instance to append the converted data to. If not provided, a new FormData instance will be created.
 * @param namespace - Optional namespace to prepend to the form keys.
 * @returns The FormData instance with the converted data.
 */
const convertPOJOToFormData = (
  obj: Record<string, any>,
  form?: FormData,
  namespace?: string
): FormData => {
  const formData = form || new FormData();

  for (const property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      const formKey = namespace ? `${namespace}[${property}]` : property;

      if (
        typeof obj[property] === 'object' &&
        !(obj[property] instanceof File)
      ) {
        convertPOJOToFormData(obj[property], formData, formKey);
      } else {
        formData.append(formKey, obj[property]);
      }
    }
  }

  return formData;
};

const convertRoutingPath = (paths: string[]) => {
  const result: string[] = [];
  let currentPath = '';

  for (const path of paths) {
    currentPath += `/${path}`;
    result.push(currentPath);
  }

  return result;
};

const copyToClipboard = (code: string) => {
  navigator.clipboard.writeText(code);
};

export {
  generateReadableErr,
  formatCurrency,
  convertPOJOToFormData,
  convertRoutingPath,
  copyToClipboard,
};
