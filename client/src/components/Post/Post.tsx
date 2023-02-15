/* React */
import {
  faComment,
  faComments,
  faEllipsis,
  faHeart,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import AddComment from "../AddComment/AddComment";
import Button from "../Button/Button";
import Comment from "../Comment/Comment";
import UserIcon from "../UserIcon/UserIcon";

const Post = () => {
  const [showComments, setShowComments] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos) {
      setShowMore(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row user-details items-center">
        <div className="user-image p-2">
          <UserIcon
            showStatus={false}
            icon="https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-1/307840742_5590371681025446_113209348334201931_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeEoN3cSXjMWVPRd04qFQ6seVDiRpsFMQ1ZUOJGmwUxDVmE8hDWjua2qN6gberuAixBtSiqH3jDgeAvjK3ZP8xuD&_nc_ohc=AV9yFP3-3LYAX9sarEm&tn=n3O6v_yY3uAmZKrx&_nc_ht=scontent-otp1-1.xx&oh=00_AfAaMQVmIVFOoB1AtuVZ8uDc3QOUA6ETUIBu4zA1lKzNeA&oe=63E8384A"
          />
        </div>

        <div className="flex flex-row w-full justify-between p-2">
          <div className="flex flex-col user-data">
            <div className="user-name font-bold">Morohoschi Daniel</div>
            <div className="date text-gray-400 text-sm">
              Dec 33 2021, 12:40 pm
            </div>
          </div>
          <div className="relative overflow-visible">
            <button
              onClick={() => setShowMore(!showMore)}
              className="report text-2xl cursor-pointer"
            >
              <FontAwesomeIcon icon={faEllipsis} title="more" />
            </button>
            {showMore ? (
              <div className="absolute flex justify-center items-center right-1 bg-white h-auto w-auto p-4 rounded-2xl">
                <Button type="button" size="small" variant="danger">
                  Delete
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col post-details p-2">
        <div className="post-description text-gray-500 text-sm">
          Post Description
        </div>
        <div className="post rounded-2xl m-3 overflow-hidden">
          <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />{" "}
        </div>
        <div className="flex flex-row justify-start p-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="post-buttons mr-3 cursor-pointer"
          >
            <FontAwesomeIcon
              className={isLiked ? "text-red-500" : "text-gray-400"}
              type="regular"
              icon={faHeart}
              title="Like"
            />
            <span className="text-sm mx-2">3 likes</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="post-buttons mr-3 cursor-pointer"
          >
            {" "}
            <FontAwesomeIcon
              className={showComments ? "text-blue-400" : "text-gray-400"}
              type="regular"
              icon={faComments}
              title="Comments"
            />
            <span className="text-sm mx-2">3 comments</span>
          </button>
          <div className="post-buttons mr-3 cursor-pointer">
            {" "}
            <FontAwesomeIcon
              className="text-gray-400"
              type="regular"
              icon={faShare}
              title="Share"
            />
          </div>
        </div>
      </div>
      {showComments ? (
        <div className="flex flex-col comments p-2">
          <AddComment
            imageUrl="https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-1/307840742_5590371681025446_113209348334201931_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeEoN3cSXjMWVPRd04qFQ6seVDiRpsFMQ1ZUOJGmwUxDVmE8hDWjua2qN6gberuAixBtSiqH3jDgeAvjK3ZP8xuD&_nc_ohc=AV9yFP3-3LYAX9sarEm&tn=n3O6v_yY3uAmZKrx&_nc_ht=scontent-otp1-1.xx&oh=00_AfAaMQVmIVFOoB1AtuVZ8uDc3QOUA6ETUIBu4zA1lKzNeA&oe=63E8384A"
            onAddComment={(event: any) => console.log(event)}
          />
          <Comment
            imageUrl="https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-1/307840742_5590371681025446_113209348334201931_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeEoN3cSXjMWVPRd04qFQ6seVDiRpsFMQ1ZUOJGmwUxDVmE8hDWjua2qN6gberuAixBtSiqH3jDgeAvjK3ZP8xuD&_nc_ohc=AV9yFP3-3LYAX9sarEm&tn=n3O6v_yY3uAmZKrx&_nc_ht=scontent-otp1-1.xx&oh=00_AfAaMQVmIVFOoB1AtuVZ8uDc3QOUA6ETUIBu4zA1lKzNeA&oe=63E8384A"
            userName="Morohoschi Daniel-Iosif"
            message="Awesome message"
            timeOfComment="2 minutes ago"
          />{" "}
          <Comment
            imageUrl="https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-1/307840742_5590371681025446_113209348334201931_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeEoN3cSXjMWVPRd04qFQ6seVDiRpsFMQ1ZUOJGmwUxDVmE8hDWjua2qN6gberuAixBtSiqH3jDgeAvjK3ZP8xuD&_nc_ohc=AV9yFP3-3LYAX9sarEm&tn=n3O6v_yY3uAmZKrx&_nc_ht=scontent-otp1-1.xx&oh=00_AfAaMQVmIVFOoB1AtuVZ8uDc3QOUA6ETUIBu4zA1lKzNeA&oe=63E8384A"
            userName="Morohoschi Daniel-Iosif"
            message="Awesome message"
            timeOfComment="2 minutes ago"
          />{" "}
          <Comment
            imageUrl="https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-1/307840742_5590371681025446_113209348334201931_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeEoN3cSXjMWVPRd04qFQ6seVDiRpsFMQ1ZUOJGmwUxDVmE8hDWjua2qN6gberuAixBtSiqH3jDgeAvjK3ZP8xuD&_nc_ohc=AV9yFP3-3LYAX9sarEm&tn=n3O6v_yY3uAmZKrx&_nc_ht=scontent-otp1-1.xx&oh=00_AfAaMQVmIVFOoB1AtuVZ8uDc3QOUA6ETUIBu4zA1lKzNeA&oe=63E8384A"
            userName="Morohoschi Daniel-Iosif"
            message="Awesome message"
            timeOfComment="2 minutes ago"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Post;
