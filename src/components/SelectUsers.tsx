import React, { useMemo, useRef, useCallback } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import type { MultiValue } from "react-select";
import { findEmails } from "../api";
interface SelectUsersProps {
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  debounceMs?: number;
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
  debounceMs = 700,
}) => {
  const selectedOptions: Option[] = useMemo(
    () => value.map((email) => ({ value: email, label: email })),
    [value],
  );

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadOptions = useCallback(
    (inputValue: string): Promise<Option[]> => {
      return new Promise((resolve) => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        const query = inputValue.trim();
        if (!query) {
          resolve([]);
          return;
        }

        debounceTimer.current = setTimeout(async () => {
          try {
            const res = await findEmails(query);
            const emails: string[] = res?.data?.data ?? [];
            const filtered = emails.filter(
              (email) =>
                !value.some((v) => v.toLowerCase() === email.toLowerCase()),
            );
            resolve(filtered.map((email) => ({ value: email, label: email })));
          } catch (err) {
            console.error("Failed to fetch email suggestions", err);
            resolve([]);
          }
        }, debounceMs);
      });
    },
    [findEmails, value, debounceMs],
  );
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{label}</label>

      <AsyncCreatableSelect<Option, true>
        isMulti
        cacheOptions
        defaultOptions={false}
        value={selectedOptions}
        loadOptions={loadOptions}
        placeholder="Type or select email..."
        menuPortalTarget={document.body} // add
        menuPosition="fixed" // add
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }), // add — ensures it's above the modal
        }}
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
