import React from "react";
import UserIcon from "../UserIcon/UserIcon";

interface DropdownItemUserInfoProps {
  imageUrl?: string;
  name: string;
  status?: Status;
  extraStyle?: React.CSSProperties;
}

const statuses = ["online", "offline", "away"] as const;
type Status = typeof statuses[number];

const DropdownItemUserInfo = ({
  imageUrl = "",
  status = "offline",
  extraStyle,
  name = "",
}: DropdownItemUserInfoProps) => {
  return (
    <div
      style={extraStyle}
      className="flex h-20 items-center justify-start p-2 bg-purple-400 rounded-2xl cursor-pointer"
    >
      <UserIcon status={status} icon={imageUrl} />
      <div className="user mx-2 font-bold text-white">{name}</div>
    </div>
  );
};

export default DropdownItemUserInfo;
