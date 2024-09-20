const validateEmptyInput = (
  input: string,
  invalidMsg: string,
  successMsg?: string
): string => {
  if (input.trim() === "") {
    return invalidMsg;
  } else {
    return successMsg || "";
  }
};

const validatePhoneInput = (
  input: string,
  invalidMsg: string,
  successMsg?: string
): string => {
  if (!/^[0-9]{10,11}$/.test(input)) {
    return invalidMsg;
  } else {
    return successMsg || "";
  }
};

const validateEmailInput = (
  input: string,
  invalidMsg: string,
  successMsg?: string
): string => {
  if (!/\S+@\S+\.\S+/.test(input)) {
    return invalidMsg;
  } else {
    return successMsg || "";
  }
};

export { validateEmptyInput, validatePhoneInput, validateEmailInput };
