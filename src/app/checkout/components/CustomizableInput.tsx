import React, { useState, useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { Input, Textarea } from "@headlessui/react";

interface InputProps {
  as?: "input" | "textarea"; // Prop to switch between input and textarea
  type?: string; // Type prop for input fields
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label?: string;
  validate?: (value: string) => string;
  triggerValidation?: boolean;
  fullWidth?: boolean;
  textareaHeight?: string; // Additional prop for textarea height
}

const BInput = ({
  as = "input",
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  validate,
  triggerValidation,
  fullWidth = false,
  textareaHeight = "h-[150px]",
}: InputProps) => {
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

useEffect(() => {
 if (triggerValidation && validate) {
   const validationError = validate && validate(value as string);
   setError(validationError);
   setTouched(true);
 }
}, [triggerValidation, value, validate]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched(true); // Mark the input as touched on blur
    const validationError = validate && validate(e.target.value);
    setError(validationError || "");
  };

  const InputElement = as === "textarea" ? Textarea : Input;

  return (
    <div className={`mb-4 ${fullWidth ? "w-full" : "w-auto"}`}>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative flex items-center">
        <InputElement
          {...(as === "input" && { type })}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          className={`block w-full p-3 pr-10 text-sm rounded-lg focus:outline-none ${
            error
              ? "border border-1 border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500"
              : "border border-1 border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-green-500 focus:border-green-500"
          } ${as === "textarea" ? textareaHeight : "h-[43px]"}`} // Use the textareaHeight prop
          aria-invalid={!!error}
        />
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          {touched && (
            error ? (
              <MdErrorOutline className="h-5 w-5 text-red-500" />
            ) : (
              <CiCircleCheck className="h-5 w-5 text-green-500" />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default BInput;
