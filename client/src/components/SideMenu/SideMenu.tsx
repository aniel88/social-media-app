/* React */
import React from "react";

/* Font Awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* Components */
import Text from "../Text/Text";
import { faHome, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface ISideMenuProps {
  icon: IconDefinition;
  text: string;
  url: string;
}

const SideMenu = ({ icon, text, url }: ISideMenuProps) => {
  return (
    <>
      <a
        href={url}
        title={text}
        className="flex flex-row relative w-full h-14 items-center xl:justify-start md:justify-center text-md group"
      >
        <FontAwesomeIcon
          className="text-2xl text-purple-500 md:text-purple-500 xl:text-purple-500 bg-transparent hover:bg-purple-500 hover:text-white w-5 xl:w-7 h-5 xl:h-7 p-2 rounded-2xl xl:hover:bg-transparent xl:hover:text-purple-500"
          icon={icon}
        />
        <Text extraClassName="mx-4 xl:block hidden group-hover:block absolute xl:relative right-11 xl:right-0 bg-white xl:bg-transparent rounded-2xl xl:rounded-none p-3 xl:p-0">
          {text}
        </Text>
      </a>
    </>
  );
};

export default SideMenu;
