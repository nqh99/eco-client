import React from "react";
import { AiOutlineCheckCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { Input, Textarea } from "@headlessui/react";

export enum InputType {
  Input = "input",
  Textarea = "textarea",
  Phone = "phone",
  Email = "email",
  Name = "name",
  Address = "address",
}

export const validationRules = {
  phone: (value: string) => /^[0-9]{10,11}$/.test(value),
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  name: (value: string) => value.trim().length > 0,
  address: (value: string) => value.trim().length > 0,
};

const warningMessages = {
  [InputType.Phone]: "Số điện thoại không hợp lệ.",
  [InputType.Email]: "Vui lòng nhập địa chỉ email hợp lệ.",
  [InputType.Name]: "Họ tên không được để trống.",
  [InputType.Address]: "Địa chỉ không được để trống.",
};

interface FormFieldProps<T extends Record<string, any>> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  field: keyof T;
  isTouched: boolean;
  formData: T;
  col?: string;
  as?: InputType;
}

const FromInput = <T extends Record<string, any>>({
  value,
  onChange,
  onBlur,
  placeholder,
  field,
  isTouched,
  formData,
  col = "col-span-12",
  as = InputType.Input,
}: FormFieldProps<T>) => {
  const validate = (field: keyof T) => {
    const rule = validationRules[field as keyof typeof validationRules];
    return rule ? rule(formData[field] as string) : true;
  };

  const isValid = validate(field);
  const Component = as === InputType.Textarea ? Textarea : Input;

  return (
    <div className={`relative flex flex-col ${col}`}>
      <div className={`relative flex items-center p-2 border rounded-lg w-full ${isTouched && !isValid ? "border-red-500" : "border-primary"}`}>
        <Component
          className="flex-1 bg-transparent focus:outline-none text-sm"
          value={value}
          onBlur={(e) => {
            onBlur(e);
          }}
          onChange={onChange}
          aria-invalid={!isValid}
          placeholder={placeholder}
        />
        {isTouched && (
          <div className="ml-2 text-lg relative">
            {isValid ? (
              <AiOutlineCheckCircle className="text-green-500" />
            ) : (
              <div className="group">
                <AiOutlineInfoCircle className="text-red-500" />
                <div className="absolute bottom-full right-0 transform translate-y-1 bg-gray-800 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap z-50 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden max-w-0 group-hover:max-w-xs">
                  {warningMessages[field as keyof typeof warningMessages]}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FromInput;
