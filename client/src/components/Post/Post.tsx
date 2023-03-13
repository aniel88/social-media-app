/* React */
import React, { useEffect, useState } from "react";

/*Crypto*/
import { encrypt } from "../../utils/crypto";

/* Font Awesome */
import {
  faComments,
  faEllipsis,
  faHeart,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/* 
Componets */
import Button from "../Button/Button";
import UserIcon from "../UserIcon/UserIcon";
import Comments from "../Comments/Comments";
import { ICommentProps } from "../Comment/Comment";

/* Axios */
import axios from "axios";

/* Utils */
import { convertMySqlBoolean } from "../../utils/convertMySqlBoolean";
import { formatPostDate } from "../../utils/formatPostDate";
import { formatQueryParam } from "../../utils/formatQueryParams";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { selectUserData } from "../../utils/selectors";

/* Redux */
import { postAction } from "../../redux/reducers/post/postSlice";

export interface IPostProps {
  firstName: string;
  lastName: string;
  id: number;
  desc?: string;
  img?: string;
  userId: number;
  createdAt: string;
  likes: number;
  comments: number;
  liked: string;
}

interface ILike {
  isActive: boolean;
  count: number;
}

type commentDataType = {
  page: number;
  data: Array<ICommentProps>;
};

const initialCommentsData: commentDataType = { page: 0, data: [] };
const initialLikeData: ILike = { isActive: false, count: 0 };
const limit = 3;

const Post = ({
  firstName,
  lastName,
  id,
  createdAt,
  desc,
  userId,
  comments,
  likes,
  liked,
  img,
}: IPostProps) => {
  const userData = useSelector(selectUserData);

  const [commentsData, setCommentsData] =
    useState<commentDataType>(initialCommentsData);
  const [showComments, setShowComments] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [like, setLike] = useState<ILike | null>({
    count: likes,
    isActive: convertMySqlBoolean(liked),
  });
  const [numberOfComments, setNumberOfComments] = useState(comments);
  const dispatch = useDispatch<AppDispatch>();
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos) {
      setShowMore(false);
    }
  };

  const incrementCommentLikesOnCommentAddedAction = (event: any) => {
    setNumberOfComments(numberOfComments + 1);

    setCommentsData((prevComments) => {
      return {
        page: prevComments.page,
        data: [event, ...prevComments.data],
      };
    });
  };

  const fetchMoreComments = async () => {
    const comments = await axios.get(
      `http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/comments/${id}?limit=${limit}&page=${commentsData.page}`
    );

    setCommentsData((prevComments) => {
      return {
        page: prevComments.page + 1,
        data: [...prevComments.data, ...comments.data],
      };
    });
  };

  const deletePostHandler = async () => {
    dispatch(postAction({ type: "delete", postId: id }));
  };

  const onLikePostHandler = async () => {
    const encryptedUserId = encrypt(userData.id.toString());
    const encryptedUserIdFormatted = formatQueryParam(encryptedUserId);

    const encryptedPostId = encrypt(id.toString());
    const encryptedPostIdFormatted = formatQueryParam(encryptedPostId);

    if (like?.isActive) {
      await axios.delete(
        `http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/like?postId=${encryptedPostIdFormatted}&userId=${encryptedUserIdFormatted}`
      );
      setLike((prevLike) => {
        return {
          isActive: false,
          count: (prevLike!.count -= 1),
        };
      });
    } else {
      await axios.put(
        `http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/like?postId=${encryptedPostIdFormatted}&userId=${encryptedUserIdFormatted}`
      );
      setLike((prevLike) => {
        return {
          isActive: true,
          count: (prevLike!.count += 1),
        };
      });
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await axios.get(
        `http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/comments/${id}?limit=${limit}&page=${commentsData.page}`
      );

      setCommentsData({ page: 1, data: comments.data });
    };

    fetchComments();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row user-details items-center">
        <div className="user-image p-2">
          <UserIcon
            showStatus={false}
            icon={
              userData.profilePic !== null
                ? `http://localhost:8080/uploads/users/profile/${userData.profilePic}`
                : ""
            }
          />
        </div>

        <div className="flex flex-row w-full justify-between p-2">
          <div className="flex flex-col user-data">
            <div className="user-name font-bold">
              {firstName} {lastName}
            </div>
            <div className="date text-gray-400 text-sm">
              {formatPostDate(createdAt)}
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
                <Button
                  type="button"
                  size="small"
                  variant="danger"
                  onClick={deletePostHandler}
                >
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
        <div className="post-description text-gray-500 text-sm">{desc}</div>
        {img ? (
          <div className="post max-h-96 rounded-2xl my-3 overflow-hidden">
            <img
              className="bg-cover min-w-full min-h-full bg-center"
              src={
                img.includes("blob")
                  ? img
                  : `http://localhost:8080/uploads/posts/${img}`
              }
            />
          </div>
        ) : (
          ""
        )}

        <div className="flex flex-row justify-start p-2">
          <button
            onClick={() => onLikePostHandler()}
            className="post-buttons mr-3 cursor-pointer"
          >
            <FontAwesomeIcon
              className={like?.isActive ? "text-red-500" : "text-gray-400"}
              type="regular"
              icon={faHeart}
              title="Like"
            />
            <span className="text-sm mx-2">{like!.count} likes</span>
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
            <span className="text-sm mx-2">{numberOfComments} comments</span>
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
        <Comments
          numberOfComments={numberOfComments}
          comments={commentsData.data}
          postId={id}
          onCommentAdded={(event: any) =>
            incrementCommentLikesOnCommentAddedAction(event)
          }
          onShowMore={() => fetchMoreComments()}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Post;
