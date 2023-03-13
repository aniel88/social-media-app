/* React */
import React, { useState } from "react";

/* Components */
import Button from "../Button/Button";
import UserIcon from "../UserIcon/UserIcon";

interface IAddCommentProps {
  imageUrl?: string;
  onAddComment: any;
}

const AddComment = ({ imageUrl, onAddComment }: IAddCommentProps) => {
  const [comment, setComment] = useState("");

  const commentInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const clickHandler = () => {
    onAddComment(comment);
    setComment("");
  };
  console.log(imageUrl);
  return (
    <div className="flex flex-row items-center">
      <div>
        <UserIcon
          showStatus={false}
          icon={`http://localhost:8080/uploads/users/profile/${imageUrl}`}
        />
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
