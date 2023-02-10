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
        className="flex flex-row w-full h-14 items-center xl:justify-start md:justify-center text-md"
      >
        <FontAwesomeIcon
          className="text-2xl text-purple-500 md:text-purple-500 xl:text-purple-500 bg-transparent hover:bg-purple-500 hover:text-white w-5 xl:w-7 h-5 xl:h-7 p-2 rounded-2xl xl:hover:bg-transparent xl:hover:text-purple-500"
          icon={icon}
        />
        <Text extraClassName="mx-4 xl:block hidden">{text}</Text>
      </a>
    </>
  );
};

export default SideMenu;
