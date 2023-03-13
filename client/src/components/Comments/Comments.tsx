/* React */
import axios from "axios";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "../../redux/store/store";
import { selectUserData } from "../../utils/selectors";

/* Components */
import AddComment from "../AddComment/AddComment";
import Comment, { ICommentProps } from "../Comment/Comment";

interface ICommentsProps {
  postId: number;
  onCommentAdded: any;
  comments: Array<ICommentProps>;
  numberOfComments: number;
  onShowMore?: React.MouseEventHandler<HTMLButtonElement>;
}

const Comments = ({
  postId,
  onCommentAdded,
  comments,
  numberOfComments,
  onShowMore,
}: ICommentsProps) => {
  const userData = useSelector(selectUserData);

  const { id: userId, profilePic, lastName, firstName } = userData;

  const addCommentHandler = async (event: string) => {
    const commentId = await axios.post(
      `http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/comments/${postId}`,
      { description: event, userId }
    );
    onCommentAdded({
      profilePic,
      lastName,
      firstName,
      description: event,
      createdAt: "just now",
      id: commentId.data,
    });
  };

  return (
    <div className="comments flex flex-col p-2">
      {/* Add comment container */}
      <AddComment imageUrl="" onAddComment={addCommentHandler} />
      {/* Comments  */}
      {comments.map((comment, index) => {
        return <Comment key={index} {...comment} />;
      })}
      {/* Show or hide show more button */}
      {comments.length === numberOfComments ? (
        ""
      ) : (
        <button
          className="text-sm cursor-pointer text-left text-blue-500 hover:underline"
          onClick={onShowMore}
        >
          Show more
        </button>
      )}
    </div>
  );
};

export default Comments;
