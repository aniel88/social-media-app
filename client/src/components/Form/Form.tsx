/* React */
import React from "react";

interface FormProps {
  children?: React.ReactNode;
  extraStyle?: React.CSSProperties;
  onSubmit?: React.FormEventHandler<HTMLFormElement> | undefined;
}

const baseClass = "form";
const templateClass = "p-10 w-auto";

const Form = ({ children, extraStyle, onSubmit }: FormProps) => {
  const className = `${extraStyle} ${baseClass} ${templateClass}`;
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
