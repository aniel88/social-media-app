/* React */
import React from "react";

interface NavItemsProps {
  children?: JSX.Element | JSX.Element[];
}

const baseClass = "nav-items";
const templateClasses = "flex items-center justify-end";
const NavItems = ({ children }: NavItemsProps) => {
  const className = `${baseClass} ${templateClasses}`;
  return <ul className={className}>{children}</ul>;
};
export default NavItems;
