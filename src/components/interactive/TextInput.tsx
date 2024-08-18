import React from "react";
import { Popover } from "@headlessui/react";
import { AiOutlineCheckCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { FormFieldProps, isValidField, getWarningMessage } from "@/utils/validation";

const FormField = <T extends Record<string, any>>({
  value,
  onChange,
  onBlur,
  placeholder,
  field,
  isTouched,
  formData,
  col = "col-span-12",
  as = "input",
}: FormFieldProps<T>) => {
  const isValid = isValidField(field, formData);

  return (
    <div className={`relative flex flex-col ${col}`}>
      <div className={`relative flex items-center p-2 border rounded-lg w-full ${isTouched && !isValid ? "border-red-500" : "border-primary"}`}>
        {as === "input" ? (
          <input
            type="text"
            className="flex-1 bg-transparent focus:outline-none text-sm"
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            aria-invalid={!isValid}
            placeholder={placeholder}
          />
        ) : (
          <textarea
            className="flex-1 bg-transparent focus:outline-none text-sm"
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            aria-invalid={!isValid}
            placeholder={placeholder}
          ></textarea>
        )}
        {isTouched && (
          <div className="ml-2 text-lg">
            {isValid ? (
              <AiOutlineCheckCircle className="text-green-500" />
            ) : (
              <Popover className="relative">
                <Popover.Button className="focus:outline-none">
                  <AiOutlineInfoCircle className="text-red-500" />
                </Popover.Button>
                <Popover.Panel className="absolute bottom-full right-0 transform translate-y-1 bg-gray-800 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap z-50 shadow-lg">
                  {getWarningMessage(field)}
                </Popover.Panel>
              </Popover>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormField;
