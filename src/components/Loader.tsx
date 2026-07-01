import React from "react";
type loaderProps = {
  message: string;
};
const Loader: React.FC<loaderProps> = ({ message }) => {
  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default Loader;
