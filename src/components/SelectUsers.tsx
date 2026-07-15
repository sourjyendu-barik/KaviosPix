import React, { useMemo } from "react";
import CreatableSelect from "react-select/creatable";
import type { MultiValue } from "react-select";

interface SelectUsersProps {
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
  value,
  onChange,
  label = "Select Users",
}) => {
  const selectedOptions: Option[] = useMemo(
    () => value.map((email) => ({ value: email, label: email })),
    [value],
  );

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{label}</label>

      <CreatableSelect<Option, true>
        isMulti
        options={[]}
        value={selectedOptions}
        placeholder="Type or select email..."
        onChange={(selected: MultiValue<Option>) => {
          onChange(selected.map((option) => option.value));
        }}
        isValidNewOption={(inputValue) => {
          const email = inputValue.trim().toLowerCase();
          return (
            emailRegex.test(email) &&
            !value.some((user) => user.toLowerCase() === email)
          );
        }}
        onCreateOption={(inputValue) => {
          const email = inputValue.trim().toLowerCase();
          onChange([...value, email]);
        }}
        formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
      />
    </div>
  );
};

export default SelectUsers;
