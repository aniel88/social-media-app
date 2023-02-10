import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faIcons } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Icon from "../Icon/Icon";
import UserIcon from "../UserIcon/UserIcon";

interface DropdownProps {
  children?: JSX.Element | JSX.Element[];
  icon?: IconDefinition;
  title?: string;
  customStyle?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}

const DropdownItem = ({
  children,
  icon = faIcons,
  title = "",
  customStyle,
  onClick,
}: DropdownProps) => {
  const isEmptyIcon = icon.iconName === "icons" ? true : false;

  return (
    <a
      style={customStyle}
      className="flex flex-row w-full items-center justify-start cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-row items-center w-full rounded-2xl h-auto my-2 p-2 cursoir-pointer hover:bg-purple-400">
        {isEmptyIcon ? (
          ""
        ) : (
          <Icon>
            <FontAwesomeIcon
              style={{ color: "white" }}
              icon={icon}
            ></FontAwesomeIcon>
          </Icon>
        )}

        <span className="flex mx-2 text-white">{title}</span>
        {children}
      </div>
    </a>
  );
};

export default DropdownItem;
