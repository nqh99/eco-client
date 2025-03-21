enum ErrorType {
  // Permission Errors
  AUTHENTICATION_ERROR,
  AUTHORIZATION_ERROR,
  SESSION_EXPIRED_ERROR,

  // Resource Errors
  NOTFOUND_ERROR,
  SYSTEM_ERROR,

  // Validation Errors
  VALIDATION_ERROR,
}

export { ErrorType };
