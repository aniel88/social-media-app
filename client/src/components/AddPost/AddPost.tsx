/* React */
import {
  faCamera,
  faLocationDot,
  faUserTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "../Button/Button";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import UserIcon from "../UserIcon/UserIcon";

export interface IAddPostProps {}

const AddPost = ({}: IAddPostProps) => {
  return (
    <div className="add-post-wrapper w-full lex flex-col">
      <div className="flex flex-row items-center">
        <div>
          <UserIcon
            status="online"
            icon="https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-1/307840742_5590371681025446_113209348334201931_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeEoN3cSXjMWVPRd04qFQ6seVDiRpsFMQ1ZUOJGmwUxDVmE8hDWjua2qN6gberuAixBtSiqH3jDgeAvjK3ZP8xuD&_nc_ohc=AV9yFP3-3LYAX9sarEm&tn=n3O6v_yY3uAmZKrx&_nc_ht=scontent-otp1-1.xx&oh=00_AfAaMQVmIVFOoB1AtuVZ8uDc3QOUA6ETUIBu4zA1lKzNeA&oe=63E8384A"
          />
        </div>

        <input
          type="text"
          className="user-post flex items-center w-full mx-3 placeholder-gray-400 resize-none p-2 focus:rounded-2xl"
          placeholder="What's on your mind, Daniel-Iosif?"
        />
      </div>
      <HorizontalLine customClassName="bg-gray-200" />
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <button
            className="flex flex-row items-center text-gray-400 text-sm mr-3"
            title="Add image"
          >
            <FontAwesomeIcon
              className="text-green-600 text-xl mr-2"
              icon={faCamera}
            />
            Add image
          </button>
          <button
            className="flex flex-row items-center text-gray-400 text-sm mr-3"
            title="Add location"
          >
            <FontAwesomeIcon
              className="text-blue-600 text-xl mr-2"
              icon={faLocationDot}
            />
            Add location
          </button>
          <button
            className="flex flex-row items-center text-gray-400 mr-3 text-sm"
            title="Tag friend"
          >
            <FontAwesomeIcon
              className="text-yellow-600 text-xl mr-2"
              icon={faUserTag}
            />
            Tag friend
          </button>
        </div>
        <Button size="small">Share</Button>
      </div>
    </div>
  );
};

export default AddPost;
