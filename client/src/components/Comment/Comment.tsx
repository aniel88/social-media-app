/* React */
import React from "react";
import UserIcon from "../UserIcon/UserIcon";

interface ICommentProps {
  imageUrl?: string;
  userName: string;
  message: string;
  timeOfComment: string;
}

const Comment = ({
  imageUrl,
  message = "",
  userName = "",
  timeOfComment = "",
}: ICommentProps) => {
  return (
    <div className="flex flex-row items-center justify-between my-3">
      <div className="flex flex-row items-center text-sm">
        <UserIcon showStatus={false} icon={imageUrl} />
        <div className="p-2">
          <div className="font-bold">{userName}</div>
          <div className="">{message}</div>
        </div>
      </div>
      <div className="text-sm text-gray-400">{timeOfComment}</div>
    </div>
  );
};

export default Comment;
