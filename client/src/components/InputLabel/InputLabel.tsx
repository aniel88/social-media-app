import React from "react";

interface InputLabelForm extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  extraStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

const baseClass = "label";
const templateClasses = "py-2";

const InputLabel = ({ htmlFor, children, extraStyle }: InputLabelForm) => {
  const className = `${baseClass} ${templateClasses}`;
  return (
    <label htmlFor={htmlFor} style={extraStyle} className={className}>
      {children}
    </label>
  );
};

export default InputLabel;
