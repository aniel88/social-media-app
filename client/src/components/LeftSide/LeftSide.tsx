/* React */
import React from "react";

/* Components */
import Box from "../Box/Box";
import Text from "../Text/Text";
import UserIcon, { UserStatus } from "../UserIcon/UserIcon";

/* Assets */
import RestauratExample from "../../assets/restaurat-example.png";
import SideEvent from "../SideEvent/SideEvent";

/* Interface */
import { IEventProps } from "../SideEvent/SideEvent";

export type Message = {
  urlIcon?: string;
  url: string;
  name: string;
  status: UserStatus;
};

interface ILeftSideProps {
  events: Array<IEventProps>;
  restaurants?: string;
  messages: Message[];
  extraClassName?: string;
}

const LeftSide = ({ events, messages, extraClassName }: ILeftSideProps) => {
  return (
    <div className={extraClassName}>
      <Box
        flexDirection="column"
        extraClassName="fixed h-[calc(100vh-6rem)] w-32 xl:w-72 bg-gray-100 m-6 !justify-start items-start overflow-x-visible p-4 "
      >
        <Text
          weight="bold"
          align="left"
          extraClassName="w-full text-center xl:text-left px-0 py-2 xl:p-2"
        >
          Events
        </Text>
        {events.map((eventData, index) => (
          <SideEvent
            key={index}
            day={eventData.day}
            title={eventData.title}
            month={eventData.month}
            url={eventData.url}
            location={eventData.location}
          />
        ))}
        <Text
          weight="bold"
          align="left"
          extraClassName="w-full text-center xl:text-left px-0 py-2 xl:p-2"
        >
          Restaurants
        </Text>
        <div className="h-30 xl:h-36 w-full rounded-md overflow-hidden cursor-pointer">
          <img className="w-full h-full" src={RestauratExample} />
        </div>
        <Text
          weight="bold"
          align="left"
          extraClassName="w-full text-center xl:text-left px-0 py-2 xl:p-2"
        >
          Messages
        </Text>
        <div className="w-full flex xl:block flex-col items-center p-2">
          <>
            {messages.map((message, index) => {
              return (
                <a
                  href={message.url}
                  key={index}
                  className="flex flex-row items-center mb-5 relative group"
                >
                  <UserIcon
                    status={message.status}
                    icon={message.urlIcon}
                  ></UserIcon>
                  <Text
                    weight="normal"
                    size="small"
                    margin="mx-2"
                    extraClassName="hidden xl:block absolute xl:relative group-hover:block bg-white xl:bg-transparent rounded-2xl xl:rounded-none p-2 xl:p-0 left-16 xl:left-0 w-52 xl:w-auto !text-left xl:text-right !font-bold xl:!font-normal h-18 xl:h-auto"
                  >
                    <>
                      {message.name}
                      <div className="font-normal block xl:hidden">
                        Caterinque
                      </div>
                    </>
                  </Text>
                </a>
              );
            })}
          </>
        </div>
      </Box>
    </div>
  );
};

export default LeftSide;
