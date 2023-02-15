/* React */
import React, { useState } from "react";
import { useLinkClickHandler } from "react-router-dom";
import Button from "../Button/Button";
import UserIcon from "../UserIcon/UserIcon";

interface IAddCommentProps {
  imageUrl?: string;
  onAddComment: any;
}

const AddComment = ({ imageUrl, onAddComment }: IAddCommentProps) => {
  const [comment, setComment] = useState("");

  const commentInputHandler = (event: any) => {
    setComment(event.target.value);
  };

  const clickHandler = () => {
    onAddComment(comment);
    setComment("");
  };

  return (
    <div className="flex flex-row items-center">
      <div>
        <UserIcon showStatus={false} icon={imageUrl} />
      </div>
      <input
        type="text"
        className="w-full p-2 mx-2 border-2 rounded-2xl"
        value={comment}
        placeholder="Add comment"
        onChange={commentInputHandler}
      />
      <Button
        isDisabled={comment.length ? false : true}
        size="small"
        onClick={() => clickHandler()}
      >
        Send
      </Button>
    </div>
  );
};

export default AddComment;
