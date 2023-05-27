/* React */
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { formatPostDate } from "../../utils/formatPostDate";
import { selectUserData } from "../../utils/selectors";
import UserIcon from "../UserIcon/UserIcon";

export interface ICommentProps {
  profilePic?: string;
  lastName: string;
  firstName: string;
  description: string;
  createdAt: string;
  userName: string;
  id: number;
}

const Comment = ({
  profilePic,
  lastName = "",
  firstName = "",
  description = "",
  createdAt = "",
  userName = "",
  id = 0,
}: ICommentProps) => {
  const userData = useSelector(selectUserData);
  console.log(userData, userName);
  return (
    <div className="flex flex-col relative">
      <div className="flex flex-row items-center justify-between mt-3 ">
        <div className="flex flex-row items-center text-sm">
          <UserIcon
            showStatus={false}
            icon={
              userData.userName === userName
                ? userData.profilePic?.includes("blob")
                  ? userData.profilePic
                  : `http://${
                      process.env.NODE_ENV === "development"
                        ? process.env.REACT_APP_DEVELOPMENT_SERVER_DOMAIN
                        : process.env.REACT_APP_PRODUCTION_SERVER_DOMAIN
                    }:${
                      process.env.NODE_ENV === "development"
                        ? process.env.REACT_APP_DEVELOPMENT_SERVER_PORT
                        : process.env.REACT_APP_PRODUCTION_SERVER_PORT
                    }/uploads/users/profile/${profilePic}`
                : `http://${
                    process.env.NODE_ENV === "development"
                      ? process.env.REACT_APP_DEVELOPMENT_SERVER_DOMAIN
                      : process.env.REACT_APP_PRODUCTION_SERVER_DOMAIN
                  }:${
                    process.env.NODE_ENV === "development"
                      ? process.env.REACT_APP_DEVELOPMENT_SERVER_PORT
                      : process.env.REACT_APP_PRODUCTION_SERVER_PORT
                  }/uploads/users/profile/${profilePic}`
            }
          />
          <div className="p-2">
            <div className="font-bold">
              {firstName} {lastName}
            </div>
            <div className="">{description}</div>
          </div>
        </div>
        <div className="text-sm text-gray-400">
          {Number(createdAt) !== 0 ? formatPostDate(createdAt) : createdAt}
        </div>
      </div>
      {/* <div className="ml-12 text-sm">
        <button className="text-blue-400 cursor-pointer hover:underline">
          Delete
        </button>
      </div> */}
    </div>
  );
};

export default Comment;
