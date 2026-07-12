import React from "react";

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
      <p className="text-sm font-medium text-gray-600">{message}</p>
    </div>
  );
};

export default Loader;
