/* React */
import React from "react";

interface ErrorMessageType {
  message?: string;
}

const baseClass = "error-message";

const templateClasses = "text-sm text-pink-500";

const ErrorMessage = ({ message = "" }: ErrorMessageType) => {
  const className = `${baseClass} ${templateClasses}`;
  const renderErrorMessage =
    message.length === 0 ? <></> : <div className={className}>{message}</div>;

  return renderErrorMessage;
};

export default ErrorMessage;
