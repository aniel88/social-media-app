/* React */
import React from "react";

/* Components */
import Box from "../Box/Box";
import Text from "../Text/Text";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import SideMenu from "../SideMenu/SideMenu";
import SideGroup from "../SideGroup/SideGroup";

/* Interfaces */
import { ISideMenuProps } from "../SideMenu/SideMenu";
import { ISideGroupProps } from "../SideGroup/SideGroup";

export interface IRightSideProps {
  menu: ISideMenuProps[];
  groups: ISideGroupProps[];
}

const RightSide = ({ menu, groups }: IRightSideProps) => {
  return (
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
  );
};

export default RightSide;
