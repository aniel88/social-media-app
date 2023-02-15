/* React */
import React from "react";

/* Default user image */
import defaultUserImage from "../../assets/default-user-image.jpg";

interface UserIconProps {
  icon?: string;
  status?: UserStatus;
  showStatus?: boolean;
  children?: JSX.Element | JSX.Element[];
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const statuses = ["online", "offline", "away"] as const;
export type UserStatus = typeof statuses[number];

const baseClass = "icon";
const statusBaseClass = "status";

const templateClasses =
  "rounded-full bg-blue-500 h-12 xl:h-10 w-12 xl:w-10 overflow-hidden cursor-pointer";
const templateStatusClasses =
  "absolute rounded-full border-2 border-white h-4 xl:h-3 w-4 xl:w-3 ";

const statusClasses = {
  online: "bg-green-500",
  offline: "bg-gray-500",
  away: "bg-yellow-500",
};

const feedBackStatus = "offline";

const UserIcon = ({
  icon = defaultUserImage,
  status = "offline",
  showStatus = true,
  children,
  onClick,
}: UserIconProps) => {
  const isValidStatus = statuses.includes(status);

  const statusKey = isValidStatus ? status : feedBackStatus;

  const statusClass = statusClasses[statusKey];
  const className = `${baseClass} ${templateClasses}`;
  const statusClassName = `${statusBaseClass} ${templateStatusClasses} ${statusClass}`;

  return (
    <div onClick={onClick} className={className}>
      {showStatus ? <div className={statusClassName} title={status}></div> : ""}
      <img src={icon} alt="user image" />
      {children}
    </div>
  );
};

export default UserIcon;
