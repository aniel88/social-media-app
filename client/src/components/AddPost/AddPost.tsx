/* React */
import React, { useEffect, useRef, useState } from "react";

/* Font Awesome */
import {
  faCamera,
  faLocationDot,
  faUserTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* Axios */
import axios from "axios";

/* Cookie */
import { useCookies } from "react-cookie";

/* Component */
import Button from "../Button/Button";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import UserIcon from "../UserIcon/UserIcon";

/* Reducers */
import { inputFormReducer, Action } from "../../redux/reducers/register/form";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { postAction } from "../../redux/reducers/post/postSlice";
import { AppDispatch } from "../../redux/store/store";
import { selectPostData, selectUserData } from "../../utils/selectors";

export interface IAddPostProps {
  onAddPost: any;
}

export interface IAddedPost {
  imageUrl?: string;
  description: string;
  id: number;
}

const AddPost = () => {
  /* User Data */
  const userData = useSelector(selectUserData);
  /* User Posts */
  const userPosts = useSelector(selectPostData);
  const [image, setImage] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [token, setToken, removeToken] = useCookies(["access-token"]);
  let currentToken = "";
  const dispatch = useDispatch<AppDispatch>();
  currentToken = token["access-token"];
  const inputImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (image.length < 1) return;
    const newImageUrl = [];
    newImageUrl.push(URL.createObjectURL(image[0]));
    setImageUrl(newImageUrl[0]);
  }, [image]);

  const onImageChange = (e: { target: { files: any } }) => {
    setImage(e.target.files);
  };

  const onUploadImageClick = () => {
    if (inputImageRef.current !== null) {
      inputImageRef.current.click();
    }
  };

  const onAddPostHandler = async () => {
    await dispatch(
      postAction({
        type: "add",
        image,
        description,
        currentToken,
        firstName: userData.firstName,
        lastName: userData.lastName,
        userId: userData.id,
      })
    );
    setImage([]);
    setImageUrl("");
    setDescription("");
  };

  return (
    <div className="add-post-wrapper w-full lex flex-col">
      <div className="flex flex-row items-center">
        <div>
          <UserIcon showStatus={false} icon="" />
        </div>

        <div className="flex flex-row justify-between w-full">
          <input
            type="text"
            name="image"
            accept="image/*"
            className="user-post flex items-center w-full mx-3 placeholder-gray-400 resize-none p-2 focus:rounded-2xl"
            placeholder="What's on your mind, Daniel-Iosif?"
            value={description}
            onChange={(event) => setDescription(event?.target.value)}
          />
          {imageUrl[0] ? (
            <img className="h-14 w-14" src={imageUrl} alt="image-upload" />
          ) : (
            ""
          )}
        </div>
      </div>
      <HorizontalLine customClassName="bg-gray-200" />
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <button
            onClick={() => onUploadImageClick()}
            className="flex flex-row items-center text-gray-400 text-sm mr-3"
            title="Add image"
          >
            <input
              type="file"
              className="hidden"
              itemType="image/png"
              ref={inputImageRef}
              id="postImage"
              name="postImage"
              onChange={onImageChange}
            />
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
        <Button
          isDisabled={description.length === 0 && imageUrl.length === 0}
          size="small"
          onClick={() => onAddPostHandler()}
        >
          Share
        </Button>
      </div>
    </div>
  );
};

export default AddPost;
