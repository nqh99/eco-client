import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { FiAlertCircle, FiChevronDown, FiCheck } from "react-icons/fi";

interface PersonOption {
  id: string;
  name: string;
}

interface SelectBoxListProps {
  options: PersonOption[];
  required?: boolean;
  placeholder?: string;
}

export default function SearchBar({
  options,
  required = false,
  placeholder = "Please select an option",
}: SelectBoxListProps) {
  const [selectedPerson, setSelectedPerson] = useState<PersonOption | null>(
    required ? null : options[0]
  );
  const [isTouched, setIsTouched] = useState(false);

  const validateSelection = () => required && !selectedPerson;

  const handlePersonChange = (person: PersonOption) => {
    setSelectedPerson(person);
    setIsTouched(false);
  };

  const handleBlur = () => {
    validateSelection() && setIsTouched(true);
  };

  const renderIcon = (
    icon: React.ReactNode,
    additionalClasses: string = ""
  ) => (
    <span
      className={`pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ${additionalClasses}`}
    >
      {icon}
    </span>
  );

  const isInvalidSelection = validateSelection() && isTouched;

  return (
    <div className="relative w-60">
      <Listbox value={selectedPerson} onChange={handlePersonChange} as="div">
        <Listbox.Button
          className={`w-full cursor-pointer bg-white text-gray-500 rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:border-primary focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white border ${
            isInvalidSelection ? "border-red-500" : "border-primary"
          }`}
          onBlur={handleBlur}
          style={{ minHeight: "2.5rem" }}
        >
          {selectedPerson ? selectedPerson.name : placeholder}
          {isInvalidSelection &&
            renderIcon(
              <FiAlertCircle className="h-5 w-5 text-red-500" />,
              "right-6"
            )}
          {renderIcon(
            <FiChevronDown
              className={`h-5 w-5 ${
                isInvalidSelection ? "text-red-500" : "text-primary"
              }`}
            />
          )}
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 w-full bg-white border border-primary text-gray-500 rounded-md shadow-lg max-h-60 py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
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
                  <span
                    className={`block truncate text-justify ${
                      selected
                        ? "font-semibold text-primary"
                        : "font-normal text-gray-500"
                    }`}
                  >
                    {option.name}
                  </span>
                  {selected &&
                    renderIcon(
                      <FiCheck className="h-[2.75rem] w-[1.75rem] text-primary" />,
                      "right-5"
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
