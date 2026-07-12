import React, { useMemo } from "react";
import CreatableSelect from "react-select/creatable";
import type { MultiValue } from "react-select";

interface SelectUsersProps {
  users: string[];
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
}

type Option = {
  value: string;
  label: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SelectUsers: React.FC<SelectUsersProps> = ({
  users,
  value,
  onChange,
  label = "Select Users",
}) => {
  const options: Option[] = useMemo(
    () => users.map((email) => ({ value: email, label: email })),
    [users],
  );

  const selectedOptions: Option[] = useMemo(
    () => value.map((email) => ({ value: email, label: email })),
    [value],
  );

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
      </label>

      <CreatableSelect<Option, true>
        isMulti
        options={options}
        value={selectedOptions}
        placeholder="Type or select email..."
        onChange={(selected: MultiValue<Option>) => {
          onChange(selected.map((option) => option.value));
        }}
        isValidNewOption={(inputValue) => {
          const email = inputValue.trim().toLowerCase();
          return (
            emailRegex.test(email) &&
            !users.some((user) => user.toLowerCase() === email)
          );
        }}
        formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
        unstyled
        menuPortalTarget={document.body}
        menuPosition="fixed"
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        classNames={{
          control: ({ isFocused }) =>
            `flex items-center w-full px-3 py-2 rounded-lg border-2 transition-all duration-150 ${
              isFocused
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-white hover:border-gray-400"
            }`,
          valueContainer: () =>
            "flex flex-wrap gap-1.5 items-center max-h-[140px] overflow-y-auto pr-1",
          placeholder: () => "text-sm text-gray-500",
          input: () => "text-sm text-gray-900 m-0",
          menu: () =>
            "absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden",
          menuList: () => "py-1 max-h-[200px] overflow-y-auto",
          option: ({ isSelected, isFocused }) =>
            `px-3 py-2 text-sm cursor-pointer transition-colors duration-100 ${
              isSelected
                ? "bg-blue-500 text-white"
                : isFocused
                  ? "bg-gray-100 text-gray-900"
                  : "bg-white text-gray-900"
            }`,
          multiValue: () =>
            "flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium",
          multiValueLabel: () => "text-xs truncate",
          multiValueRemove: () =>
            "ml-1 cursor-pointer hover:text-blue-900 transition-colors",
          noOptionsMessage: () => "px-3 py-2 text-sm text-gray-500 text-center",
          loadingMessage: () => "px-3 py-2 text-sm text-gray-500 text-center",
        }}
      />
    </div>
  );
};

export default SelectUsers;
