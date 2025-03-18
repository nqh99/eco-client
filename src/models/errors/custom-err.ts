class CustomError extends Error {
  code;
  data;

  constructor(code: number, message: string, cause?: string, data?: unknown) {
    super(message);

    this.name = code.toString();
    this.cause = cause;
    this.code = code;
    this.data = data;
  }
}

const isCustomError = (candidate: unknown): candidate is CustomError => {
  return candidate instanceof CustomError;
};

export { CustomError, isCustomError };
