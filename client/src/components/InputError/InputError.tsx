import React from "react";

interface InputErrorType {
  message: string;
  isActive: boolean | undefined;
}

const baseClass = "input-error";

const templateClasses = "text-sm text-pink-500";

const InputError = ({ message, isActive = undefined }: InputErrorType) => {
  const className = `${baseClass} ${templateClasses}`;
  const renderInputError =
    isActive === undefined ? (
      <></>
    ) : !isActive ? (
      <div className={className}>{message}</div>
    ) : (
      <></>
    );

  return renderInputError;
};

export default InputError;
