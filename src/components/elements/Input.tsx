"use client";

import React, { useState, useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { Input as IInput } from "@headlessui/react";

// interface InputProps {
//   as?: "input" | "textarea";
//   type?: string;
//   placeholder?: string;
//   value?: string;
//   onChange?: (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => void;
//   label?: string;
//   validate?: (value: string) => string;
//   triggerValidation?: boolean;
//   fullWidth?: boolean;
//   textareaHeight?: string;
// }


const Input = () => {
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (triggerValidation && validate) {
      const validationError = validate && validate(value as string);
      setError(validationError);
      setTouched(true);
    }
  }, [triggerValidation, value, validate]);

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTouched(true); // Mark the input as touched on blur
    const validationError = validate && validate(e.target.value);
    setError(validationError || "");
  };

  return (
    <div className="relative flex items-center">
      <IInput
        {...(as === "input" && { type })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        className={`block w-full p-3 pr-10 text-sm rounded-lg focus:outline-none ${
          error
            ? "border border-1 border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500"
            : "border border-1 border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-green-500 focus:border-green-500"
        } ${as === "textarea" ? textareaHeight : "h-[43px]"}`}
        aria-invalid={!!error}
      >
        {({ invalid }) => <></>}
      </IInput>
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        {touched &&
          (error ? (
            <MdErrorOutline className="h-5 w-5 text-red-500" />
          ) : (
            <CiCircleCheck className="h-5 w-5 text-green-500" />
          ))}
      </div>
    </div>
  );
};

export default Input;
