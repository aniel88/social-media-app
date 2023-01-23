import React from "react";

type FormControlProps = {
  extraStyle?: React.CSSProperties;
  children?: React.ReactNode;
};

const baseClass = "form-control";
const templateClasses = "flex flex-col py-2";

const FormControl = ({ children, extraStyle }: FormControlProps) => {
  const className = `${baseClass} ${templateClasses}`;
  return (
    <div className={className} style={extraStyle}>
      {children}
    </div>
  );
};

export default FormControl;
