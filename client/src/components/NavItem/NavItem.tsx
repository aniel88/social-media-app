/* React */
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFontAwesome } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Dropdown from "../DropdownMenu/DropdownMenu";
import OutsideClickHandler from "react-outside-click-handler";

interface NavItemProps {
  children?: JSX.Element | JSX.Element[];
  icon?: IconDefinition;
  extraStyle?: React.CSSProperties;
  title: string;
}

const baseClass = "nav-item";
const templateClasses =
  "mx-1 flex items-center justify-center rounded-full bg-blue-500 h-10  w-10 overflow-hidden cursor-pointer bg-purple-400 text-white ";

const NavItem = ({
  children,
  title,
  extraStyle,
  icon = faFontAwesome,
}: NavItemProps) => {
  const [open, setOpen] = useState(false);

  const className = `${baseClass} ${templateClasses}`;
  return (
    <>
      {/* <OutsideClickHandler onOutsideClick={() => setOpen(false)}> */}
      <li style={extraStyle} className={className} title={title}>
        <a
          className="flex items-center justify-center h-full w-full rounded-full"
          href="#"
          onClick={() => setOpen(!open)}
        >
          <FontAwesomeIcon icon={icon} />
        </a>
      </li>
      {/* </OutsideClickHandler> */}
      {open && children}
    </>
  );
};

export default NavItem;
