/* React */
import React from "react";

interface InputLayout {
  children?: React.ReactNode;
  extraStyle?: React.CSSProperties;
}

const baseClass = "layout";
const templateClasses = "flex justify-center items-center h-screen w-screen";

const Layout = ({ children, extraStyle }: InputLayout) => {
  const className = `${baseClass} ${templateClasses}`;
  return (
    <div style={extraStyle} className={className}>
      {children}
    </div>
  );
};

export default Layout;
