import { Select } from '@headlessui/react';
import React from 'react';
import { CiCircleCheck } from 'react-icons/ci';
import { PiWarningCircle } from 'react-icons/pi';

interface SelectInputProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  validate: (value: string) => string;
  triggerValidation: boolean;
}

const BListbox: React.FC<SelectInputProps> = ({
  options,
  value,
  onChange,
  placeholder,
  validate,
  triggerValidation,
}) => {
  const errorMessage = triggerValidation ? validate(value) : '';

  const borderClass = errorMessage
    ? 'border-red-500'
    : triggerValidation && !errorMessage
      ? 'border-green-500'
      : 'border-gray-300';

  const isPlaceholder = value === '';

  return (
    <div className="relative mb-4">
      <div className="relative flex items-center">
        <Select
          value={value}
          onChange={onChange}
          className={`w-full rounded-md border p-2 pr-6 ${borderClass} focus:outline-none ${
            errorMessage ? 'focus:ring-red-500' : 'focus:ring-green-500'
          } ${isPlaceholder ? 'text-gray-400' : 'text-black'}`} // Apply text color
        >
          {/* Placeholder option */}
          <option value="" disabled hidden className="text-gray-500">
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        {triggerValidation && !errorMessage && (
          <CiCircleCheck className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-green-500" />
        )}
        {triggerValidation && errorMessage && (
          <PiWarningCircle className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-red-500" />
        )}
      </div>

      {/* TODO: Add error message */}
      {/* {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>} */}
    </div>
  );
};

export default BListbox;
