/* React */
import React from "react";

/* Components */
import Box from "../Box/Box";
import Text from "../Text/Text";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import SideMenu from "../SideMenu/SideMenu";
import SideGroup from "../SideGroup/SideGroup";

/* Font Awesome */
import {
  faCartShopping,
  faHome,
  faPeopleGroup,
  faTv,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

/* Assets */
import gamerXCommunityImage from "../../assets/gamerXCommunnity.jpeg";
import photoshopImage from "../../assets/photoshop.jpeg";
import cssImage from "../../assets/css.jpeg";
import codImage from "../../assets/callofduty.jpeg";

/* Interfaces */
import { ISideMenuProps } from "../SideMenu/SideMenu";
import { ISideGroupProps } from "../SideGroup/SideGroup";

export interface IRightSideProps {
  menu: ISideMenuProps[];
  groups: ISideGroupProps[];
  extraClassName?: string;
}

export const sideGroupData: Array<ISideGroupProps> = [
  { title: "GamerX Community", imageUrl: gamerXCommunityImage, url: "" },
  { title: "Photoshop Romania", imageUrl: photoshopImage, url: "" },
  { title: "Best Ankara Styles", imageUrl: cssImage, url: "" },
  { title: "CODM Romania", imageUrl: codImage, url: "" },
  { title: "CODM Europe", imageUrl: codImage, url: "" },
];

export const sideMenuData: Array<ISideMenuProps> = [
  {
    text: "Feed",
    icon: faHome,
    url: "",
  },
  {
    text: "Watch",
    icon: faTv,
    url: "",
  },
  {
    text: "Friends",
    icon: faUserGroup,
    url: "",
  },
  {
    text: "Groups",
    icon: faPeopleGroup,
    url: "",
  },
  {
    text: "Marketplace",
    icon: faCartShopping,
    url: "",
  },
];

const RightSide = ({ menu, groups, extraClassName }: IRightSideProps) => {
  return (
    <div className={extraClassName}>
      <Box
        flexDirection="column"
        extraStyle={{ right: 0 }}
        extraClassName="fixed h-[calc(100vh-6rem)] md:w-24 xl:w-72 bg-gray-100 m-6 !justify-start items-start p-4 "
      >
        <Text
          weight="bold"
          align="left"
          extraClassName="w-full text-center xl:text-left px-0 py-2 xl:p-2"
        >
          Menu
        </Text>

        <div className="flex flex-col w-full items-start px-5 md:px-2">
          {menu.map((menu, index) => {
            return (
              <SideMenu
                key={index}
                text={menu.text}
                url={menu.url}
                icon={menu.icon}
              />
            );
          })}
        </div>

        <HorizontalLine customClassName="bg-gray-500" />

        <Text
          weight="bold"
          align="left"
          extraClassName="w-full text-center xl:text-left px-0 py-2 xl:p-2"
        >
          Groups
        </Text>

        <div className="flex flex-col items-center xl:items-start justify-center xl:justify-start w-full px-2 xl:px-3">
          {groups.map((group, index) => {
            return (
              <SideGroup
                key={index}
                title={group.title}
                imageUrl={group.imageUrl}
                url={group.url}
              />
            );
          })}
        </div>
      </Box>
    </div>
  );
};

export default RightSide;
