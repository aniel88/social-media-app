import React from "react";

type FormGroupProps = {
  extraStyle?: React.CSSProperties;
  children?: React.ReactNode;
};
const baseClass = "form-group";

const templateClasses = "flex flex-col px-1.5 py-1.5";

const FormGroup = ({ extraStyle, children }: FormGroupProps) => {
  const className = `${baseClass} ${templateClasses}`;
  return (
    <div style={extraStyle} className={className}>
      {children}
    </div>
  );
};

export default FormGroup;
