import React from "react";

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value?: string | number;
  name: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent: React.FC<InputBoxProps> = ({
  placeholder,
  value,
  name,
  type = "text",
  onChange,
  ...props
}) => {
  const capitalize = (str: string): string => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-900 mb-2"
      >
        {capitalize(name)}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        id={name}
        name={name}
        onChange={onChange}
        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 transition-all duration-150 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-gray-400"
        {...props}
      />
    </div>
  );
};

export default InputComponent;
