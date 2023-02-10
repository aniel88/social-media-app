/* React */
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Text from "../Text/Text";

export interface IEventProps {
  day: number;
  month: string;
  title: string;
  location: Location;
  url: string;
}

export type Location = {
  street: string;
  country: string;
};

const baseWrapperClass = "event-wrapper";
const wrapperClasses = "flex w-full items-center justify-between my-3";

const baseTemplateClass = "event-template";
const templateClasses =
  "flex flex-col w-24 h-20 justify-end bg-white overflow-hidden rounded-2xl shadow-2xl bg-white";

const baseDateClass = "event-date";
const templateDateClasses =
  "w-full h-full text-2xl font-bold text-black flex justify-center items-center";

const baseMonthClass = "event-month";
const templateMonthClasses =
  "flex w-full h-8 bottom-0 items-center justify-center text-white text-xs bg-purple-500 ";

const baseEventDetails = "event-details";
const templateEventDetails = "flex mx-3 flex-col justify-start items-start";

const baseEventLocation = "event-location";
const templateEventLocation = "text-xs";

const baseEventShowMore = "event-show-more";
const templateEventShowMore = "text-xs text-blue-500";

const SideEvent = ({
  day,
  month,
  title,
  location: { street, country },
  url,
}: IEventProps) => {
  const wrapperClassName = `${baseWrapperClass} ${wrapperClasses}`;

  const templateClassName = `${baseTemplateClass} ${templateClasses}`;
  const dateClassName = `${baseDateClass} ${templateDateClasses}`;
  const monthClassName = `${baseMonthClass} ${templateMonthClasses}`;
  const eventDetailsClassName = `${baseEventDetails} ${templateEventDetails}`;
  const eventDetailLocaionClassName = `${baseEventLocation} ${templateEventLocation}`;
  const eventDetailShowMoreClassName = `${baseEventShowMore} ${templateEventShowMore}`;

  return (
    <div className={wrapperClassName}>
      <div className={templateClassName}>
        <div className={dateClassName}>{day}</div>
        <div className={monthClassName}>{month}</div>
      </div>
      <div className={eventDetailsClassName}>
        <Text weight="bold" href={url}>
          {title}
        </Text>
        <div className={eventDetailLocaionClassName}>
          <FontAwesomeIcon icon={faLocationDot} /> {street}, {country}
        </div>
        <a className={eventDetailShowMoreClassName} href={url}>
          See more
        </a>
      </div>
    </div>
  );
};

export default SideEvent;
