/* React */
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { ISideMenuProps } from "../SideMenu/SideMenu";

interface IMobileSideMenu {
  onCloseClick?: React.MouseEventHandler<HTMLButtonElement>;
  menuItems: ISideMenuProps[];
}

const MobileSideMenu = ({ onCloseClick, menuItems }: IMobileSideMenu) => {
  return (
    <div className="absolute h-screen flex flex-col justify-between w-2/3 bg-purple-700 z-50 md:hidden transition ease-in-out delay-150">
      <button
        onClick={onCloseClick}
        className="side-menu-header flex flex-row items-center justify-end h-14"
      >
        <FontAwesomeIcon
          className="p-3 mx-4 font text-xl font-bold text-white cursor-pointer"
          icon={faArrowLeft}
        />
      </button>
      <div className="flex flex-col justify-center items-center h-full">
        <div>
          {menuItems.map((menuItem, index) => (
            <a
              key={index}
              href={menuItem.url}
              className="flex flex-row items-center cursor-pointer text-white font-bold text-2xl md:text-4xl w-full p-3"
            >
              <FontAwesomeIcon icon={menuItem.icon} />
              <div className="mx-4">{menuItem.text}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileSideMenu;
