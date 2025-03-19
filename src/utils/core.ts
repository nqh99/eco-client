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
  formatCurrency,
  convertPOJOToFormData,
  convertRoutingPath,
  copyToClipboard,
};
