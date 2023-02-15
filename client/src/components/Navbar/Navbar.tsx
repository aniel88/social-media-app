/* React */
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import React from "react";

interface NavbarProps {
  children?: JSX.Element | JSX.Element[];
  icon?: FontAwesomeIconProps;
  extraStyle?: React.CSSProperties;
}

const baseClass = "navbar";
const templateClasses =
  "flex h-14 w-100 p-6 flex-row items-center bg-purple-500 justify-between sticky top-0 z-40";

const Navbar = ({ children, extraStyle }: NavbarProps) => {
  const className = `${baseClass} ${templateClasses} `;

  return (
    <div style={extraStyle} className={className}>
      {children}
    </div>
  );
};

export default Navbar;
