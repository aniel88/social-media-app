/* React */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../utils/selectors";

/* Components */
import Button from "../Button/Button";
import UserIcon from "../UserIcon/UserIcon";

interface IAddCommentProps {
  imageUrl?: string;
  onAddComment: any;
}

const AddComment = ({ imageUrl, onAddComment }: IAddCommentProps) => {
  const userData = useSelector(selectUserData);

  const [comment, setComment] = useState("");

  const commentInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const clickHandler = () => {
    onAddComment(comment);
    setComment("");
  };

  return (
    <div className="flex flex-row items-center">
      <div>
        <UserIcon
          showStatus={false}
          icon={
            userData.profilePic.includes("blob")
              ? userData.profilePic
              : `http://localhost:8080/uploads/users/profile/${userData.profilePic}`
          }
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
