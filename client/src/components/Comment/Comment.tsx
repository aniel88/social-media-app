/* React */
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { formatPostDate } from "../../utils/formatPostDate";
import UserIcon from "../UserIcon/UserIcon";

export interface ICommentProps {
  profilePic?: string;
  lastName: string;
  firstName: string;
  description: string;
  createdAt: string;
  id: number;
}

const Comment = ({
  profilePic,
  lastName = "",
  firstName = "",
  description = "",
  createdAt = "",
  id = 0,
}: ICommentProps) => {
  return (
    <div className="flex flex-col relative group">
      <div className="absolute top-2 right-0">
        <FontAwesomeIcon
          className="hidden group-hover:block cursor-pointer text-red-500"
          icon={faCircleXmark}
          title="Delete"
        />
      </div>
      <div className="flex flex-row items-center justify-between mt-3 ">
        <div className="flex flex-row items-center text-sm">
          <UserIcon showStatus={false} icon={profilePic} />
          <div className="p-2">
            <div className="font-bold">
              {lastName} {firstName}
            </div>
            <div className="">{description}</div>
          </div>
        </div>
        <div className="text-sm text-gray-400">
          {Number(createdAt) !== 0 ? formatPostDate(createdAt) : createdAt}
        </div>
      </div>
      <div className="ml-12 text-sm">
        <button className="text-blue-400 cursor-pointer hover:underline">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Comment;
