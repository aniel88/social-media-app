/* React */
import React from "react";

interface DropdownMenuProps {
  children?: JSX.Element | JSX.Element[];
}

const baseClass = "dropdown";
const templateClasses =
  "absolute top-14 w-80 p-1 bg-purple-500 border-2 border-purple-400  rounded-2xl";

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const className = `${baseClass} ${templateClasses}`;
  return <div className={className}>{children}</div>;
};

export default DropdownMenu;
