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
}

const LeftSide = ({ events, messages }: ILeftSideProps) => {
  return (
    <Box
      flexDirection="column"
      extraClassName="fixed h-[calc(100vh-6rem)] w-72 bg-gray-100 m-6 !justify-start items-start p-4 "
    >
      <Text weight="bold" align="left" padding="py-2" extraClassName="w-full">
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
      <Text weight="bold" align="left" padding="py-2" extraClassName="w-full">
        Restaurants Near Your
      </Text>
      <div className="h-36 w-full rounded-md overflow-hidden">
        <img className="w-full h-full" src={RestauratExample} />
      </div>
      <Text weight="bold" align="left" padding="py-2" extraClassName="w-full">
        Messages
      </Text>
      <div className="w-full p-2">
        <>
          {messages.map((message, index) => {
            return (
              <a
                href={message.url}
                key={index}
                className="flex flex-row items-center mb-5"
              >
                <UserIcon
                  status={message.status}
                  icon={message.urlIcon}
                ></UserIcon>
                <Text weight="normal" size="small" margin="mx-2">
                  {message.name}
                </Text>
              </a>
            );
          })}
        </>
      </div>
    </Box>
  );
};

export default LeftSide;
