"use client";

import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { CiCircleCheck } from "react-icons/ci";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface PersonOption {
  id: string;
  name: string;
}

interface SelectBoxListProps {
  options: PersonOption[];
  required?: boolean;
  placeholder?: string;
  colSpan?: string;
  width?: string;
  onChange: (person: PersonOption | null) => void;
  isTouched?: boolean;
}

export default function SelectBoxList({
  options,
  required = false,
  placeholder = "Please select an option",
  colSpan = "col-span-1",
  width = "w-full",
  onChange,
  isTouched = false,
}: SelectBoxListProps) {
  const [selectedPerson, setSelectedPerson] = useState<PersonOption | null>(null);

  const handlePersonChange = (person: PersonOption) => {
    setSelectedPerson(person);
    onChange(person);
  };

  const showError = required && !selectedPerson && isTouched;

  const getWarningMessage = () => {
    return "Vui lòng chọn một tùy chọn.";
  };

  return (
    <div className={`relative ${colSpan}`} style={{ width }}>
      <Listbox value={selectedPerson} onChange={handlePersonChange} as="div" className="relative">
        <Listbox.Button
          className={`relative ${width} cursor-pointer bg-white text-gray-500 rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none border ${
            showError ? "border-red-500" : selectedPerson ? "border-primary" : "border-primary"
          }`}
          aria-invalid={showError}
          aria-required={required}
        >
          <span className="block truncate">
            {selectedPerson ? selectedPerson.name : placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-2">
            {showError && (
              <span className="group relative flex items-center">
                     <AiOutlineInfoCircle className="ml-2 text-lg text-red-500" />
                <span className="absolute bottom-full right-0 transform translate-y-1 bg-gray-800 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {getWarningMessage()}
                </span>
              </span>
            )}
            <FiChevronDown className={`h-5 w-5 ${showError ? "text-red-500" : "text-gray-400"}`} />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 text-gray-500 rounded-md shadow-lg max-h-60 py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none z-10">
          {options.map((option) => (
            <Listbox.Option
              key={option.id}
              value={option}
              className={({ active, selected }) =>
                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                  active ? "bg-gray-100" : ""
                } ${selected ? "font-medium" : "font-normal"}`
              }
            >
              {({ selected }) => (
                <>
                  <span className={`block truncate ${selected ? "font-semibold text-primary" : "font-normal text-gray-500"}`}>
                    {option.name}
                  </span>
                  {selected && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 group">
                      <CiCircleCheck className="h-5 w-5 text-primary" />
                      <span className="absolute bottom-full left-0 transform translate-y-1 bg-gray-800 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {getWarningMessage()}
                      </span>
                    </div>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
